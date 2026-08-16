export const DEFAULT_COUNTRY = 'IN'
export const COUNTRY_STORAGE_KEY = 'fincalc-country'
export const NUMBER_SYSTEM_STORAGE_KEY = 'fincalc-number-system'

export const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', locale: 'en-IN' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', locale: 'en-US' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', locale: 'en-GB' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', locale: 'en-CA' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', locale: 'en-AU' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', locale: 'en-AE' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', locale: 'en-SG' },
  { code: 'GLOBAL', name: 'Global / Other', flag: '🌎', currency: 'USD', locale: 'en-US' },
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

export function getInitialNumberSystem() {
  if (typeof window === 'undefined') return 'indian'

  const stored = window.localStorage.getItem(NUMBER_SYSTEM_STORAGE_KEY)
  if (stored === 'indian' || stored === 'international') return stored

  const country = getCountry(getInitialCountry())
  return country.code === 'IN' ? 'indian' : 'international'
}

export function saveCountry(code) {
  const country = getCountry(code)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, country.code)
    if (country.code === 'IN' && !window.localStorage.getItem(NUMBER_SYSTEM_STORAGE_KEY)) {
      window.localStorage.setItem(NUMBER_SYSTEM_STORAGE_KEY, 'indian')
    }
    window.dispatchEvent(new CustomEvent('fincalc-country-change', { detail: country.code }))
  }
  return country.code
}

export function saveNumberSystem(system) {
  const next = system === 'international' ? 'international' : 'indian'
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(NUMBER_SYSTEM_STORAGE_KEY, next)
    window.dispatchEvent(new CustomEvent('fincalc-number-system-change', { detail: next }))
  }
  return next
}

export function getCountryCurrency(code) {
  return getCountry(code).currency
}

export function getNumberFormatLocale(numberSystem = 'indian') {
  return numberSystem === 'international' ? 'en-US' : 'en-IN'
}

export function formatMoney(value, code = DEFAULT_COUNTRY, numberSystem = 'indian') {
  const country = getCountry(code)
  if (!Number.isFinite(Number(value))) return '—'

  try {
    return new Intl.NumberFormat(getNumberFormatLocale(numberSystem), {
      style: 'currency',
      currency: country.currency,
      maximumFractionDigits: ['JPY', 'KRW'].includes(country.currency) ? 0 : 2,
    }).format(Number(value))
  } catch {
    return `${country.currency} ${Number(value).toLocaleString(getNumberFormatLocale(numberSystem))}`
  }
}
