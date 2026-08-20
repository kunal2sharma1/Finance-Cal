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

assert.deepEqual(decisionJourneys.map(({ slug }) => slug), expectedSlugs, 'canonical journey slugs changed unexpectedly')
assert.match(appSeo, /if \(path === '\/journeys'\) return \{ type: 'journeys' \}/, 'missing /journeys route')
assert.match(appSeo, /path\.match\(\/\^\\\/journeys\\\/\(\[\^\/\]\+\)\$\//, 'missing /journeys/:slug route')
assert.match(appSeo, /<JourneysIndex \/>/, 'missing JourneysIndex rendering')
assert.match(home, /href="\/journeys"/, 'homepage is missing the journeys index link')
assert.match(home, /href=\{`\/journeys\/\$\{journey\.slug\}`\}/, 'homepage is missing journey detail links')
assert.match(sitemap, /urls\.add\('\/journeys'\)/, 'journeys index is missing from sitemap generation')
assert.doesNotMatch(searchIntent, /home-and-borrowing|debt-free|career-finance|retirement'|tax-planning|education-planning|risk-protection|financial-health/, 'stale search journey identifiers remain')
assert.doesNotMatch(calculatorMeta, /home-and-borrowing|debt-free|career-finance|retirement'|tax-planning|education-planning|risk-protection|financial-health|financial-planning'\s*\}/, 'stale calculator journey identifiers remain')

console.log('Product Experience PX-02 route/discovery validation passed.')
