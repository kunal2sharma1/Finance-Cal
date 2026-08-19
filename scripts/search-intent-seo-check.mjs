import { calculators } from '../src/calculatorCatalog.js'
import { seoIntentContent } from '../src/seoIntentContent.js'
import { buildCalculatorSEO } from '../src/seo.js'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

for (const calculator of calculators) {
  const id = calculator.config.id
  const content = seoIntentContent[id]
  if (!content) continue

  const seo = buildCalculatorSEO(calculator.config, calculator.meta)
  const intent = seo.searchIntent

  assert(intent, `Search-intent SEO metadata missing from buildCalculatorSEO: ${id}`)
  assert(intent?.primaryIntent === calculator.meta?.intent, `Primary intent mismatch for ${id}`)
  assert(intent?.domain === calculator.meta?.domain, `Search domain mismatch for ${id}`)
  assert(intent?.primaryJourney === calculator.meta?.primaryJourney, `Primary journey mismatch for ${id}`)
  assert(intent?.intentLabel === content.intentLabel, `Intent label mismatch for ${id}`)
  assert(intent?.bestFor === content.bestFor, `Best-for framing mismatch for ${id}`)
  assert(Array.isArray(intent?.questions) && intent.questions.length >= 3, `Search-intent questions missing for ${id}`)
}

const priority = ['sip','ppf','fd','emi','home-loan','loan-prepayment','xirr','nps','retirement','emergency-fund','savings-goal','compound-interest','net-worth','salary-take-home','real-return','bond-return','auto-loan','sip-vs-lumpsum']
for (const id of priority) {
  const calculator = calculators.find(({ config }) => config.id === id)
  assert(Boolean(calculator), `Priority calculator missing from catalog: ${id}`)
  assert(Boolean(seoIntentContent[id]), `Priority calculator missing search-intent content: ${id}`)
  if (calculator && seoIntentContent[id]) {
    const seo = buildCalculatorSEO(calculator.config, calculator.meta)
    assert(seo.searchIntent?.primaryIntent === calculator.meta?.intent, `Priority intent not connected to SEO: ${id}`)
  }
}

if (failures.length) {
  console.error('Search-intent SEO integration validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Search-intent SEO integration passed for ${Object.keys(seoIntentContent).length} calculators.`)
