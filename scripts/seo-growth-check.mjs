import { guides } from '../src/guides.js'
import { calculators } from '../src/calculatorCatalog.js'
import { calculatorSEOContent } from '../src/seoCalculatorContent.js'
import { phase4CalculatorSEOContent } from '../src/seoPhase4Content.js'

const failures = []
const calculatorIds = new Set(calculators.map(({ config }) => config.id))
const guideSlugs = new Set(guides.map((guide) => guide.slug))

function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(guides.length >= 11, `Expected at least 11 SEO guides, found ${guides.length}`)
assert(guideSlugs.size === guides.length, 'Guide slugs must be unique')

for (const guide of guides) {
  assert(Boolean(guide.title), `Guide missing title: ${guide.slug}`)
  assert(Boolean(guide.metaTitle), `Guide missing metaTitle: ${guide.slug}`)
  assert(Boolean(guide.metaDescription), `Guide missing metaDescription: ${guide.slug}`)
  assert(Boolean(guide.intro), `Guide missing intro: ${guide.slug}`)
  assert(Array.isArray(guide.sections) && guide.sections.length >= 3, `Guide needs at least 3 sections: ${guide.slug}`)
  assert(Array.isArray(guide.calculatorLinks) && guide.calculatorLinks.length >= 2, `Guide needs calculator links: ${guide.slug}`)

  for (const [, href] of guide.calculatorLinks) {
    const match = href.match(/^\/calculators\/([^/]+)$/)
    assert(Boolean(match) && calculatorIds.has(decodeURIComponent(match[1])), `Guide ${guide.slug} links to unknown calculator: ${href}`)
  }
}

for (const id of ['savings-rate', 'real-return', 'bond-return', 'auto-loan', 'debt-to-income']) {
  assert(Boolean(phase4CalculatorSEOContent[id]), `Missing Phase 4 SEO content: ${id}`)
}

assert(Object.keys(calculatorSEOContent).length > 0, 'Existing calculator SEO content is empty')

if (failures.length) {
  console.error('SEO growth validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`SEO growth validation passed for ${guides.length} guides and ${calculators.length} calculators.`)
