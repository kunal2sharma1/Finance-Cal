import { calculators } from './calculatorCatalog.js'
import { guides } from './guides.js'

const normalize = (value) => String(value || '').trim().toLowerCase()

export function searchSite(query, { countryCode } = {}) {
  const term = normalize(query)
  if (!term) return []

  const results = []

  for (const { config } of calculators) {
    const countries = Array.isArray(config.countries) ? config.countries : []
    if (countryCode && countries.length && !countries.includes(countryCode)) continue

    const haystack = [config.title, config.shortDescription, config.category, ...(config.keywords || [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    if (!haystack.includes(term)) continue

    const exactTitle = normalize(config.title).includes(term)
    results.push({
      type: 'calculator',
      id: config.id,
      title: config.title,
      description: config.shortDescription,
      href: `/calculators/${encodeURIComponent(config.id)}`,
      score: exactTitle ? 100 : haystack.indexOf(term) >= 0 ? 60 : 20,
    })
  }

  for (const guide of guides) {
    const haystack = [guide.title, guide.intro, guide.topic, ...guide.sections.flat()].filter(Boolean).join(' ').toLowerCase()
    if (!haystack.includes(term)) continue

    const exactTitle = normalize(guide.title).includes(term)
    results.push({
      type: 'guide',
      slug: guide.slug,
      title: guide.title,
      description: guide.metaDescription || guide.intro,
      href: `/guides/${guide.slug}`,
      score: exactTitle ? 90 : 40,
    })
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 12)
}
