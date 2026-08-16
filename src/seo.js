import { getCalculatorSEO } from './calculatorSeo.js'

const SITE_NAME = 'FinCalc'

function getCanonicalUrl(pathname) {
  const base = window.location.origin.replace(/\/$/, '')
  const cleanPath = pathname || '/'
  return `${base}${cleanPath}`
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
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function setSiteSEO({ title, description, pathname, calculator }) {
  const pageTitle = title || `${SITE_NAME} — Simple Financial Calculators`
  const pageDescription = description || 'Free, practical financial calculators for investing, loans, salary, savings, retirement and everyday money decisions.'
  const canonical = getCanonicalUrl(pathname || window.location.pathname)

  document.title = pageTitle
  upsertMeta('name', 'description', pageDescription)
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

export function buildCalculatorSEO(config) {
  const custom = getCalculatorSEO(config.id)

  if (custom) return custom

  return {
    title: `${config.title} | ${SITE_NAME}`,
    description: `${config.shortDescription} Free, instant calculation with clear results and plain-English guidance.`,
  }
}
