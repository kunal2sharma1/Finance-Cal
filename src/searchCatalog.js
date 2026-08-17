import { calculators } from './calculatorCatalog.js'
import { guides } from './guides.js'

const normalize = (value) => String(value || '').trim().toLowerCase()

function matchesCountry(config, countryCode) {
  const countries = Array.isArray(config.countries) ? config.countries : []
  return !countryCode || !countries.length || countries.includes(countryCode)
}

function calculatorSearchResult(config, term) {
  const haystack = [config.title, config.shortDescription, config.category, ...(config.keywords || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (!haystack.includes(term)) return null

  const exactTitle = normalize(config.title).includes(term)
  const titleStarts = normalize(config.title).startsWith(term)
  return {
    type: 'calculator',
    id: config.id,
    title: config.title,
    description: config.shortDescription,
    category: config.category,
    href: `/calculators/${encodeURIComponent(config.id)}`,
    score: titleStarts ? 120 : exactTitle ? 100 : 60,
  }
}

function guideSearchResult(guide, term) {
  const haystack = [guide.title, guide.intro, guide.topic, ...guide.sections.flat()]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (!haystack.includes(term)) return null

  const exactTitle = normalize(guide.title).includes(term)
  const titleStarts = normalize(guide.title).startsWith(term)
  return {
    type: 'guide',
    slug: guide.slug,
    title: guide.title,
    description: guide.metaDescription || guide.intro,
    href: `/guides/${guide.slug}`,
    score: titleStarts ? 110 : exactTitle ? 90 : 40,
  }
}

export function searchSite(query, { countryCode, types = ['calculator', 'guide'] } = {}) {
  const term = normalize(query)
  if (!term) return []

  const allowedTypes = new Set(types)
  const results = []

  if (allowedTypes.has('calculator')) {
    for (const { config } of calculators) {
      if (!matchesCountry(config, countryCode)) continue
      const result = calculatorSearchResult(config, term)
      if (result) results.push(result)
    }
  }

  if (allowedTypes.has('guide')) {
    for (const guide of guides) {
      const result = guideSearchResult(guide, term)
      if (result) results.push(result)
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12)
}
