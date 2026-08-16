const INDIA_ONLY_CALCULATORS = new Set([
  'ppf',
  'epf',
  'nps',
  'nps-vs-epf',
  'income-tax',
  'ctc-to-in-hand',
  'gratuity',
  'notice-period-salary',
])

export function getCalculatorCurrency(config, country) {
  if (config.currency) return config.currency
  if (INDIA_ONLY_CALCULATORS.has(config.id)) return 'INR'
  return country?.currency || 'INR'
}

export function isCountrySpecific(config) {
  if (config.countries) return config.countries.length > 0
  return INDIA_ONLY_CALCULATORS.has(config.id)
}

export function getCalculatorCountries(config) {
  if (Array.isArray(config.countries) && config.countries.length > 0) {
    return config.countries
  }

  return INDIA_ONLY_CALCULATORS.has(config.id) ? ['IN'] : null
}
