export function calculate(inputs) {
  const age = Math.max(18, Number(inputs.currentAge) || 18)
  const savings = Math.max(0, Number(inputs.currentSavings) || 0)
  const monthlyInvestment = Math.max(0, Number(inputs.monthlyInvestment) || 0)
  const annualExpenses = Math.max(0, Number(inputs.annualExpensesToday) || 0)
  const inflation = Math.max(0, Number(inputs.inflationRate) || 0) / 100
  const investmentReturn = Math.max(0, Number(inputs.investmentReturnRate) || 0) / 100
  const withdrawal = Math.max(0.01, Number(inputs.withdrawalRate) || 0) / 100
  const maxAge = Math.max(age, Number(inputs.maxAge) || age)

  let corpus = savings
  let projectedAge = age
  let requiredCorpus = annualExpenses / withdrawal

  while (projectedAge < maxAge) {
    corpus = corpus * (1 + investmentReturn) + monthlyInvestment * 12
    projectedAge += 1
    const yearsElapsed = projectedAge - age
    const futureExpenses = annualExpenses * Math.pow(1 + inflation, yearsElapsed)
    requiredCorpus = futureExpenses / withdrawal

    if (corpus >= requiredCorpus) break
  }

  const found = corpus >= requiredCorpus

  return {
    estimatedRetirementAge: found ? projectedAge : 0,
    requiredCorpusAtRetirement: Math.round(requiredCorpus),
    projectedCorpus: Math.round(corpus),
    yearsFromNow: found ? projectedAge - age : 0,
  }
}
