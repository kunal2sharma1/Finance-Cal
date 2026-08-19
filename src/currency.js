const COUNTRY_CURRENCIES = Object.freeze({
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  AE: 'AED',
  SG: 'SGD',
  GLOBAL: 'USD',
})

export const DEFAULT_CURRENCY = 'INR'

export function getCountryCurrency(countryCode = 'IN') {
  return COUNTRY_CURRENCIES[countryCode] || DEFAULT_CURRENCY
}

export function hasCountryCurrency(countryCode) {
  return Object.prototype.hasOwnProperty.call(COUNTRY_CURRENCIES, countryCode)
}

export function getCountryCurrencies() {
  return { ...COUNTRY_CURRENCIES }
}
