import { readFile } from 'node:fs/promises'
import { calculators } from '../src/calculators/registry.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'
import { getCalculatorSEO } from '../src/calculatorSeo.js'

const errors = []
const calculatorIds = calculators.map(({ config }) => config.id)
const idSet = new Set(calculatorIds.map((id) => id.toLowerCase()))

const calculatorViewSource = await readFile(new URL('../src/pages/CalculatorView.jsx', import.meta.url), 'utf8')
const seoSource = await readFile(new URL('../src/seo.js', import.meta.url), 'utf8')
const sitemapSource = await readFile(new URL('../scripts/generate-sitemap.mjs', import.meta.url), 'utf8')

// Every calculator route is derived from its registry ID and the calculator
// page contains exactly one H1 generated from the current calculator title.
if (!calculatorViewSource.includes('<h1 className="calc-view__title">{config.title}</h1>')) {
  errors.push('CalculatorView is missing its canonical calculator H1.')
}
if (!calculatorViewSource.includes('href={`/calculators/${encodeURIComponent(related.id)}`}')) {
  errors.push('Related calculator links are not using canonical encoded calculator URLs.')
}
if (!calculatorViewSource.includes("window.scrollTo({ top: 0, left: 0, behavior: 'auto' })")) {
  errors.push('CalculatorView is missing the scroll-to-top behavior on route changes.')
}

// SEO runtime implementation must emit a canonical URL, robots directive,
// Open Graph metadata and JSON-LD for every supported route.
for (const required of [
  "upsertMeta('name', 'robots'",
  "upsertMeta('property', 'og:title'",
  "upsertMeta('property', 'og:url'",
  "upsertLink('canonical'",
  "application/ld+json",
  "'@type': 'WebApplication'",
]) {
  if (!seoSource.includes(required)) {
    errors.push(`SEO implementation is missing required element: ${required}`)
  }
}

// The sitemap must be generated from the same source of truth and must cover
// every calculator, guide, topic hub and information route.
for (const required of [
  "for (const { config } of calculators)",
  "for (const guide of guides)",
  "Object.keys(topicHubs)",
  "const infoRoutes = ['/about', '/how-it-works', '/privacy', '/contact']",
]) {
  if (!sitemapSource.includes(required)) {
    errors.push(`Sitemap generator is missing expected route source: ${required}`)
  }
}

for (const { config } of calculators) {
  const seo = getCalculatorSEO(config.id)
  if (!seo?.title || !seo?.description) {
    errors.push(`Missing calculator SEO metadata: ${config.id}`)
  }
}

// Validate guide and hub calculator references case-insensitively so accidental
// IDs such as EPF vs epf cannot silently create orphaned internal links.
for (const guide of guides) {
  for (const [, href] of guide.calculatorLinks) {
    const match = href.match(/^\/calculators\/([^/?#]+)$/)
    if (match && !idSet.has(decodeURIComponent(match[1]).toLowerCase())) {
      errors.push(`Guide ${guide.slug} links to unknown calculator: ${href}`)
    }
  }
}

for (const [slug, hub] of Object.entries(topicHubs)) {
  for (const id of hub.calculatorIds) {
    if (!idSet.has(String(id).toLowerCase())) {
      errors.push(`Topic hub ${slug} references unknown calculator: ${id}`)
    }
  }
}

if (errors.length) {
  console.error('Deep SEO validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Deep SEO validation passed for ${calculatorIds.length} calculators, ${guides.length} guides and ${Object.keys(topicHubs).length} topic hubs.`)
