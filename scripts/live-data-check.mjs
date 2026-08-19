import { calculate } from '../src/calculators/currency-exchange/formula.js'

const originalFetch = globalThis.fetch
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function makeResponse(payload, ok = true, status = 200) {
  return {
    ok,
    status,
    async json() {
      return payload
    },
  }
}

try {
  // Validation must fail before any network request.
  let fetchCalls = 0
  globalThis.fetch = async () => {
    fetchCalls += 1
    throw new Error('network should not be called for invalid input')
  }

  const invalidAmount = await calculate({ amount: -1, fromCurrency: 'INR', toCurrency: 'USD' })
  assert(invalidAmount.isValid === false, 'negative amount should be invalid')
  assert(fetchCalls === 0, 'invalid amount should not trigger a network request')

  // Same-currency conversion must remain deterministic and network-free.
  const sameCurrency = await calculate({ amount: 12500, fromCurrency: 'USD', toCurrency: 'USD' })
  assert(sameCurrency.isValid === true, 'same-currency conversion should be valid')
  assert(sameCurrency.convertedAmount === 12500, 'same-currency conversion should preserve amount')
  assert(sameCurrency.exchangeRate === 1, 'same-currency conversion should use a rate of 1')
  assert(sameCurrency.sourceDate === 'Same currency', 'same-currency conversion should identify its source date')

  // Successful live-rate response.
  globalThis.fetch = async () => makeResponse({ rate: 0.011, date: '2026-08-17' })
  const success = await calculate({ amount: 10000, fromCurrency: 'INR', toCurrency: 'USD' })
  assert(success.isValid === true, 'successful live-rate response should be valid')
  assert(success.convertedAmount === 110, 'converted amount should use the returned rate')
  assert(success.exchangeRate === 0.011, 'returned exchange rate should be exposed')
  assert(success.sourceDate === '2026-08-17', 'source date should be preserved')

  // Cached response: changing the network implementation must not change a still-valid cached rate.
  globalThis.fetch = async () => {
    throw new Error('cache test network failure')
  }
  const cached = await calculate({ amount: 20000, fromCurrency: 'INR', toCurrency: 'USD' })
  assert(cached.isValid === true, 'cached rate should remain usable when the network subsequently fails')
  assert(cached.convertedAmount === 220, 'cached rate should produce the same conversion')

  // HTTP failure must return a safe invalid result rather than throwing.
  globalThis.fetch = async () => makeResponse({}, false, 503)
  const httpFailure = await calculate({ amount: 5000, fromCurrency: 'EUR', toCurrency: 'USD' })
  assert(httpFailure.isValid === false, 'HTTP failure should return an invalid result')
  assert(typeof httpFailure.message === 'string' && httpFailure.message.length > 0, 'HTTP failure should include a user-facing message')
  assert(Number.isFinite(httpFailure.convertedAmount), 'HTTP failure converted amount should remain finite')
  assert(Number.isFinite(httpFailure.exchangeRate), 'HTTP failure exchange rate should remain finite')

  // Malformed API payload must be rejected safely.
  globalThis.fetch = async () => makeResponse({ rate: 'not-a-number', date: '2026-08-17' })
  const malformed = await calculate({ amount: 7500, fromCurrency: 'GBP', toCurrency: 'USD' })
  assert(malformed.isValid === false, 'malformed live-rate payload should be invalid')
  assert(typeof malformed.message === 'string' && malformed.message.length > 0, 'malformed payload should include a user-facing message')

  // Empty/invalid currency codes must not hit the API.
  fetchCalls = 0
  globalThis.fetch = async () => {
    fetchCalls += 1
    throw new Error('invalid currency request should never reach network')
  }
  const invalidCurrency = await calculate({ amount: 100, fromCurrency: 'india', toCurrency: 'USD' })
  assert(invalidCurrency.isValid === false, 'invalid currency code should be rejected')
  assert(fetchCalls === 0, 'invalid currency code should not trigger a network request')
} catch (error) {
  failures.push(`live-data test runner threw unexpectedly: ${error.message}`)
} finally {
  globalThis.fetch = originalFetch
}

if (failures.length > 0) {
  console.error(`Live-data resilience validation failed with ${failures.length} issue(s):`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Live-data resilience validation passed: currency-exchange validation, deterministic same-currency path, live success, cache fallback, HTTP failure and malformed payload scenarios.')
