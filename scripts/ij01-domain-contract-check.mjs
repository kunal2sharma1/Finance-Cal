import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

const inventory = await readFile('PROJECT_CONTEXT/workstreams/INTERNATIONAL_JURISDICTION/DOMAIN_INVENTORY.md', 'utf8')
const roadmap = await readFile('PROJECT_CONTEXT/workstreams/INTERNATIONAL_JURISDICTION/ROADMAP.md', 'utf8')

for (const concept of ['Country', 'Locale', 'Currency', 'Number system', 'Calculation jurisdiction']) {
  assert(inventory.includes(`**${concept}**`), `Missing canonical concept: ${concept}`)
}

for (const identifier of ['countryCode', 'locale', 'currencyCode', 'numberSystem', 'jurisdictionId']) {
  assert(inventory.includes(`- \`${identifier}\``), `Missing canonical identifier: ${identifier}`)
}

for (const phrase of [
  'Unsupported jurisdiction is an explicit state.',
  'must never silently fall back to another jurisdiction',
  '`getCountry()` also falls back to `DEFAULT_COUNTRY` (`IN`)',
  '`config.countries` is overloaded',
  'must be replaced or formalized as an explicit calculation-jurisdiction contract',
  'should remain calculation-discovery infrastructure; it should not become a second jurisdiction registry',
]) {
  assert(inventory.includes(phrase), `Missing required separation/fallback evidence: ${phrase}`)
}

assert(inventory.includes('`countryCode -> presentation defaults (optional)`'), 'Missing country-to-presentation dependency direction.')
assert(inventory.includes('`locale + currencyCode + numberSystem -> presentation only`'), 'Missing presentation-only dependency direction.')
assert(inventory.includes('`jurisdictionId -> calculation rules / sources / methodology`'), 'Missing jurisdiction ownership direction.')

assert(roadmap.includes('## IJ-01 — Domain inventory and separation contract'), 'IJ-01 roadmap entry is missing.')

const baseSha = '9bc07f8531ee4d89af3d4bc09d36de5060258c83'
let changedFiles = []
try {
  changedFiles = execFileSync('git', ['diff', '--name-only', `${baseSha}...HEAD`], { encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
} catch (error) {
  failures.push(`Unable to inspect git diff from IJ-01 starting SHA ${baseSha}: ${error.message}`)
}

for (const path of changedFiles) {
  if (/^src\/calculators\/.+\/(formula|config|explanation)\.js$/.test(path)) {
    failures.push(`Calculator implementation changed during IJ-01: ${path}`)
  }
  if (path === 'src/internationalCalculators.js') {
    failures.push('International calculator registry changed during IJ-01.')
  }
}

if (failures.length) {
  console.error('IJ-01 domain contract validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`IJ-01 domain contract validation passed; ${changedFiles.length} files changed from ${baseSha} with no calculator implementation changes.`)
