export function calculate(inputs) {
  const corpus = Math.max(0, Number(inputs.corpus) || 0)
  const withdrawalRate = Math.max(0, Number(inputs.withdrawalRate) || 0) / 100
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0) / 100
  const inflation = Math.max(0, Number(inputs.inflationRate) || 0) / 100

  const firstYearAnnualIncome = corpus * withdrawalRate
  const firstYearMonthlyIncome = firstYearAnnualIncome / 12
  const corpusAfterFirstYear = Math.max(0, corpus * (1 + annualReturn) - firstYearAnnualIncome)
  const secondYearMonthlyIncome = firstYearMonthlyIncome * (1 + inflation)

  return {
    firstYearAnnualIncome: Math.round(firstYearAnnualIncome),
    firstYearMonthlyIncome: Math.round(firstYearMonthlyIncome),
    corpusAfterFirstYear: Math.round(corpusAfterFirstYear),
    secondYearMonthlyIncome: Math.round(secondYearMonthlyIncome),
  }
}
