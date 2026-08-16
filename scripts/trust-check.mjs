import { calculators } from '../src/calculatorCatalog.js'
import { getTrustMetadata } from '../src/trustMetadata.js'

const failures = []
const officialSourceIds = new Set(Object.keys(await import('../src/trustMetadata.js')).trustMetadata)

function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(officialSourceIds.size >= 10, `Expected at least 10 calculators with official source metadata, found ${officialSourceIds.size}`)

for (const calculator of calculators) {
  const { config, explanation } = calculator
  assert(Boolean(explanation?.disclaimer), `Missing calculator disclaimer: ${config.id}`)
  const metadata = getTrustMetadata(config.id)
  if (metadata) {
    assert(Boolean(metadata.sourceLabel), `Missing source label: ${config.id}`)
    assert(/^https:\/\//.test(metadata.sourceUrl), `Invalid source URL: ${config.id}`)
    assert(Boolean(metadata.scope), `Missing source scope: ${config.id}`)
    assert(/^2026-/.test(metadata.reviewed), `Missing review date: ${config.id}`)
  }
}

if (failures.length) {
  console.error('Trust validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Trust validation passed for ${calculators.length} calculators; ${officialSourceIds.size} have official source metadata.`)
