export function calculate(inputs) {
  const p = Math.max(0, Number(inputs.monthlyInvestment) || 0)
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)
  const months = Math.round(years * 12)
  const r = annualReturn / 12 / 100

  const futureValue = r === 0
    ? p * months
    : p * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)

  const totalInvested = p * months

  return {
    futureValue: Math.round(futureValue),
    totalInvested: Math.round(totalInvested),
    estimatedGrowth: Math.round(Math.max(0, futureValue - totalInvested)),
  }
}
