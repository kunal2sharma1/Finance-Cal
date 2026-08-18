import assert from 'node:assert/strict'
import { detectSearch } from '../src/searchCatalog.js'

const cases = [
  ['compare mortgage vs rent', 'compare', 'borrowing'],
  ['how much loan can i afford', 'check', 'borrowing'],
  ['plan for retirement', 'plan', 'retirement'],
  ['xirr return rate', 'measure', 'investing'],
  ['future value of monthly investment', 'project', 'investing'],
  ['calculate emi payment', 'calculate', 'borrowing'],
  ['how should i handle my home buying decision', 'plan', 'borrowing'],
]

for (const [query, expectedIntent, expectedDomain] of cases) {
  const result = detectSearch(query)
  assert.equal(result.intent, expectedIntent, `${query}: intent mismatch`)
  assert.equal(result.domain, expectedDomain, `${query}: domain mismatch`)
  assert.ok(result.journey, `${query}: journey must be present`)
  assert.ok(result.recognized, `${query}: query must be recognized`)
  assert.ok(result.confidence >= 0.55, `${query}: confidence must be meaningful`)
  assert.ok(result.evidence.length > 0, `${query}: evidence must be retained`)
}

const typo = detectSearch('mortage calculator')
assert.equal(typo.domain, 'borrowing', 'typo recovery must happen before intent detection')
assert.equal(typo.corrected, true, 'typo recovery must be reported')
assert.ok(typo.corrections.length > 0, 'typo correction evidence must be retained')

const unknown = detectSearch('zzzxqvplm unknown phrase')
assert.equal(unknown.domain, null, 'unknown query must not invent a domain')
assert.equal(unknown.recognized, false, 'unknown query must remain unrecognized')
assert.equal(unknown.confidence, 0, 'unknown query must have zero confidence')

console.log('Search intent detection checks passed.')
