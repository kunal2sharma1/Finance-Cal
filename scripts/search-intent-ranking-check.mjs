import assert from 'node:assert/strict'
import { inferSearchIntent, scoreSearchResult } from '../src/searchIntent.js'

const cases = [
  ['compare home loan vs personal loan', 'compare', 'borrowing', 'home-buying'],
  ['can i afford a loan', 'check', 'borrowing', 'home-buying'],
  ['can i afford a house', 'check', 'borrowing', 'home-buying'],
  ['how much loan can i afford', 'check', 'borrowing', 'home-buying'],
  ['should i save or repay my loan', 'plan', 'borrowing', 'home-buying'],
  ['how much should i retire', 'plan', 'retirement', 'retirement-planning'],
  ['projected mutual fund growth', 'project', 'investing', 'wealth-building'],
  ['xirr return rate', 'measure', 'investing', 'wealth-building'],
  ['calculate emi', 'calculate', 'borrowing', 'home-buying'],
]

for (const [query, intent, domain, journey] of cases) {
  const result = inferSearchIntent(query)
  assert.equal(result.intent, intent, `${query}: intent mismatch`)
  assert.equal(result.domain, domain, `${query}: domain mismatch`)
  assert.equal(result.journey, journey, `${query}: journey mismatch`)
}

const aligned = {
  type: 'calculator',
  title: 'Retirement Plan Calculator',
  searchText: 'retirement plan calculator',
  intent: 'plan',
  domain: 'retirement',
  primaryJourney: 'retirement-planning',
}
const unrelated = { ...aligned, intent: 'calculate', domain: 'investing', primaryJourney: 'wealth-building' }
const meta = { term: 'retirement', intent: 'plan', domain: 'retirement', journey: 'retirement-planning' }
assert.ok(scoreSearchResult(aligned, meta) > scoreSearchResult(unrelated, meta), 'intent/domain/journey signals must affect ranking')

const noQuery = inferSearchIntent('')
assert.deepEqual(noQuery, { intent: 'calculate', domain: null, journey: null })

console.log('Search intent/ranking checks passed.')
