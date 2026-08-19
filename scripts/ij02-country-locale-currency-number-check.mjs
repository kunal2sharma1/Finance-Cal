import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

const countrySource = await readFile('src/country.js', 'utf8')
const localeSource = await readFile('src/locale.js', 'utf8')
const currencySource = await readFile('src/currency.js', 'utf8')
const numberSystemSource = await readFile('src/numberSystem.js', 'utf8')
const moneyFormatSource = await readFile('src/moneyFormat.js', 'utf8')
const calculatorLocaleSource = await readFile('src/calculatorLocale.js', 'utf8')
const resultPanelSource = await readFile('src/components/ResultPanel.jsx', 'utf8')
const countrySelectorSource = await readFile('src/components/CountrySelector.jsx', 'utf8')

const countryCodes = ['IN', 'US', 'GB', 'CA', 'AU', 'AE', 'SG', 'GLOBAL']

for (const code of countryCodes) {
  assert(countrySource.includes(`{ code: '${code}'`), `Country catalog is missing ${code}.`)
  assert(localeSource.includes(`${code}:`), `Locale ownership is missing ${code}.`)
  assert(currencySource.includes(`${code}:`), `Currency ownership is missing ${code}.`)
}

assert(!/code: 'IN', name: 'India', flag: '🇮🇳', currency:/.test(countrySource), 'Country record still owns currency metadata.')
assert(!/code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', locale:/.test(countrySource), 'Country record still owns locale metadata.')
assert(!countrySource.includes('fincalc-number-system'), 'Country module still owns number-system storage.')
assert(countrySource.includes('countryMap.get(code) || countryMap.get(DEFAULT_COUNTRY)'), 'Existing country fallback behavior was not preserved.')
assert(localeSource.includes('export function getCountryLocale'), 'Locale module does not expose canonical locale ownership.')
assert(currencySource.includes('export function getCountryCurrency'), 'Currency module does not expose canonical currency ownership.')
assert(numberSystemSource.includes('export const NUMBER_SYSTEMS'), 'Number-system module does not define its own presentation vocabulary.')
assert(numberSystemSource.includes('export function getNumberFormatLocale'), 'Number-system module does not own number-format locale resolution.')
assert(moneyFormatSource.includes("import { getCountryCurrency } from './currency.js'"), 'Money formatting does not use the currency module.')
assert(moneyFormatSource.includes("import { getNumberFormatLocale } from './numberSystem.js'"), 'Money formatting does not use the number-system module.')
assert(!calculatorLocaleSource.includes('country?.currency'), 'Calculator currency still reads currency from the country object.')
assert(calculatorLocaleSource.includes("import { getCountryCurrency } from './currency.js'"), 'Calculator currency ownership is not routed through the currency module.')
assert(resultPanelSource.includes("import { getNumberFormatLocale } from '../numberSystem.js'"), 'Result formatting still owns a duplicate number-system locale mapping.')
assert(countrySelectorSource.includes("import { getCountryCurrency } from '../currency.js'"), 'Country selector still reads currency from country metadata.')
assert(countrySelectorSource.includes("import { getInitialNumberSystem, saveNumberSystem } from '../numberSystem.js'"), 'Country selector still owns number-system state integration.')
assert(numberSystemSource.includes("countryCode === 'IN' ? DEFAULT_NUMBER_SYSTEM : 'international'"), 'Country-derived number-system default is not explicit presentation behavior.')
assert(!countrySource.includes('jurisdictionId'), 'IJ-02 must not create a competing jurisdiction registry in country.js.')

const baseSha = '6b39020a85cf24626e560a2ed9c0a6c8432c5583'
let changedFiles = []
try {
  changedFiles = execFileSync('git', ['diff', '--name-only', `${baseSha}...HEAD`], { encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
} catch (error) {
  failures.push(`Unable to inspect git diff from IJ-02 starting SHA ${baseSha}: ${error.message}`)
}

for (const path of changedFiles) {
  if (/^src\/calculators\/.+\/(formula|config|explanation)\.js$/.test(path)) {
    failures.push(`Calculator implementation changed during IJ-02: ${path}`)
  }
  if (path === 'src/internationalCalculators.js') {
    failures.push('International calculator registry changed during IJ-02.')
  }
}

if (failures.length) {
  console.error('IJ-02 country/locale/currency/number separation validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`IJ-02 country/locale/currency/number separation validation passed; ${changedFiles.length} files changed from ${baseSha} with no calculator implementation changes.`)
