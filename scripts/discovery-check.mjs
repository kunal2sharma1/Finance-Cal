import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { searchSite } from '../src/searchCatalog.js'

const failures = []
function assert(condition, message) { if (!condition) failures.push(message) }

assert(calculators.length >= 100, `Expected at least 100 calculators, found ${calculators.length}`)
assert(guides.length >= 11, `Expected at least 11 guides, found ${guides.length}`)

for (const query of ['sip', 'loan', 'retirement', 'emergency', 'bond']) {
  const results = searchSite(query, { countryCode: 'IN' })
  assert(results.length > 0, `Search returned no results for: ${query}`)
  assert(results.every((result) => result.href.startsWith('/calculators/') || result.href.startsWith('/guides/')), `Invalid search href for: ${query}`)
}

const usResults = searchSite('mortgage', { countryCode: 'US' })
assert(usResults.some((result) => result.type === 'calculator'), 'US mortgage search should return a calculator')

const guideResults = searchSite('SIP', { countryCode: 'IN' })
assert(guideResults.some((result) => result.type === 'guide'), 'SIP search should surface a guide')

if (failures.length) {
  console.error('Discovery validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Discovery validation passed for ${calculators.length} calculators and ${guides.length} guides.`)
