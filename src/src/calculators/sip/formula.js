// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

export function calculate(inputs) {
  const monthlyInvestment = Number(inputs.monthlyInvestment) || 0
  const annualReturnRate = Number(inputs.annualReturnRate) || 0
  const years = Number(inputs.years) || 0

  const months = years * 12
  const monthlyRate = annualReturnRate / 12 / 100

  let totalValue
  if (monthlyRate === 0) {
    // Edge case: 0% return means the total is just what was put in.
    totalValue = monthlyInvestment * months
  } else {
    // Standard SIP future-value formula:
    // FV = P × [((1 + i)^n − 1) / i] × (1 + i)
    totalValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate)
  }

  const totalInvested = monthlyInvestment * months
  const totalReturns = totalValue - totalInvested

  return {
    totalValue: Math.round(totalValue),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
  }
}
