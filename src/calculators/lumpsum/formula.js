// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

export function calculate(inputs) {
  const principal = Number(inputs.principal) || 0
  const annualReturnRate = Number(inputs.annualReturnRate) || 0
  const years = Number(inputs.years) || 0

  const rate = annualReturnRate / 100

  // Standard lumpsum future-value formula (annual compounding):
  // FV = P × (1 + r)^t
  const totalValue = principal * Math.pow(1 + rate, years)

  const totalInvested = principal
  const totalReturns = totalValue - totalInvested

  return {
    totalValue: Math.round(totalValue),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
  }
}
