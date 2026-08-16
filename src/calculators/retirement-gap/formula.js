export function calculate(inputs) {
  const currentAge = Math.max(18, Number(inputs.currentAge) || 18)
  const retirementAge = Math.max(currentAge, Number(inputs.retirementAge) || currentAge)
  const corpus0 = Math.max(0, Number(inputs.currentCorpus) || 0)
  const monthlyInvestment = Math.max(0, Number(inputs.monthlyInvestment) || 0)
  const monthlyExpensesToday = Math.max(0, Number(inputs.monthlyRetirementExpensesToday) || 0)
  const inflation = Math.max(0, Number(inputs.inflationRate) || 0) / 100
  const preReturn = Math.max(0, Number(inputs.preRetirementReturn) || 0) / 100
  const withdrawal = Math.max(0.01, Number(inputs.withdrawalRate) || 0) / 100

  const years = Math.max(0, retirementAge - currentAge)
  const futureExpenses = monthlyExpensesToday * 12 * Math.pow(1 + inflation, years)
  const requiredCorpus = futureExpenses / withdrawal

  let projectedCorpus = corpus0
  const monthlyReturn = preReturn / 12
  for (let month = 0; month < years * 12; month++) {
    projectedCorpus = projectedCorpus * (1 + monthlyReturn) + monthlyInvestment
  }

  const gap = Math.max(0, requiredCorpus - projectedCorpus)
  const months = years * 12

  let requiredAdditionalMonthlyInvestment = 0
  if (gap > 0 && months > 0) {
    requiredAdditionalMonthlyInvestment = monthlyReturn === 0
      ? gap / months
      : gap / (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn))
  }

  return {
    requiredCorpus: Math.round(requiredCorpus),
    projectedCorpus: Math.round(projectedCorpus),
    gap: Math.round(gap),
    requiredAdditionalMonthlyInvestment: Math.round(requiredAdditionalMonthlyInvestment),
  }
}
