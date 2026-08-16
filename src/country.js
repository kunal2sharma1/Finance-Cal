export const DEFAULT_COUNTRY = 'IN'
export const COUNTRY_STORAGE_KEY = 'fincalc-country'

export const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', locale: 'en-IN' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', locale: 'en-US' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', locale: 'en-GB' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', locale: 'en-CA' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', locale: 'en-AU' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', locale: 'en-AE' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', locale: 'en-SG' },
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

export function getCountryCurrency(code) {
  return getCountry(code).currency
}

export function formatMoney(value, code = DEFAULT_COUNTRY) {
  const country = getCountry(code)
  if (!Number.isFinite(Number(value))) return '—'

  try {
    return new Intl.NumberFormat(country.locale, {
      style: 'currency',
      currency: country.currency,
      maximumFractionDigits: country.currency === 'JPY' ? 0 : 2,
    }).format(Number(value))
  } catch {
    return `${country.currency} ${Number(value).toLocaleString(country.locale)}`
  }
}
