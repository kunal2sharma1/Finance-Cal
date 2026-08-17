import { calculatorSearchIndex, guideSearchIndex } from './searchIndex.js'

const normalize = (value) => String(value || '').trim().toLowerCase()

function matchesCountry(entry, countryCode) {
  return !countryCode || !entry.countries.length || entry.countries.includes(countryCode)
}

function calculatorSearchResult(entry, term) {
  if (!entry.searchText.includes(term)) return null

  const title = normalize(entry.title)
  const titleStarts = title.startsWith(term)
  const titleIncludes = title.includes(term)
  return {
    type: entry.type,
    id: entry.id,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    href: entry.href,
    score: titleStarts ? 120 : titleIncludes ? 100 : 60,
  }
}

function guideSearchResult(entry, term) {
  if (!entry.searchText.includes(term)) return null

  const title = normalize(entry.title)
  const titleStarts = title.startsWith(term)
  const titleIncludes = title.includes(term)
  return {
    type: entry.type,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    href: entry.href,
    score: titleStarts ? 110 : titleIncludes ? 90 : 40,
  }
}

export function searchSite(query, { countryCode, types = ['calculator', 'guide'] } = {}) {
  const term = normalize(query)
  if (!term) return []

  const allowedTypes = new Set(types)
  const results = []

  if (allowedTypes.has('calculator')) {
    for (const entry of calculatorSearchIndex) {
      if (!matchesCountry(entry, countryCode)) continue
      const result = calculatorSearchResult(entry, term)
      if (result) results.push(result)
    }
  }

  if (allowedTypes.has('guide')) {
    for (const entry of guideSearchIndex) {
      const result = guideSearchResult(entry, term)
      if (result) results.push(result)
    }
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12)
}
