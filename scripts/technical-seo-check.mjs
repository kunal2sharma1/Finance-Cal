import { readFile } from 'node:fs/promises'
import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'
import { countryPages } from '../src/countryPages.js'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const ids = new Set(calculators.map(({ config }) => config.id))

const sitemapSource = await readFile('scripts/generate-global-sitemap.mjs', 'utf8')
const seoSource = await readFile('src/seo.js', 'utf8')
const appSource = await readFile('src/App.jsx', 'utf8')
const calcSource = await readFile('src/pages/CalculatorView.jsx', 'utf8')
const guideSource = await readFile('src/pages/GuideView.jsx', 'utf8')
const topicSource = await readFile('src/pages/TopicHub.jsx', 'utf8')
const countrySource = await readFile('src/pages/CountryPage.jsx', 'utf8')

assert(sitemapSource.includes('calculators'), 'Sitemap generator must include calculators.')
assert(sitemapSource.includes('guides'), 'Sitemap generator must include guides.')
assert(sitemapSource.includes('topicHubs'), 'Sitemap generator must include topic hubs.')
assert(sitemapSource.includes('countryPages'), 'Sitemap generator must include country pages.')
assert(seoSource.includes("upsertLink('canonical'"), 'Canonical link generation is missing.')
assert(appSource.includes("/calculators/"), 'Calculator routes are missing from the application router.')
assert(appSource.includes("/guides/"), 'Guide routes are missing from the application router.')
assert(calcSource.includes('href={`/calculators/'), 'Calculator pages must expose crawlable related-calculator links.')
assert(guideSource.includes('calculatorLinks'), 'Guide pages must expose crawlable calculator links.')
assert(topicSource.includes('href={`/guides/'), 'Topic hubs must expose crawlable guide links.')
assert(countrySource.includes('href={`/calculators/'), 'Country pages must expose crawlable calculator links.')

for (const guide of guides) {
  for (const [, href] of guide.calculatorLinks) {
    const match = href.match(/^\/calculators\/([^/?#]+)$/)
    assert(match && ids.has(decodeURIComponent(match[1])), `Broken guide calculator link: ${guide.slug} -> ${href}`)
  }
}

for (const [slug, hub] of Object.entries(topicHubs)) {
  assert(hub.calculatorIds.every((id) => ids.has(id)), `Topic hub contains unknown calculator: ${slug}`)
}

for (const page of countryPages) {
  assert(Array.isArray(page.priorityCalculatorIds), `Country page missing priority calculators: ${page.code}`)
}

if (failures.length) {
  console.error('Technical SEO validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Technical SEO validation passed: ${ids.size} calculators, ${guides.length} guides, ${Object.keys(topicHubs).length} topic hubs, ${countryPages.length} country pages.`)
