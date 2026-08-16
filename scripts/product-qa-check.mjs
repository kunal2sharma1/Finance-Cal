import { calculators as coreCalculators } from '../src/calculators/registry.js'
import { internationalCalculators } from '../src/internationalCalculators.js'
import { countries, formatMoney, getInitialNumberSystem, getNumberFormatLocale } from '../src/country.js'

const allCalculators = [...coreCalculators, ...internationalCalculators]
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
console.log(`Core calculators: ${coreCalculators.length}`)
console.log(`International calculators: ${internationalCalculators.length}`)
console.log(`Total calculators: ${allCalculators.length}`)
console.log(`Countries: ${countries.length}`)

// Registry integrity.
assert(coreCalculators.length > 0, 'Core calculator registry is empty')
assert(internationalCalculators.length >= 17, 'Expected at least 17 international calculators')
assert(allCalculators.length >= 90, 'Expected at least 90 total calculators')
checkUniqueIds(allCalculators)

for (const item of allCalculators) {
  const { config, calculate, explanation } = item
  assert(Boolean(config?.id), 'Calculator is missing id')
  assert(Boolean(config?.title), `Missing title: ${config?.id || 'unknown'}`)
  assert(Boolean(config?.shortDescription), `Missing shortDescription: ${config?.id}`)
  assert(typeof calculate === 'function', `Missing calculate function: ${config?.id}`)
  assert(typeof explanation === 'object' && explanation !== null, `Missing explanation: ${config?.id}`)
  assert(Array.isArray(config.fields) && config.fields.length > 0, `Missing input fields: ${config?.id}`)
  assert(Array.isArray(config.resultFields) && config.resultFields.length > 0, `Missing result fields: ${config?.id}`)
}

// International calculator metadata integrity.
const expectedCountryCodes = new Set(['US', 'GB', 'CA', 'AU', 'AE', 'SG'])
for (const { config } of internationalCalculators) {
  assert(Array.isArray(config.countries) && config.countries.length > 0, `Missing country metadata: ${config.id}`)
  for (const code of config.countries || []) {
    assert(expectedCountryCodes.has(code), `Unknown international country code ${code} on ${config.id}`)
  }
}

// Country and numbering-system sanity checks.
assert(countries.some((country) => country.code === 'IN' && country.currency === 'INR'), 'India country configuration missing')
assert(countries.some((country) => country.code === 'US' && country.currency === 'USD'), 'US country configuration missing')
assert(countries.some((country) => country.code === 'GB' && country.currency === 'GBP'), 'UK country configuration missing')
assert(countries.some((country) => country.code === 'CA' && country.currency === 'CAD'), 'Canada country configuration missing')
assert(countries.some((country) => country.code === 'AU' && country.currency === 'AUD'), 'Australia country configuration missing')
assert(countries.some((country) => country.code === 'AE' && country.currency === 'AED'), 'UAE country configuration missing')
assert(countries.some((country) => country.code === 'SG' && country.currency === 'SGD'), 'Singapore country configuration missing')
assert(getNumberFormatLocale('indian') === 'en-IN', 'Indian number system locale is incorrect')
assert(getNumberFormatLocale('international') === 'en-US', 'International number system locale is incorrect')
assert(getInitialNumberSystem() === 'indian', 'Server-side default number system should be Indian')

const indianFormatted = formatMoney(12345678, 'IN', 'indian')
const internationalFormatted = formatMoney(12345678, 'US', 'international')
assert(indianFormatted.includes('1,23,45,678'), `Unexpected Indian formatting: ${indianFormatted}`)
assert(internationalFormatted.includes('12,345,678'), `Unexpected international formatting: ${internationalFormatted}`)

// Check representative country-specific calculator ids.
for (const id of ['401k', 'roth-ira', 'hsa', 'uk-isa', 'uk-pension', 'uk-lifetime-isa', 'canada-tfsa', 'canada-rrsp', 'canada-fhsa', 'singapore-cpf', 'australia-super', 'australia-concessional-super', 'uae-end-of-service', 'us-mortgage', 'uk-mortgage', 'canada-mortgage', 'australia-mortgage']) {
  assert(allCalculators.some(({ config }) => config.id === id), `Missing required international calculator: ${id}`)
}

if (failures.length) {
  console.error('\nProduct QA failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Product QA passed.')
