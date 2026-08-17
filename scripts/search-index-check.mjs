import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { calculatorSearchIndex, guideSearchIndex, searchIndex } from '../src/searchIndex.js'

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

assert(searchIndex.length === calculators.length + guides.length, `Search index size mismatch: expected ${calculators.length + guides.length}, found ${searchIndex.length}`)
assert(calculatorSearchIndex.length === calculators.length, `Calculator index size mismatch: expected ${calculators.length}, found ${calculatorSearchIndex.length}`)
assert(guideSearchIndex.length === guides.length, `Guide index size mismatch: expected ${guides.length}, found ${guideSearchIndex.length}`)

const calculatorIds = new Set()
for (const entry of calculatorSearchIndex) {
  assert(entry.type === 'calculator', `Invalid calculator entry type: ${entry.id}`)
  assert(entry.id && !calculatorIds.has(entry.id), `Duplicate calculator index id: ${entry.id}`)
  calculatorIds.add(entry.id)
  assert(entry.title, `Missing calculator title: ${entry.id}`)
  assert(entry.href === `/calculators/${encodeURIComponent(entry.id)}`, `Invalid calculator href: ${entry.id}`)
  assert(entry.searchText.includes(String(entry.title).trim().toLowerCase()), `Title missing from calculator search text: ${entry.id}`)
  assert(Array.isArray(entry.keywords), `Calculator keywords must be an array: ${entry.id}`)
  assert(Array.isArray(entry.countries), `Calculator countries must be an array: ${entry.id}`)
}

const guideSlugs = new Set()
for (const entry of guideSearchIndex) {
  assert(entry.type === 'guide', `Invalid guide entry type: ${entry.slug}`)
  assert(entry.slug && !guideSlugs.has(entry.slug), `Duplicate guide index slug: ${entry.slug}`)
  guideSlugs.add(entry.slug)
  assert(entry.title, `Missing guide title: ${entry.slug}`)
  assert(entry.href === `/guides/${entry.slug}`, `Invalid guide href: ${entry.slug}`)
  assert(entry.searchText.includes(String(entry.title).trim().toLowerCase()), `Title missing from guide search text: ${entry.slug}`)
}

const expectedCalculatorIds = calculators.map(({ config }) => config.id).sort()
const indexedCalculatorIds = [...calculatorIds].sort()
const expectedGuideSlugs = guides.map((guide) => guide.slug).sort()
const indexedGuideSlugs = [...guideSlugs].sort()

assert(JSON.stringify(expectedCalculatorIds) === JSON.stringify(indexedCalculatorIds), 'Calculator index does not cover the catalogue exactly')
assert(JSON.stringify(expectedGuideSlugs) === JSON.stringify(indexedGuideSlugs), 'Guide index does not cover the guide catalogue exactly')

if (failures.length) {
  console.error('Search index validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Structured search index validation passed: ${calculatorSearchIndex.length} calculators + ${guideSearchIndex.length} guides.`)
