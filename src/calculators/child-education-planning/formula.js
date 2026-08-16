export function calculate(inputs) {
  const age = Math.max(0, Number(inputs.childAge) || 0)
  const startAge = Math.max(age, Number(inputs.educationStartAge) || age)
  const currentCost = Math.max(0, Number(inputs.currentEducationCost) || 0)
  const inflation = Math.max(0, Number(inputs.educationInflationRate) || 0) / 100
  const currentSavings = Math.max(0, Number(inputs.currentSavings) || 0)
  const investmentReturn = Math.max(0, Number(inputs.investmentReturnRate) || 0) / 100

  const years = Math.max(0, startAge - age)
  const months = years * 12
  const target = currentCost * Math.pow(1 + inflation, years)
  const r = investmentReturn / 12
  const futureSavings = currentSavings * Math.pow(1 + r, months)
  const gap = Math.max(0, target - futureSavings)

  const requiredMonthlyInvestment = gap <= 0 || months <= 0
    ? 0
    : r === 0
      ? gap / months
      : gap / (((Math.pow(1 + r, months) - 1) / r) * (1 + r))

  return {
    yearsToGoal: Math.round(years),
    futureEducationCost: Math.round(target),
    futureCurrentSavings: Math.round(futureSavings),
    requiredMonthlyInvestment: Math.round(requiredMonthlyInvestment),
    shortfall: Math.round(gap),
  }
}
