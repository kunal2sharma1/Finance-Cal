import { calculators } from '../src/calculators/registry.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'
import { getCalculatorSEO } from '../src/calculatorSeo.js'

const calculatorIds = calculators.map(({ config }) => config.id)
const idSet = new Set(calculatorIds)
const errors = []
const warnings = []

if (calculatorIds.length < 78) {
  errors.push(`Expected at least 78 calculators, found ${calculatorIds.length}.`)
}

if (idSet.size !== calculatorIds.length) {
  const duplicates = calculatorIds.filter((id, index) => calculatorIds.indexOf(id) !== index)
  errors.push(`Duplicate calculator IDs: ${[...new Set(duplicates)].join(', ')}`)
}

const seenTitles = new Map()
const seenDescriptions = new Map()

for (const { config } of calculators) {
  const seo = getCalculatorSEO(config.id)
  if (!seo?.title || !seo?.description) {
    errors.push(`Missing custom SEO metadata for calculator: ${config.id}`)
    continue
  }

  if (seo.title.length > 70) warnings.push(`Long SEO title (${seo.title.length} chars): ${config.id}`)
  if (seo.description.length < 100 || seo.description.length > 180) {
    warnings.push(`Unusual SEO description length (${seo.description.length} chars): ${config.id}`)
  }

  for (const [map, value, label] of [
    [seenTitles, seo.title, 'title'],
    [seenDescriptions, seo.description, 'description'],
  ]) {
    const previous = map.get(value)
    if (previous) errors.push(`Duplicate SEO ${label}: ${previous} and ${config.id}`)
    else map.set(value, config.id)
  }
}

for (const guide of guides) {
  for (const [, href] of guide.calculatorLinks) {
    const match = href.match(/^\/calculators\/([^/?#]+)$/)
    if (!match || !idSet.has(decodeURIComponent(match[1]))) {
      errors.push(`Guide ${guide.slug} links to unknown calculator: ${href}`)
    }
  }
}

for (const [slug, hub] of Object.entries(topicHubs)) {
  for (const id of hub.calculatorIds) {
    if (!idSet.has(id)) errors.push(`Topic hub ${slug} references unknown calculator: ${id}`)
  }
}

if (warnings.length) {
  console.log('SEO warnings:')
  for (const warning of warnings) console.log(`- ${warning}`)
}

if (errors.length) {
  console.error('SEO validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`SEO validation passed for ${calculatorIds.length} calculators, ${guides.length} guides and ${Object.keys(topicHubs).length} topic hubs.`)
