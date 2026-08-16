import { internationalCalculators } from '../src/internationalCalculators.js'
import { countries } from '../src/country.js'
import { getInternationalSEO } from '../src/internationalSeo.js'

const supported = new Set(countries.map((country) => country.code))
const errors = []
const ids = new Set()
const expectedCountryCalculators = {
  US: ['401k', 'roth-ira'],
  GB: ['uk-isa', 'uk-pension'],
  CA: ['canada-tfsa', 'canada-rrsp'],
  AU: ['australia-super'],
  AE: ['uae-end-of-service'],
  SG: ['singapore-cpf'],
}

for (const { config } of internationalCalculators) {
  if (ids.has(config.id)) errors.push(`Duplicate international calculator ID: ${config.id}`)
  ids.add(config.id)

  if (!Array.isArray(config.countries) || config.countries.length === 0) {
    errors.push(`Missing country mapping: ${config.id}`)
  } else {
    for (const code of config.countries) {
      if (!supported.has(code)) errors.push(`Unknown country code ${code} for ${config.id}`)
    }
  }

  const seo = getInternationalSEO(config.id)
  if (!seo?.title || !seo?.description) errors.push(`Missing international SEO metadata: ${config.id}`)

  if (!Array.isArray(config.fields) || !config.fields.length) errors.push(`Missing fields: ${config.id}`)
  if (!Array.isArray(config.resultFields) || !config.resultFields.length) errors.push(`Missing result fields: ${config.id}`)
}

for (const [countryCode, requiredIds] of Object.entries(expectedCountryCalculators)) {
  for (const id of requiredIds) {
    const calculator = internationalCalculators.find(({ config }) => config.id === id)
    if (!calculator) {
      errors.push(`Missing expected ${countryCode} calculator: ${id}`)
    } else if (!calculator.config.countries.includes(countryCode)) {
      errors.push(`${id} is not mapped to ${countryCode}`)
    }
  }
}

if (errors.length) {
  console.error('International validation failed:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`International validation passed for ${internationalCalculators.length} localized calculators across ${Object.keys(expectedCountryCalculators).length} countries.`)
