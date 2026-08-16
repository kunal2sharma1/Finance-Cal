import { calculators, calculatorCount } from '../src/calculatorCatalog.js'
import { phase3Calculators } from '../src/phase3Calculators.js'
import { countries, formatMoney, getInitialNumberSystem, getNumberFormatLocale } from '../src/country.js'

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function checkUniqueIds(items) {
  const seen = new Set()
  for (const { config } of items) {
    if (seen.has(config.id)) failures.push(`Duplicate calculator id: ${config.id}`)
    seen.add(config.id)
  }
}

console.log('FinCalc Product QA')
console.log(`Total calculators: ${calculatorCount}`)
console.log(`Phase 3 calculators: ${phase3Calculators.length}`)
console.log(`Countries: ${countries.length}`)

assert(calculators.length > 0, 'Calculator catalog is empty')
assert(calculatorCount === calculators.length, 'Calculator count export is stale')
assert(calculators.length >= 95, 'Expected at least 95 total calculators after Phase 3')
assert(phase3Calculators.length === 5, 'Expected five Phase 3 calculators')
checkUniqueIds(calculators)

for (const item of calculators) {
  const { config, calculate, explanation } = item
  assert(Boolean(config?.id), 'Calculator is missing id')
  assert(Boolean(config?.title), `Missing title: ${config?.id || 'unknown'}`)
  assert(Boolean(config?.shortDescription), `Missing shortDescription: ${config?.id}`)
  assert(typeof calculate === 'function', `Missing calculate function: ${config?.id}`)
  assert(typeof explanation === 'object' && explanation !== null, `Missing explanation: ${config?.id}`)
  assert(Array.isArray(config.fields) && config.fields.length > 0, `Missing input fields: ${config?.id}`)
  assert(Array.isArray(config.resultFields) && config.resultFields.length > 0, `Missing result fields: ${config?.id}`)
}

for (const id of ['savings-rate', 'real-return', 'bond-return', 'auto-loan', 'debt-to-income']) {
  assert(calculators.some(({ config }) => config.id === id), `Missing Phase 3 calculator: ${id}`)
}

for (const [code, currency] of [
  ['IN', 'INR'],
  ['US', 'USD'],
  ['GB', 'GBP'],
  ['CA', 'CAD'],
  ['AU', 'AUD'],
  ['AE', 'AED'],
  ['SG', 'SGD'],
]) {
  assert(countries.some((country) => country.code === code && country.currency === currency), `${code} country configuration missing`)
}

assert(getNumberFormatLocale('indian') === 'en-IN', 'Indian number system locale is incorrect')
assert(getNumberFormatLocale('international') === 'en-US', 'International number system locale is incorrect')
assert(getInitialNumberSystem() === 'indian', 'Server-side default number system should be Indian')

const indianFormatted = formatMoney(12345678, 'IN', 'indian')
const internationalFormatted = formatMoney(12345678, 'US', 'international')
assert(indianFormatted.includes('1,23,45,678'), `Unexpected Indian formatting: ${indianFormatted}`)
assert(internationalFormatted.includes('12,345,678'), `Unexpected international formatting: ${internationalFormatted}`)

for (const id of [
  '401k', 'roth-ira', 'hsa', 'uk-isa', 'uk-pension', 'uk-lifetime-isa',
  'canada-tfsa', 'canada-rrsp', 'canada-fhsa', 'singapore-cpf',
  'australia-super', 'australia-concessional-super', 'uae-end-of-service',
  'us-mortgage', 'uk-mortgage', 'canada-mortgage', 'australia-mortgage',
]) {
  assert(calculators.some(({ config }) => config.id === id), `Missing required international calculator: ${id}`)
}

if (failures.length) {
  console.error('\nProduct QA failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Product QA passed.')
