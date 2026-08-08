// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

// Percentages are rounded to 2 decimal places rather than whole numbers,
// matching the CAGR calculator's convention — see cagr/formula.js.
function roundTo2(value) {
  return Math.round(value * 100) / 100
}

// Safe zeroed shape, same keys the valid branch returns, so the UI never
// has to special-case a missing field. Mirrors the CAGR calculator's
// isValid/message pattern.
function invalidResult(message) {
  return {
    futureCost: 0,
    totalIncrease: 0,
    percentageIncrease: 0,
    presentValue: 0,
    purchasingPowerLost: 0,
    percentageReduction: 0,
    isValid: false,
    message,
  }
}

export function calculate(inputs) {
  const currentAmount = Number(inputs.currentAmount)
  const futureAmount = Number(inputs.futureAmount)
  const inflationRate = Number(inputs.inflationRate)
  const years = Number(inputs.years)

  // Validate before doing any division or exponentiation, so the formula
  // below never has to handle a bad value itself. Every case that can lead
  // to NaN, Infinity, or a negative result is ruled out here first.
  if (
    !Number.isFinite(currentAmount) ||
    !Number.isFinite(futureAmount) ||
    !Number.isFinite(inflationRate) ||
    !Number.isFinite(years)
  ) {
    return invalidResult('Please enter valid numbers for all fields.')
  }
  if (currentAmount < 0 || futureAmount < 0) {
    return invalidResult('Amounts cannot be negative.')
  }
  if (inflationRate < 0) {
    return invalidResult('Inflation rate cannot be negative.')
  }
  if (years < 0) {
    return invalidResult('Number of years cannot be negative.')
  }

  const rate = inflationRate / 100

  // Shared growth factor for both directions:
  // (1 + rate) ^ years
  //
  // rate >= 0 and years >= 0 are both guaranteed by the checks above, so
  // (1 + rate) is always >= 1 and growthFactor is always a finite number
  // >= 1 — it can never be 0 or negative, which is what makes dividing by
  // it below (for the present-value direction) always safe.
  const growthFactor = Math.pow(1 + rate, years)

  // MODE 1 — FUTURE VALUE
  // "What will today's money be worth in the future?"
  // Future Amount = Current Amount × (1 + inflation rate)^years
  const futureCostRaw = currentAmount * growthFactor
  const totalIncreaseRaw = futureCostRaw - currentAmount
  // Guarded against a ₹0 current amount, which would otherwise make this
  // a 0/0 division.
  const percentageIncreaseRaw =
    currentAmount > 0 ? (totalIncreaseRaw / currentAmount) * 100 : 0

  // MODE 2 — PRESENT VALUE
  // "How much would a future amount be worth in today's money?"
  // Present Value = Future Amount / (1 + inflation rate)^years
  const presentValueRaw = futureAmount / growthFactor
  const purchasingPowerLostRaw = futureAmount - presentValueRaw
  // Guarded against a ₹0 future amount, for the same reason as above.
  const percentageReductionRaw =
    futureAmount > 0 ? (purchasingPowerLostRaw / futureAmount) * 100 : 0

  // Defensive floor: growthFactor is already guaranteed finite for any
  // value the slider can reach, but a result that reaches the UI should
  // never rely on that alone if someone types an extreme value directly
  // into a number field.
  if (!Number.isFinite(futureCostRaw) || !Number.isFinite(presentValueRaw)) {
    return invalidResult('These inputs produce a number too large to calculate.')
  }

  return {
    // These six map to config.js's resultFields and are what actually
    // reaches the screen — ResultPanel.jsx formats every resultField as
    // INR currency, so all six have to be plain, finite numbers (the two
    // percentage fields follow the same approach CAGR already uses for
    // its "CAGR (%)" and "Total growth (%)" results).
    futureCost: Math.round(futureCostRaw),
    totalIncrease: Math.round(totalIncreaseRaw),
    percentageIncrease: roundTo2(percentageIncreaseRaw),
    presentValue: Math.round(presentValueRaw),
    purchasingPowerLost: Math.round(purchasingPowerLostRaw),
    percentageReduction: roundTo2(percentageReductionRaw),

    // Extra fields for callers/tests, kept off resultFields for the same
    // reason SWP keeps its exhaustion flags off resultFields: they're not
    // safe currency values, so putting them in front of ResultPanel.jsx's
    // formatter would show up as a broken-looking value.
    isValid: true,
    message: null,
  }
}