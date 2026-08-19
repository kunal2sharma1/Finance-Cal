export const DEFAULT_COUNTRY = 'IN'
export const COUNTRY_STORAGE_KEY = 'fincalc-country'

export const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'GLOBAL', name: 'Global / Other', flag: '🌎' },
]

const countryMap = new Map(countries.map((country) => [country.code, country]))

export function getCountry(code) {
  return countryMap.get(code) || countryMap.get(DEFAULT_COUNTRY)
}

export function getInitialCountry() {
  if (typeof window === 'undefined') return DEFAULT_COUNTRY

  const stored = window.localStorage.getItem(COUNTRY_STORAGE_KEY)
  if (stored && countryMap.has(stored)) return stored

  const browserLocale = window.navigator.language || ''
  const region = browserLocale.includes('-') ? browserLocale.split('-').pop().toUpperCase() : ''
  if (region && countryMap.has(region)) return region

  return DEFAULT_COUNTRY
}

export function saveCountry(code) {
  const country = getCountry(code)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, country.code)
    window.dispatchEvent(new CustomEvent('fincalc-country-change', { detail: country.code }))
  }
  return country.code
}

// Compatibility accessors. Ownership remains in dedicated presentation modules.
export { getCountryCurrency } from './currency.js'
export { getCountryLocale } from './locale.js'
export { getNumberFormatLocale, getInitialNumberSystem, saveNumberSystem } from './numberSystem.js'
export { formatMoney } from './moneyFormat.js'
