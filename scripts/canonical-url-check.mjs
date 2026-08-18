import { readFile } from 'node:fs/promises'
import { CANONICAL_SITE_URL, getCanonicalUrl } from '../src/siteConfig.js'

const errors = []
const sourceFiles = [
  'src/seo.js',
  'scripts/generate-global-sitemap.mjs',
]

if (!/^https:\/\/[^/]+$/.test(CANONICAL_SITE_URL)) {
  errors.push(`Canonical site URL must be a single HTTPS origin: ${CANONICAL_SITE_URL}`)
}

if (CANONICAL_SITE_URL.endsWith('/')) {
  errors.push('Canonical site URL must not end with a slash.')
}

for (const pathname of ['/', '/calculators/sip', '/guides/how-sip-works']) {
  const url = getCanonicalUrl(pathname)
  if (!url.startsWith(`${CANONICAL_SITE_URL}/`)) {
    errors.push(`Canonical URL is not based on the central site URL: ${url}`)
  }
}

for (const path of sourceFiles) {
  const content = await readFile(path, 'utf8')
  if (content.includes('window.location.origin')) {
    errors.push(`${path} derives canonical URLs from the runtime origin.`)
  }
  if (content.includes('finance-cal.kunal2sharma1.workers.dev')) {
    errors.push(`${path} hardcodes the production canonical host instead of importing siteConfig.`)
  }
}

const sitemapGenerator = await readFile('scripts/generate-global-sitemap.mjs', 'utf8')
if (!sitemapGenerator.includes("import { getCanonicalUrl } from '../src/siteConfig.js'")) {
  errors.push('Sitemap generator does not import the canonical URL helper.')
}

const seo = await readFile('src/seo.js', 'utf8')
if (!seo.includes("from './siteConfig.js'")) {
  errors.push('Runtime SEO does not import the canonical site configuration.')
}

if (errors.length) {
  console.error('Canonical URL validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Canonical URL validation passed: ${CANONICAL_SITE_URL}`)
