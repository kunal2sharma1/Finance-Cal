import { calculators } from '../src/calculatorCatalog.js'
import { trustMetadata } from '../src/trustMetadata.js'
import { getTrustRules, isValidTrustRule } from '../src/trustRules.js'

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

for (const calculator of calculators) {
  const id = calculator.config.id
  if (!trustMetadata[id]) continue

  const rules = getTrustRules(id)
  assert(rules.length > 0, `Missing rule provenance: ${id}`)

  const ids = new Set()
  for (const rule of rules) {
    assert(isValidTrustRule(rule), `Invalid trust rule: ${id}/${rule?.id || 'unknown'}`)
    assert(!ids.has(rule.id), `Duplicate trust rule id: ${id}/${rule.id}`)
    ids.add(rule.id)
    assert(rule.calculatorId === id, `Trust rule calculator mismatch: ${id}/${rule.id}`)
    assert(rule.source.url === trustMetadata[id].sourceUrl, `Rule source mismatch: ${id}/${rule.id}`)
    assert(rule.reviewedAt === trustMetadata[id].reviewed, `Rule review date mismatch: ${id}/${rule.id}`)
  }
}

if (failures.length) {
  console.error('Trust provenance validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const ruleCount = Object.values(trustMetadata).reduce((sum, id) => sum + getTrustRules(id).length, 0)
console.log(`Trust provenance validation passed: ${ruleCount} rules mapped to ${Object.keys(trustMetadata).length} sourced calculators.`)
