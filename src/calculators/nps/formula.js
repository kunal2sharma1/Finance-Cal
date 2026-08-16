export function calculate(inputs) {
  const currentAge = Math.max(18, Number(inputs.currentAge) || 0)
  const retirementAge = Math.max(currentAge, Number(inputs.retirementAge) || currentAge)
  const currentCorpus = Math.max(0, Number(inputs.currentCorpus) || 0)
  const monthlyContribution = Math.max(0, Number(inputs.monthlyContribution) || 0)
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0) / 100
  const annuityPercent = Math.min(100, Math.max(0, Number(inputs.annuityPercent) || 0)) / 100
  const annuityRate = Math.max(0, Number(inputs.annuityRate) || 0) / 100

  const months = Math.round((retirementAge - currentAge) * 12)
  const monthlyRate = annualReturn / 12
  let corpus = currentCorpus

  for (let month = 0; month < months; month++) {
    corpus *= 1 + monthlyRate
    corpus += monthlyContribution
  }

  const totalContributions = currentCorpus + monthlyContribution * months
  const annuityPurchaseAmount = corpus * annuityPercent
  const estimatedLumpSum = corpus - annuityPurchaseAmount
  const estimatedAnnualPension = annuityPurchaseAmount * annuityRate

  return {
    projectedCorpus: Math.round(corpus),
    totalContributions: Math.round(totalContributions),
    estimatedGrowth: Math.round(Math.max(0, corpus - totalContributions)),
    estimatedLumpSum: Math.round(estimatedLumpSum),
    annuityPurchaseAmount: Math.round(annuityPurchaseAmount),
    estimatedAnnualPension: Math.round(estimatedAnnualPension),
    estimatedMonthlyPension: Math.round(estimatedAnnualPension / 12),
  }
}
