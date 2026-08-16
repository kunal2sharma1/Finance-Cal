import { mkdir, writeFile } from 'node:fs/promises'
import { calculators } from '../src/calculators/registry.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'

const BASE_URL = 'https://finance-cal.kunal2sharma1.workers.dev'
const infoRoutes = ['/about', '/how-it-works', '/privacy', '/contact']
const urls = new Set(['/'])

for (const slug of Object.keys(topicHubs)) urls.add(`/${slug}`)
for (const guide of guides) urls.add(`/guides/${guide.slug}`)
for (const { config } of calculators) {
  urls.add(`/calculators/${encodeURIComponent(config.id)}`)
}
for (const route of infoRoutes) urls.add(route)

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...urls].map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

await mkdir('public', { recursive: true })
await writeFile('public/sitemap.xml', xml, 'utf8')
console.log(`Generated sitemap with ${urls.size} URLs.`)
