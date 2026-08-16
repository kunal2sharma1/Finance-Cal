import { readFile } from 'node:fs/promises'

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

const analytics = await readFile('src/analytics.js', 'utf8')
const app = await readFile('src/App.jsx', 'utf8')
const calculator = await readFile('src/pages/CalculatorView.jsx', 'utf8')
const search = await readFile('src/components/SiteSearch.jsx', 'utf8')
const country = await readFile('src/components/CountrySelector.jsx', 'utf8')
const privacy = await readFile('src/pages/InfoPage.jsx', 'utf8')

assert(analytics.includes('export function trackEvent'), 'Analytics tracker is missing')
assert(analytics.includes('VITE_ANALYTICS_ENDPOINT'), 'Analytics endpoint configuration is missing')
assert(analytics.includes('fincalc-analytics-v1'), 'Local analytics storage key is missing')
assert(!analytics.includes('inputValue'), 'Analytics must not include raw inputValue fields')
assert(!analytics.includes('financialAmount'), 'Analytics must not include raw financialAmount fields')
assert(app.includes("trackEvent('page_view'"), 'Page-view instrumentation is missing')
assert(calculator.includes("trackEvent('calculator_open'"), 'Calculator-open instrumentation is missing')
assert(calculator.includes("trackEvent('calculator_complete'"), 'Calculator-completion instrumentation is missing')
assert(search.includes("trackEvent('site_search'"), 'Search instrumentation is missing')
assert(search.includes("trackEvent('search_result_click'"), 'Search-result instrumentation is missing')
assert(country.includes("trackEvent('country_change'"), 'Country-change instrumentation is missing')
assert(country.includes("trackEvent('number_system_change'"), 'Number-format instrumentation is missing')
assert(privacy.includes('privacy-conscious product analytics'), 'Privacy page does not document analytics')

if (failures.length) {
  console.error('Analytics validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Analytics instrumentation validation passed.')
