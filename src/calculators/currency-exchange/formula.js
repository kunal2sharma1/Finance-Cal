const API_BASE = 'https://api.frankfurter.dev/v2'
const cache = new Map()
const CACHE_TTL_MS = 10 * 60 * 1000

export async function calculate(inputs) {
  const amount = Number(inputs.amount)
  const fromCurrency = String(inputs.fromCurrency || 'INR').toUpperCase()
  const toCurrency = String(inputs.toCurrency || 'USD').toUpperCase()

  if (!Number.isFinite(amount) || amount < 0) {
    return { convertedAmount: 0, exchangeRate: 0, sourceDate: '', isValid: false, message: 'Please enter a valid amount.' }
  }

  if (!/^[A-Z]{3}$/.test(fromCurrency) || !/^[A-Z]{3}$/.test(toCurrency)) {
    return { convertedAmount: 0, exchangeRate: 0, sourceDate: '', isValid: false, message: 'Please choose valid currencies.' }
  }

  if (fromCurrency === toCurrency) {
    return {
      convertedAmount: amount,
      exchangeRate: 1,
      sourceDate: 'Same currency',
      sourceCurrency: fromCurrency,
      targetCurrency: toCurrency,
      isValid: true,
      message: null,
    }
  }

  const key = `${fromCurrency}-${toCurrency}`
  const cached = cache.get(key)
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return buildResult(amount, fromCurrency, toCurrency, cached)
  }

  try {
    const response = await fetch(`${API_BASE}/rate/${fromCurrency}/${toCurrency}`)
    if (!response.ok) throw new Error(`Exchange-rate request failed: ${response.status}`)

    const data = await response.json()
    const rate = Number(data.rate)

    if (!Number.isFinite(rate) || rate <= 0) throw new Error('Invalid exchange-rate response.')

    const fresh = { rate, date: data.date || 'Latest available rate', fetchedAt: Date.now() }
    cache.set(key, fresh)
    return buildResult(amount, fromCurrency, toCurrency, fresh)
  } catch {
    return {
      convertedAmount: 0,
      exchangeRate: 0,
      sourceDate: '',
      sourceCurrency: fromCurrency,
      targetCurrency: toCurrency,
      isValid: false,
      message: 'Live exchange rates could not be loaded. Please try again in a moment.',
    }
  }
}

function buildResult(amount, fromCurrency, toCurrency, rateData) {
  return {
    convertedAmount: amount * rateData.rate,
    exchangeRate: rateData.rate,
    sourceDate: rateData.date,
    sourceCurrency: fromCurrency,
    targetCurrency: toCurrency,
    isValid: true,
    message: null,
  }
}
