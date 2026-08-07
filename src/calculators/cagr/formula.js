// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

// Percentages are rounded to 2 decimal places rather than whole numbers.
// A whole-percent CAGR (e.g. "15%" instead of "14.87%") hides exactly the
// kind of difference that matters most when a rate gets compounded over
// many years, so it gets its own rounding step instead of reusing the
// whole-currency-unit rounding used for rupee amounts below.
function roundTo2(value) {
  return Math.round(value * 100) / 100
}

export function calculate(inputs) {
  const initialInvestment = Number(inputs.initialInvestment) || 0
  const finalValue = Number(inputs.finalValue) || 0
  const years = Number(inputs.years) || 0

  // Validate before doing any division or exponentiation, so the formula
  // below never has to handle a bad value itself. Every case that can lead
  // to NaN or Infinity is ruled out here first:
  //  - dividing by an initial investment of zero (or less)
  //  - raising a number to the power of 1 / 0 (or a negative period)
  //  - a negative final value, which would make the base of the power
  //    negative and turn a fractional exponent into NaN
  let message = null
  if (
    !Number.isFinite(initialInvestment) ||
    !Number.isFinite(finalValue) ||
    !Number.isFinite(years)
  ) {
    message = 'Please enter valid numbers for all fields.'
  } else if (initialInvestment <= 0) {
    message = 'Initial investment must be greater than zero.'
  } else if (years <= 0) {
    message = 'Investment period must be greater than zero.'
  } else if (finalValue < 0) {
    message = 'Final investment value cannot be negative.'
  }

  if (message) {
    // Safe, zeroed shape — same keys the valid branch returns, so the UI
    // never has to special-case a missing field.
    return {
      cagr: 0,
      absoluteGain: 0,
      totalGrowthPercentage: 0,
      isValid: false,
      message,
    }
  }

  // Standard CAGR formula:
  // CAGR = (Final Value / Initial Value)^(1 / Years) − 1
  //
  // Note: a final value lower than the initial one is NOT treated as an
  // invalid input above — it's a legitimate decline, and the formula
  // handles it correctly on its own (finalValue / initialInvestment is
  // still a non-negative number, so the fractional power below resolves
  // to a real number, just less than 1, giving a negative CAGR).
  const growthRatio = finalValue / initialInvestment
  const cagrRatio = Math.pow(growthRatio, 1 / years) - 1

  const absoluteGain = finalValue - initialInvestment
  const totalGrowthPercentage = (absoluteGain / initialInvestment) * 100

  return {
    cagr: roundTo2(cagrRatio * 100),
    absoluteGain: Math.round(absoluteGain),
    totalGrowthPercentage: roundTo2(totalGrowthPercentage),
    isValid: true,
    message: null,
  }
}