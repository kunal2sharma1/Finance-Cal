import assert from 'node:assert/strict'
import { inferSearchIntent } from '../src/searchIntent.js'
import { searchSite } from '../src/searchCatalog.js'

const homeBuyingIntent = inferSearchIntent('how should i handle my home buying decision')
assert.equal(homeBuyingIntent.intent, 'plan', 'home-buying decision should be treated as a planning query')
assert.equal(homeBuyingIntent.domain, 'borrowing', 'home-buying decision should map to borrowing')
assert.equal(homeBuyingIntent.journey, 'home-and-borrowing', 'home-buying decision should map to the borrowing journey')

const recovery = searchSite('how should i handle my home buying decision', { types: ['calculator'] })
assert.ok(recovery.length > 0, 'recognized journey queries should recover recommendations when exact search is empty')
assert.ok(recovery.every((result) => result.recovery === 'zero-result'), 'recovered results must be explicitly marked')

const financeRecovery = searchSite('what should i do with my retirement decision', { types: ['calculator'] })
assert.ok(financeRecovery.length > 0, 'recognized retirement queries should recover recommendations')
assert.ok(financeRecovery.every((result) => result.recovery === 'zero-result'), 'retirement recovery must be explicitly marked')

const guideOnly = searchSite('how should i handle my home buying decision', { types: ['guide'] })
assert.ok(guideOnly.every((result) => result.type === 'guide'), 'type filtering must hold during zero-result recovery')

const nonsense = searchSite('zzzxqvplm unknown finance phrase', { types: ['calculator'] })
assert.deepEqual(nonsense, [], 'unrecognized queries must remain empty rather than surfacing arbitrary results')

console.log('Zero-result recovery validation passed.')
