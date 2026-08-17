import assert from 'node:assert/strict'
import { inferSearchIntent, scoreSearchResult } from '../src/searchIntent.js'

const cases = [
  ['compare home loan vs personal loan', 'compare', 'borrowing', 'home-and-borrowing'],
  ['can i afford a house', 'check', 'borrowing', 'home-and-borrowing'],
  ['how much should i save for retirement', 'plan', 'saving', 'saving'],
  ['projected mutual fund growth', 'project', 'investing', 'wealth-building'],
  ['xirr return rate', 'measure', 'investing', 'wealth-building'],
  ['calculate emi', 'calculate', 'borrowing', 'home-and-borrowing'],
]

for (const [query, intent, domain, journey] of cases) {
  const result = inferSearchIntent(query)
  assert.equal(result.intent, intent, `${query}: intent mismatch`)
  assert.equal(result.domain, domain, `${query}: domain mismatch`)
  assert.equal(result.journey, journey, `${query}: journey mismatch`)
}

const generic = {
  type: 'calculator',
  title: 'Retirement Corpus Calculator',
  searchText: 'retirement corpus calculator',
  intent: 'plan',
  domain: 'saving',
  primaryJourney: 'retirement',
}
const unrelated = { ...generic, intent: 'calculate', domain: 'investing', primaryJourney: 'wealth-building' }
const meta = { term: 'retirement', intent: 'plan', domain: 'retirement', journey: 'retirement' }
assert.ok(scoreSearchResult(generic, meta) > scoreSearchResult(unrelated, meta), 'intent/domain/journey signals must affect ranking')

const noQuery = inferSearchIntent('')
assert.deepEqual(noQuery, { intent: 'calculate', domain: null, journey: null })

console.log('Search intent/ranking checks passed.')
