import { calculatorSearchIndex, guideSearchIndex } from './searchIndex.js'
import { inferSearchIntent, scoreSearchResult } from './searchIntent.js'

const normalize = (value) => String(value || '').trim().toLowerCase()

function matchesCountry(entry, countryCode) {
  return !countryCode || !entry.countries.length || entry.countries.includes(countryCode)
}

function calculatorSearchResult(entry, term, queryMeta) {
  if (!entry.searchText.includes(term)) return null
  return {
    type: entry.type,
    id: entry.id,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    href: entry.href,
    score: scoreSearchResult(entry, queryMeta),
  }
}

function guideSearchResult(entry, term, queryMeta) {
  if (!entry.searchText.includes(term)) return null
  return {
    type: entry.type,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    href: entry.href,
    score: scoreSearchResult(entry, queryMeta),
  }
}

export function searchSite(query, { countryCode, types = ['calculator', 'guide'] } = {}) {
  const term = normalize(query)
  if (!term) return []

  const allowedTypes = new Set(types)
  const queryMeta = { ...inferSearchIntent(term), term }
  const results = []

  if (allowedTypes.has('calculator')) {
    for (const entry of calculatorSearchIndex) {
      if (!matchesCountry(entry, countryCode)) continue
      const result = calculatorSearchResult(entry, term, queryMeta)
      if (result) results.push(result)
    }
  }

  if (allowedTypes.has('guide')) {
    for (const entry of guideSearchIndex) {
      const result = guideSearchResult(entry, term, queryMeta)
      if (result) results.push(result)
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12)
}
