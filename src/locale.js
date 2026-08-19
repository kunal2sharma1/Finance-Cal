const COUNTRY_LOCALES = Object.freeze({
  IN: 'en-IN',
  US: 'en-US',
  GB: 'en-GB',
  CA: 'en-CA',
  AU: 'en-AU',
  AE: 'en-AE',
  SG: 'en-SG',
  GLOBAL: 'en-US',
})

export const DEFAULT_LOCALE = 'en-IN'

export function getCountryLocale(countryCode = 'IN') {
  return COUNTRY_LOCALES[countryCode] || DEFAULT_LOCALE
}

export function hasCountryLocale(countryCode) {
  return Object.prototype.hasOwnProperty.call(COUNTRY_LOCALES, countryCode)
}

export function getCountryLocales() {
  return { ...COUNTRY_LOCALES }
}
