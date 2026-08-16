import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

const ids = new Set(calculators.map(({ config }) => config.id))
const guideSlugs = guides.map((guide) => guide.slug)
const uniqueSlugs = new Set(guideSlugs)

assert(guides.length >= 23, `Expected at least 23 guides after SEO Growth V1, found ${guides.length}`)
assert(uniqueSlugs.size === guideSlugs.length, 'Duplicate guide slugs detected')

for (const guide of guides) {
  assert(guide.slug && guide.title && guide.metaTitle && guide.metaDescription, `Incomplete guide metadata: ${guide.slug || '(unknown)'}`)
  assert(Array.isArray(guide.sections) && guide.sections.length >= 3, `Guide needs at least 3 content sections: ${guide.slug}`)
  assert(Array.isArray(guide.calculatorLinks) && guide.calculatorLinks.length >= 2, `Guide needs calculator links: ${guide.slug}`)
  for (const [, href] of guide.calculatorLinks) {
    const match = href.match(/^\/calculators\/([^/]+)$/)
    assert(match && ids.has(decodeURIComponent(match[1])), `Guide ${guide.slug} links to unknown calculator: ${href}`)
  }
}

for (const topic of Object.keys(topicHubs)) {
  assert(guides.some((guide) => guide.topic === topic), `Topic hub has no supporting guide: ${topic}`)
}

const priorityCalculatorIds = [
  'sip', 'ppf', 'fd', 'rd', 'emi', 'home-loan', 'loan-prepayment', 'xirr',
  'compound-interest', 'net-worth', 'fire', 'nps', 'salary-take-home',
  'income-tax', 'savings-rate', 'real-return', 'bond-return', 'auto-loan',
  'emergency-fund', 'retirement',
]

for (const calculatorId of priorityCalculatorIds) {
  const covered = guides.some((guide) => guide.calculatorLinks.some(([, href]) => href === `/calculators/${calculatorId}`))
  assert(covered, `Priority calculator lacks supporting guide coverage: ${calculatorId}`)
}

if (failures.length) {
  console.error('SEO Growth V1 validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`SEO Growth V1 validation passed: ${calculators.length} calculators, ${guides.length} guides, ${Object.keys(topicHubs).length} topic hubs.`)
