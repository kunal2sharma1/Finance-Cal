import { CANONICAL_SITE_URL, getCanonicalUrl } from './siteConfig.js'
import { getCalculatorSEO } from './calculatorSeo.js'
import { getInternationalSEO } from './internationalSeo.js'
import { getIndexability, getRobotsContent } from './indexabilityPolicy.js'
import { seoIntentContent } from './seoIntentContent.js'

const SITE_NAME = 'FinCalc'

function getRuntimeCanonicalUrl(pathname) {
  // Canonical URLs must remain tied to the production identity, never the
  // current preview/worker origin.
  return getCanonicalUrl(pathname || '/')
}

function upsertMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}=\"${value}\"]`)
  if (!element) {
    element = document.createElement('meta')
    if (attribute === 'property') element.setAttribute('property', value)
    else element.setAttribute('name', value)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel=\"${rel}\"]`)
  if (!element) {
    element = document.createElement('link')
    linkCleanup(rel, element)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function linkCleanup(rel, element) {
  element.setAttribute('rel', rel)
}

function normaliseSearchIntent(config, intent) {
  if (!config || !intent) return null

  return {
    intentLabel: intent.intentLabel,
    bestFor: intent.bestFor,
    questions: Array.isArray(intent.questions) ? intent.questions.filter(Boolean) : [],
    domain: config.meta?.domain || null,
    primaryIntent: config.meta?.intent || null,
    primaryJourney: config.meta?.primaryJourney || null,
  }
}

export function setSiteSEO({ title, description, pathname, calculator, noindex = false, routeType, routeExists = true, searchIntent = null }) {
  const pageTitle = title || `${SITE_NAME} — Simple Financial Calculators`
  const pageDescription = description || 'Free, practical financial calculators for investing, loans, salary, savings, retirement and everyday money decisions.'
  const canonical = getRuntimeCanonicalUrl(pathname || window.location.pathname)
  const policy = noindex
    ? { index: false, follow: true, reason: 'explicit-page-noindex' }
    : getIndexability({ routeType: routeType || 'unknown', exists: routeExists })

  document.title = pageTitle
  upsertMeta('name', 'description', pageDescription)
  upsertMeta('name', 'robots', getRobotsContent(policy))
  upsertMeta('property', 'og:title', pageTitle)
  upsertMeta('property', 'og:description', pageDescription)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('name', 'twitter:card', 'summary')
  upsertMeta('name', 'twitter:title', pageTitle)
  upsertMeta('name', 'twitter:description', pageDescription)

  if (calculator && searchIntent) {
    upsertMeta('name', 'fincalc:search-intent', searchIntent.primaryIntent || 'calculate')
    upsertMeta('name', 'fincalc:search-domain', searchIntent.domain || 'financial-planning')
    upsertMeta('name', 'fincalc:search-journey', searchIntent.primaryJourney || 'financial-planning')
    upsertMeta('name', 'fincalc:intent-label', searchIntent.intentLabel || '')
  }

  upsertLink('canonical', canonical)

  const schemaId = 'fincalc-seo-schema'
  let schema = document.getElementById(schemaId)
  if (!schema) {
    schema = document.createElement('script')
    schema.id = schemaId
    schema.type = 'application/ld+json'
    document.head.appendChild(schema)
  }

  const graph = calculator
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: pageTitle,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        url: canonical,
        description: pageDescription,
        isAccessibleForFree: true,
        ...(searchIntent ? {
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'searchIntent', value: searchIntent.primaryIntent || 'calculate' },
            { '@type': 'PropertyValue', name: 'searchDomain', value: searchIntent.domain || 'financial-planning' },
            { '@type': 'PropertyValue', name: 'searchJourney', value: searchIntent.primaryJourney || 'financial-planning' },
            { '@type': 'PropertyValue', name: 'intentLabel', value: searchIntent.intentLabel || '' },
          ],
        } : {}),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: canonical,
        description: pageDescription,
      }

  schema.textContent = JSON.stringify(graph)
}

export function setBreadcrumbSchema(items) {
  const schemaId = 'fincalc-breadcrumb-schema'
  let schema = document.getElementById(schemaId)
  if (!schema) {
    schema = document.createElement('script')
    schema.id = schemaId
    schema.type = 'application/ld+json'
    document.head.appendChild(schema)
  }

  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: getRuntimeCanonicalUrl(item.href) } : {}),
    })),
  })
}

export function buildCalculatorSEO(config) {
  const custom = getCalculatorSEO(config.id) || getInternationalSEO(config.id)
  const base = custom || {
    title: `${config.title} | ${SITE_NAME}`,
    description: `${config.shortDescription} Free, instant calculation with clear results and plain-English guidance.`,
  }
  const searchIntent = normaliseSearchIntent(config, seoIntentContent[config.id])

  return searchIntent ? { ...base, searchIntent } : base
}

export { CANONICAL_SITE_URL }
