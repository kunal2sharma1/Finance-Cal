import { readFile } from 'node:fs/promises'
import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'
import { countryPages } from '../src/countryPages.js'

const failures = []
const ids = calculators.map(({ config }) => config.id)
const idSet = new Set(ids)
const appSource = await readFile('src/App.jsx', 'utf8')
const calcSource = await readFile('src/pages/CalculatorView.jsx', 'utf8')
const guideSource = await readFile('src/pages/GuideView.jsx', 'utf8')
const topicSource = await readFile('src/pages/TopicHub.jsx', 'utf8')
const countrySource = await readFile('src/pages/CountryPage.jsx', 'utf8')

const occurrences = new Map(ids.map((id) => [id, { hub: 0, guide: 0, country: 0 }]))
for (const hub of Object.values(topicHubs)) {
  for (const id of hub.calculatorIds) if (occurrences.has(id)) occurrences.get(id).hub += 1
}
for (const guide of guides) {
  for (const [, href] of guide.calculatorLinks || []) {
    const match = href.match(/^\/calculators\/([^/?#]+)$/)
    const id = match ? decodeURIComponent(match[1]) : null
    if (id && occurrences.has(id)) occurrences.get(id).guide += 1
  }
}
for (const page of countryPages) {
  for (const id of page.priorityCalculatorIds || []) if (occurrences.has(id)) occurrences.get(id).country += 1
}

for (const [id, counts] of occurrences) {
  const hasEntryPath = counts.hub > 0 || counts.guide > 0 || counts.country > 0
  if (!hasEntryPath) failures.push(`Orphan calculator has no topic, guide or country entry path: ${id}`)
}

for (const hub of Object.values(topicHubs)) {
  for (const id of hub.calculatorIds) {
    if (!idSet.has(id)) failures.push(`Topic hub references unknown calculator: ${hub.slug} -> ${id}`)
  }
}

for (const guide of guides) {
  for (const [, href] of guide.calculatorLinks || []) {
    const match = href.match(/^\/calculators\/([^/?#]+)$/)
    if (!match || !idSet.has(decodeURIComponent(match[1]))) failures.push(`Guide contains broken calculator link: ${guide.slug} -> ${href}`)
  }
}

if (!appSource.includes('/calculators/')) failures.push('Application router is missing calculator routes.')
if (!calcSource.includes('href={`/calculators/')) failures.push('Calculator pages are missing crawlable related-calculator links.')
if (!guideSource.includes('calculatorLinks.map')) failures.push('Guide pages are missing crawlable calculator links.')
if (!topicSource.includes('href={`/guides/')) failures.push('Topic hubs are missing crawlable guide links.')
if (!countrySource.includes('href={`/calculators/')) failures.push('Country pages are missing crawlable calculator links.')

if (failures.length) {
  console.error('Internal link coverage validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const withHub = [...occurrences.values()].filter((value) => value.hub > 0).length
const withGuide = [...occurrences.values()].filter((value) => value.guide > 0).length
const withCountry = [...occurrences.values()].filter((value) => value.country > 0).length
console.log(`Internal link coverage passed: ${ids.length} calculators; ${withHub} in topic hubs, ${withGuide} in guides, ${withCountry} in country entry paths.`)
