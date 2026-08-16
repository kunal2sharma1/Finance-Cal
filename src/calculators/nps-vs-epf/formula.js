function futureValue(start, monthlyContribution, annualRate, years) {
  const months = Math.round(years * 12)
  const monthlyRate = annualRate / 12 / 100
  let balance = start
  for (let month = 0; month < months; month++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution
  }
  return { value: balance, contributions: start + monthlyContribution * months }
}

export function calculate(inputs) {
  const start = Math.max(0, Number(inputs.currentCorpus) || 0)
  const npsMonthly = Math.max(0, Number(inputs.monthlyNPSContribution) || 0)
  const epfMonthly = Math.max(0, Number(inputs.monthlyEPFContribution) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)
  const npsRate = Math.max(0, Number(inputs.npsReturnRate) || 0)
  const epfRate = Math.max(0, Number(inputs.epfReturnRate) || 0)

  const nps = futureValue(start, npsMonthly, npsRate, years)
  const epf = futureValue(start, epfMonthly, epfRate, years)

  return {
    npsProjectedValue: Math.round(nps.value),
    epfProjectedValue: Math.round(epf.value),
    difference: Math.round(Math.abs(nps.value - epf.value)),
    totalNPSContributions: Math.round(nps.contributions),
    totalEPFContributions: Math.round(epf.contributions),
  }
}
