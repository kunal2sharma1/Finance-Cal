export const INVALID_RESULT_VALUE = '—'

export function isValidResultValue(value) {
  if (value === null || value === undefined || value === '') return false
  if (typeof value === 'number') return Number.isFinite(value)
  return true
}

export function normalizeCalculatorResult(result) {
  if (result && typeof result === 'object' && !Array.isArray(result)) {
    const data = result.data && typeof result.data === 'object' && !Array.isArray(result.data)
      ? result.data
      : result

    const isValid = result.isValid !== false && result.isValid !== 0
    const message = typeof result.message === 'string' ? result.message : ''

    return {
      data,
      isValid,
      message,
    }
  }

  return {
    data: {},
    isValid: false,
    message: 'The calculator could not produce a valid result.',
  }
}

export function safeCalculate(calculate, values) {
  try {
    const rawResult = calculate(values)
    const normalized = normalizeCalculatorResult(rawResult)

    if (!normalized.isValid) return normalized

    const numericResultFields = Object.entries(normalized.data).filter(
      ([key]) => key !== 'message' && key !== 'isValid',
    )

    const hasInvalidNumericValue = numericResultFields.some(([, value]) => (
      typeof value === 'number' && !Number.isFinite(value)
    ))

    if (hasInvalidNumericValue) {
      return {
        data: normalized.data,
        isValid: false,
        message: 'The calculator could not produce a finite result for these inputs.',
      }
    }

    return normalized
  } catch (error) {
    console.error('Calculator calculation failed:', error)

    return {
      data: {},
      isValid: false,
      message: 'We could not calculate this result. Check your inputs and try again.',
    }
  }
}
