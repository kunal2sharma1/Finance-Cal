import fs from 'node:fs'

const policy = fs.readFileSync('src/indexabilityPolicy.js', 'utf8')
const seo = fs.readFileSync('src/seo.js', 'utf8')
const app = fs.readFileSync('src/App.jsx', 'utf8')
const specialApp = fs.readFileSync('src/AppSeo.jsx', 'utf8')
const sitemap = fs.readFileSync('scripts/generate-global-sitemap.mjs', 'utf8')
const robots = fs.readFileSync('public/robots.txt', 'utf8')

const requiredIndexableRoutes = ['home', 'calculator', 'guide', 'guides', 'country', 'countries', 'hub', 'info', 'journey']
for (const route of requiredIndexableRoutes) {
  if (!policy.includes(`'${route}'`)) throw new Error(`Missing indexable route type: ${route}`)
}

for (const route of ['not-found', 'unknown']) {
  if (!policy.includes(`'${route}'`)) throw new Error(`Missing noindex route type: ${route}`)
}

if (!seo.includes("upsertMeta('name', 'robots', getRobotsContent(policy))")) {
  throw new Error('SEO runtime does not apply the explicit robots policy')
}

for (const marker of ["routeType: 'calculator'", "routeType: 'guide'", "routeType: 'guides'", "routeType: 'country'", "routeType: 'countries'", "routeType: 'hub'", "routeType: 'info'", "routeType: 'home'"]) {
  if (!app.includes(marker)) throw new Error(`App route missing indexability mapping: ${marker}`)
}

for (const marker of ["routeType: 'journey'", "routeType: 'guide'", "routeType: 'hub'"]) {
  if (!specialApp.includes(marker)) throw new Error(`Decision route missing indexability mapping: ${marker}`)
}

if (!app.includes("routeType: 'not-found', routeExists: false")) {
  throw new Error('Not-found routes are not explicitly marked noindex')
}

if (!app.includes("routeExists: false")) throw new Error('Unresolved app routes lack an explicit noindex signal')
if (!specialApp.includes("routeExists: false")) throw new Error('Unresolved special routes lack an explicit noindex signal')
if (!sitemap.includes("for (const journey of decisionJourneys) urls.add(`/journeys/${journey.slug}`)")) {
  throw new Error('Indexable decision journeys are missing from the sitemap generator')
}
if (!sitemap.includes("urls.add('/guides')")) throw new Error('Guides index is missing from the sitemap generator')
if (!robots.includes('Allow: /')) throw new Error('robots.txt must not globally block the public site')
if (!robots.includes('Sitemap:')) throw new Error('robots.txt must advertise the sitemap')

console.log('Indexability policy checks passed.')
