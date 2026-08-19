import { getCountryCurrency } from './currency.js'
import { getNumberFormatLocale } from './numberSystem.js'

export function formatMoney(value, countryCode = 'IN', numberSystem = 'indian') {
  const currency = getCountryCurrency(countryCode)
  if (!Number.isFinite(Number(value))) return '—'

  try {
    return new Intl.NumberFormat(getNumberFormatLocale(numberSystem), {
      style: 'currency',
      currency,
      maximumFractionDigits: ['JPY', 'KRW'].includes(currency) ? 0 : 2,
    }).format(Number(value))
  } catch {
    return `${currency} ${Number(value).toLocaleString(getNumberFormatLocale(numberSystem))}`
  }
}
