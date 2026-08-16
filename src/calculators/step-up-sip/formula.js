export function calculate(inputs) {
  const start = Math.max(0, Number(inputs.monthlyInvestment) || 0)
  const stepUp = Math.max(0, Number(inputs.annualStepUpPercent) || 0) / 100
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0)
  const years = Math.max(0, Math.floor(Number(inputs.years) || 0))

  const monthlyRate = annualReturn / 12 / 100
  let balance = 0
  let totalInvested = 0
  let monthlyInvestment = start

  for (let month = 1; month <= years * 12; month++) {
    balance = balance * (1 + monthlyRate) + monthlyInvestment
    totalInvested += monthlyInvestment

    if (month % 12 === 0) {
      monthlyInvestment *= 1 + stepUp
    }
  }

  return {
    totalValue: Math.round(balance),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(balance - totalInvested),
    lastMonthlyInvestment: Math.round(years > 0 ? monthlyInvestment / (1 + stepUp) : start),
  }
}
