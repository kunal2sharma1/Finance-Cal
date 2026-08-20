import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { decisionJourneys } from '../src/decisionJourneys.js'

const appSeo = await readFile(new URL('../src/AppSeo.jsx', import.meta.url), 'utf8')
const home = await readFile(new URL('../src/pages/Home.jsx', import.meta.url), 'utf8')
const sitemap = await readFile(new URL('./generate-global-sitemap.mjs', import.meta.url), 'utf8')
const searchIntent = await readFile(new URL('../src/searchIntent.js', import.meta.url), 'utf8')
const calculatorMeta = await readFile(new URL('../src/calculatorMeta.js', import.meta.url), 'utf8')

const expectedSlugs = [
  'wealth-building',
  'retirement-planning',
  'home-buying',
  'debt-management',
  'job-offer-comparison',
]

const staleJourneyIdentifiers = [
  'home-and-borrowing',
  'debt-free',
  'career-finance',
  'tax-planning',
  'education-planning',
  'risk-protection',
]

assert.deepEqual(decisionJourneys.map(({ slug }) => slug), expectedSlugs, 'canonical journey slugs changed unexpectedly')
assert.match(appSeo, /if \(path === '\/journeys'\) return \{ type: 'journeys' \}/, 'missing /journeys route')
assert.match(appSeo, /path\.match\(\/\^\\\/journeys\\\/\(\[\^\/\]\+\)\$\//, 'missing /journeys/:slug route')
assert.match(appSeo, /<JourneysIndex \/>/, 'missing JourneysIndex rendering')
assert.match(home, /href="\/journeys"/, 'homepage is missing the journeys index link')
assert.match(home, /href=\{`\/journeys\/\$\{journey\.slug\}`\}/, 'homepage is missing journey detail links')
assert.match(sitemap, /urls\.add\('\/journeys'\)/, 'journeys index is missing from sitemap generation')

for (const identifier of staleJourneyIdentifiers) {
  const pattern = new RegExp(`['"]${identifier}['"]`)
  assert.doesNotMatch(searchIntent, pattern, `stale search journey identifier remains: ${identifier}`)
  assert.doesNotMatch(calculatorMeta, pattern, `stale calculator journey identifier remains: ${identifier}`)
}

console.log('Product Experience PX-02 route/discovery validation passed.')
