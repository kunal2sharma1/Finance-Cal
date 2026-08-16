// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

export function calculate(inputs) {
  const investmentAmount = Number(inputs.investmentAmount) || 0
  const annualReturnRate = Number(inputs.annualReturnRate) || 0
  const years = Number(inputs.years) || 0

  const annualRate = annualReturnRate / 100
  const totalValue = investmentAmount * Math.pow(1 + annualRate, years)
  const totalInvested = investmentAmount
  const totalReturns = totalValue - totalInvested

  return {
    totalValue: Math.round(totalValue),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
  }
}
