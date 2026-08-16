export function calculate(inputs) {
  let balance = Math.max(0, Number(inputs.startingAmount) || 0)
  let monthlyInvestment = Math.max(0, Number(inputs.monthlyInvestment) || 0)
  const step = Math.max(0, Number(inputs.annualInvestmentIncrease) || 0) / 100
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0) / 100
  const years = Math.max(0, Math.floor(Number(inputs.years) || 0))
  const monthlyRate = annualReturn / 12
  let totalContributions = balance

  for (let month = 1; month <= years * 12; month++) {
    balance *= 1 + monthlyRate
    balance += monthlyInvestment
    totalContributions += monthlyInvestment

    if (month % 12 === 0) {
      monthlyInvestment *= 1 + step
    }
  }

  return {
    finalValue: Math.round(balance),
    totalContributions: Math.round(totalContributions),
    estimatedGrowth: Math.round(Math.max(0, balance - totalContributions)),
    finalMonthlyInvestment: Math.round(years > 0 ? monthlyInvestment / (1 + step) : monthlyInvestment),
  }
}
