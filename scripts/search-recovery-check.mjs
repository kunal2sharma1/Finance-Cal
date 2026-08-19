import assert from 'node:assert/strict'
import { calculators } from '../src/calculatorCatalog.js'
import { guides } from '../src/guides.js'
import { buildSearchVocabulary, getSearchTerms, recoverQuery } from '../src/searchRecovery.js'
import { searchSite } from '../src/searchCatalog.js'

const indexEntries = [
  ...calculators.map(({ config }) => ({
    searchText: [config.title, config.shortDescription, config.category, ...(config.keywords || [])].filter(Boolean).join(' '),
  })),
  ...guides.map((guide) => ({
    searchText: [guide.title, guide.intro, guide.topic, ...guide.sections.flat()].filter(Boolean).join(' '),
  })),
]

const vocabulary = buildSearchVocabulary(indexEntries)

const recovered = recoverQuery('mortage calculator', vocabulary)
assert.equal(recovered.query, 'mortgage calculator')
assert.equal(recovered.corrected, true)

const typoResults = searchSite('mortage calculator', { types: ['calculator'] })
assert.ok(typoResults.length > 0, 'typo recovery should return calculator results')

const synonymTerms = getSearchTerms('mortgage', vocabulary)
assert.ok(synonymTerms.includes('home loan'), 'mortgage should expand to home loan')
assert.ok(synonymTerms.includes('loan'), 'mortgage should expand to loan')

const synonymResults = searchSite('mortgage', { types: ['calculator'] })
assert.ok(synonymResults.length > 0, 'synonym expansion should return calculator results')

const typoSipResults = searchSite('mutal fund', { types: ['calculator'] })
assert.ok(typoSipResults.length > 0, 'generic typo recovery should handle a misspelled financial phrase')

console.log('Search synonym and typo-recovery checks passed.')
