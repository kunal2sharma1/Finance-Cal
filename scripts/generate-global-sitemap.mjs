import { mkdir, writeFile } from 'node:fs/promises'
import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'
import { countryPages } from '../src/countryPages.js'
import { getCanonicalUrl } from '../src/siteConfig.js'

const urls = new Set(['/'])

for (const slug of Object.keys(topicHubs)) urls.add(`/${slug}`)
for (const guide of guides) urls.add(`/guides/${guide.slug}`)
for (const { config } of calculators) urls.add(`/calculators/${encodeURIComponent(config.id)}`)
for (const route of ['/about', '/how-it-works', '/privacy', '/contact']) urls.add(route)
for (const country of countryPages) urls.add(`/countries/${country.slug}`)
urls.add('/countries')

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...urls].map((path) => `  <url><loc>${getCanonicalUrl(path)}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

await mkdir('public', { recursive: true })
await writeFile('public/sitemap.xml', xml, 'utf8')
console.log(`Generated global sitemap with ${urls.size} URLs (${calculators.length} calculators).`)
