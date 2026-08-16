export function calculate(inputs) {
  const principal = Math.max(0, Number(inputs.principal) || 0)
  const annualRate = Math.max(0, Number(inputs.annualRate) || 0) / 100
  const years = Math.max(0, Number(inputs.years) || 0)
  const compoundsPerYear = Math.max(1, Math.floor(Number(inputs.compoundsPerYear) || 1))
  const monthlyContribution = Math.max(0, Number(inputs.monthlyContribution) || 0)

  const periods = years * compoundsPerYear
  const periodicRate = annualRate / compoundsPerYear
  const months = years * 12

  let balance = principal

  for (let period = 0; period < periods; period++) {
    balance *= 1 + periodicRate

    const periodsPerMonth = compoundsPerYear / 12
    if (monthlyContribution > 0 && (period + 1) % Math.max(1, Math.round(periodsPerMonth)) === 0) {
      balance += monthlyContribution
    }
  }

  const totalContributed = principal + monthlyContribution * months
  const totalGrowth = Math.max(0, balance - totalContributed)

  return {
    futureValue: Math.round(balance),
    totalContributed: Math.round(totalContributed),
    totalGrowth: Math.round(totalGrowth),
  }
}
