import { readFile } from 'node:fs/promises'

const countryPagesSource = await readFile('src/countryPages.js', 'utf8')
const countryPageSource = await readFile('src/pages/CountryPage.jsx', 'utf8')

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

assert(countryPagesSource.includes('seoSections'), 'Country SEO content registry is missing.')
assert(countryPagesSource.match(/seoSections:/g)?.length >= 7, 'Every supported country needs SEO sections.')
assert(countryPageSource.includes('page.seoSections'), 'Country page does not render localized SEO content.')
assert(countryPageSource.includes('country-guidance'), 'Country guidance heading is missing.')
assert(countryPageSource.includes('country-page__guidance-grid'), 'Country guidance layout is missing.')

const countries = ['IN', 'US', 'GB', 'CA', 'AU', 'AE', 'SG']
for (const code of countries) {
  assert(countryPagesSource.includes(`${code}: {`), `Missing country SEO configuration: ${code}`)
}

if (failures.length) {
  console.error('Country SEO validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Country SEO validation passed for India, US, UK, Canada, Australia, UAE and Singapore.')
