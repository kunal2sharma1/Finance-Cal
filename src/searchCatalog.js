import { calculatorSearchIndex, guideSearchIndex } from './searchIndex.js'
import { inferSearchIntent, scoreSearchResult } from './searchIntent.js'
import { buildSearchVocabulary, getSearchTerms, recoverQuery } from './searchRecovery.js'

const normalize = (value) => String(value || '').trim().toLowerCase()
const SEARCH_VOCABULARY = buildSearchVocabulary([...calculatorSearchIndex, ...guideSearchIndex])

function matchesCountry(entry, countryCode) {
  return !countryCode || !entry.countries.length || entry.countries.includes(countryCode)
}

function matchesTerms(entry, terms) {
  return terms.some((term) => entry.searchText.includes(term))
}

function calculatorSearchResult(entry, terms, queryMeta) {
  if (!matchesTerms(entry, terms)) return null
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

function guideSearchResult(entry, terms, queryMeta) {
  if (!matchesTerms(entry, terms)) return null
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

  const recovered = recoverQuery(term, SEARCH_VOCABULARY)
  const recoveryBase = recovered.query || term
  const terms = getSearchTerms(term, SEARCH_VOCABULARY)
  const allowedTypes = new Set(types)
  const queryMeta = {
    ...inferSearchIntent(recoveryBase),
    term,
    terms,
    corrected: recovered.corrected,
  }
  const results = []

  if (allowedTypes.has('calculator')) {
    for (const entry of calculatorSearchIndex) {
      if (!matchesCountry(entry, countryCode)) continue
      const result = calculatorSearchResult(entry, terms, queryMeta)
      if (result) results.push(result)
    }
  }

  if (allowedTypes.has('guide')) {
    for (const entry of guideSearchIndex) {
      const result = guideSearchResult(entry, terms, queryMeta)
      if (result) results.push(result)
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12)
}
