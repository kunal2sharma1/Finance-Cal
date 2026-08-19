import { calculatorSearchIndex, guideSearchIndex } from './searchIndex.js'
import { detectSearchIntent, scoreSearchResult } from './searchIntent.js'
import { buildSearchVocabulary, getSearchTerms, recoverQuery } from './searchRecovery.js'

const normalize = (value) => String(value || '').trim().toLowerCase()
const SEARCH_VOCABULARY = buildSearchVocabulary([...calculatorSearchIndex, ...guideSearchIndex])

function matchesCountry(entry, countryCode) {
  return !countryCode || !entry.countries.length || entry.countries.includes(countryCode)
}

function matchesTerms(entry, terms) {
  return terms.some((term) => entry.searchText.includes(term))
}

function calculatorSearchResult(entry, terms, queryMeta, recovery = false) {
  if (!recovery && !matchesTerms(entry, terms)) return null
  return {
    type: entry.type,
    id: entry.id,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    href: entry.href,
    score: scoreSearchResult(entry, queryMeta),
    ...(recovery ? { recovery: 'zero-result' } : {}),
  }
}

function guideSearchResult(entry, terms, queryMeta, recovery = false) {
  if (!recovery && !matchesTerms(entry, terms)) return null
  return {
    type: entry.type,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    href: entry.href,
    score: scoreSearchResult(entry, queryMeta),
    ...(recovery ? { recovery: 'zero-result' } : {}),
  }
}

function buildZeroResultRecovery(queryMeta, { countryCode, types }) {
  if (!queryMeta.domain && !queryMeta.journey) return []

  const candidates = []
  const allowedTypes = new Set(types)

  if (allowedTypes.has('calculator')) {
    for (const entry of calculatorSearchIndex) {
      if (!matchesCountry(entry, countryCode)) continue
      const score = scoreSearchResult(entry, { ...queryMeta, term: '' })
      if (score <= 0) continue
      const result = calculatorSearchResult(entry, [], queryMeta, true)
      candidates.push({ ...result, score })
    }
  }

  if (allowedTypes.has('guide')) {
    for (const entry of guideSearchIndex) {
      const score = scoreSearchResult(entry, { ...queryMeta, term: '' })
      if (score <= 0) continue
      const result = guideSearchResult(entry, [], queryMeta, true)
      candidates.push({ ...result, score })
    }
  }

  return candidates
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 6)
}

export function detectSearch(query) {
  const term = normalize(query)
  if (!term) return detectSearchIntent('')

  const recovered = recoverQuery(term, SEARCH_VOCABULARY)
  return {
    ...detectSearchIntent(recovered.query || term),
    corrected: recovered.corrected,
    corrections: recovered.corrections,
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
    ...detectSearchIntent(recoveryBase),
    term,
    terms,
    corrected: recovered.corrected,
    corrections: recovered.corrections,
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

  if (results.length > 0) {
    return results
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 12)
  }

  return buildZeroResultRecovery(queryMeta, { countryCode, types })
}
