import { CANONICAL_SITE_URL, getCanonicalUrl } from './siteConfig.js'
import { getCalculatorSEO } from './calculatorSeo.js'
import { getInternationalSEO } from './internationalSeo.js'
import { getIndexability, getRobotsContent } from './indexabilityPolicy.js'

const SITE_NAME = 'FinCalc'

function getRuntimeCanonicalUrl(pathname) {
  // Canonical URLs must remain tied to the production identity, never the
  // current preview/worker origin.
  return getCanonicalUrl(pathname || '/')
}

function upsertMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`)
  if (!element) {
    element = document.createElement('meta')
    if (attribute === 'property') element.setAttribute('property', value)
    else element.setAttribute('name', value)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
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

export function setSiteSEO({ title, description, pathname, calculator, noindex = false, routeType, routeExists = true }) {
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
  if (custom) return custom

  return {
    title: `${config.title} | ${SITE_NAME}`,
    description: `${config.shortDescription} Free, instant calculation with clear results and plain-English guidance.`,
  }
}

export { CANONICAL_SITE_URL }
