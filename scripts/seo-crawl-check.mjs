import { readFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'
import { countryPages } from '../src/countryPages.js'
import { getDecisionJourneys } from '../src/decisionJourneys.js'
import { CANONICAL_SITE_URL } from '../src/siteConfig.js'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const REQUEST_TIMEOUT_MS = 5000

function expectedPublicPaths() {
  const paths = new Set(['/'])
  for (const slug of Object.keys(topicHubs)) paths.add(`/${slug}`)
  paths.add('/guides')
  for (const guide of guides) paths.add(`/guides/${guide.slug}`)
  for (const { config } of calculators) paths.add(`/calculators/${encodeURIComponent(config.id)}`)
  for (const route of ['/about', '/how-it-works', '/privacy', '/contact']) paths.add(route)
  paths.add('/countries')
  for (const country of countryPages) paths.add(`/countries/${country.slug}`)
  for (const journey of getDecisionJourneys()) paths.add(`/journeys/${journey.slug}`)
  return paths
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
}

async function waitForServer(url, timeoutMs = 15000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) })
      if (response.ok) return
    } catch {
      // Keep polling until the preview server is ready.
    }
    await sleep(150)
  }
  throw new Error(`Preview server did not become ready within ${timeoutMs}ms: ${url}`)
}

async function stopProcessTree(child) {
  if (!child.pid) return

  if (process.platform !== 'win32') {
    try { process.kill(-child.pid, 'SIGTERM') } catch {}
    await Promise.race([onceExit(child), sleep(2000)])
    if (!child.killed) {
      try { process.kill(-child.pid, 'SIGKILL') } catch {}
    }
  } else {
    try { child.kill('SIGTERM') } catch {}
    await Promise.race([onceExit(child), sleep(2000)])
    if (!child.killed) {
      try { child.kill('SIGKILL') } catch {}
    }
  }
}

function onceExit(child) {
  if (child.exitCode !== null || child.signalCode) return Promise.resolve()
  return new Promise((resolve) => child.once('exit', resolve))
}

const robots = await readFile('public/robots.txt', 'utf8')
const sitemap = await readFile('public/sitemap.xml', 'utf8')
const locs = extractLocs(sitemap)
const expected = expectedPublicPaths()
const expectedUrls = new Set([...expected].map((path) => `${CANONICAL_SITE_URL}${path}`))
const locSet = new Set(locs)

assert(robots.includes('User-agent: *'), 'robots.txt must declare a user-agent policy.')
assert(robots.includes('Allow: /'), 'robots.txt must allow the public site.')
assert(robots.includes('Sitemap:'), 'robots.txt must advertise the sitemap.')
assert(locs.length > 0, 'Sitemap must contain at least one URL.')
assert(locs.length === locSet.size, 'Sitemap must not contain duplicate URLs.')

for (const url of locs) {
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    failures.push(`Sitemap contains an invalid URL: ${url}`)
    continue
  }
  assert(parsed.origin === CANONICAL_SITE_URL, `Sitemap URL uses the wrong canonical origin: ${url}`)
  assert(!parsed.hash, `Sitemap URL must not contain a fragment: ${url}`)
  assert(!parsed.search, `Sitemap URL must not contain a query string: ${url}`)
}

for (const url of expectedUrls) {
  assert(locSet.has(url), `Indexable public route is missing from sitemap: ${url}`)
}

for (const url of locs) {
  assert(expectedUrls.has(url), `Sitemap contains an unexpected public route: ${url}`)
}

const child = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
  detached: process.platform !== 'win32',
})

try {
  await waitForServer('http://127.0.0.1:4173/')

  for (const url of locs) {
    const pathname = new URL(url).pathname
    try {
      const response = await fetch(`http://127.0.0.1:4173${pathname}`, {
        redirect: 'manual',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
      assert(response.status === 200, `Preview route did not resolve successfully (${response.status}): ${pathname}`)
      assert(!response.headers.get('location'), `Preview route unexpectedly redirects: ${pathname}`)
      const contentType = response.headers.get('content-type') || ''
      assert(contentType.includes('text/html'), `Preview route did not return HTML: ${pathname}`)
      await response.body?.cancel()
    } catch (error) {
      assert(false, `Preview route request failed or timed out (${error?.name || 'unknown error'}): ${pathname}`)
    }
  }

  const sitemapResponse = await fetch('http://127.0.0.1:4173/sitemap.xml', {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  assert(sitemapResponse.status === 200, `Preview sitemap is not reachable: ${sitemapResponse.status}`)
  assert((sitemapResponse.headers.get('content-type') || '').includes('xml'), 'Preview sitemap must return XML content.')
  await sitemapResponse.body?.cancel()

  const robotsResponse = await fetch('http://127.0.0.1:4173/robots.txt', {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  assert(robotsResponse.status === 200, `Preview robots.txt is not reachable: ${robotsResponse.status}`)
  assert((robotsResponse.headers.get('content-type') || '').includes('text/plain'), 'Preview robots.txt must return text content.')
  await robotsResponse.body?.cancel()
} finally {
  await stopProcessTree(child)
}

if (failures.length) {
  console.error('Production-like SEO crawl validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Production-like SEO crawl passed: ${locs.length} sitemap URLs, ${expected.size} expected public routes, preview reachability verified.`)
