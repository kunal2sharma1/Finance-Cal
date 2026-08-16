export function calculate(inputs) {
  const currentAge = Math.max(18, Number(inputs.currentAge) || 18)
  const assets = Math.max(0, Number(inputs.investedAssets) || 0)
  const monthlyInvestment = Math.max(0, Number(inputs.monthlyInvestment) || 0)
  const monthlyExpenses = Math.max(0, Number(inputs.monthlyExpenses) || 0)
  const returnRate = Math.max(0, Number(inputs.annualInvestmentReturn) || 0) / 100
  const inflation = Math.max(0, Number(inputs.annualInflation) || 0) / 100
  const withdrawal = Math.max(0.01, Number(inputs.withdrawalRate) || 0) / 100

  let corpus = assets
  let age = currentAge
  let target = monthlyExpenses * 12 / withdrawal

  for (let year = 0; year < 80 && age < 100; year++) {
    corpus = corpus * (1 + returnRate) + monthlyInvestment * 12
    age += 1

    const futureExpenses = monthlyExpenses * 12 * Math.pow(1 + inflation, age - currentAge)
    target = futureExpenses / withdrawal

    if (corpus >= target) break
  }

  const reached = corpus >= target

  return {
    estimatedAge: reached ? age : 0,
    estimatedYears: reached ? age - currentAge : 0,
    targetCorpus: Math.round(target),
    projectedCorpus: Math.round(corpus),
  }
}
