export function calculate(inputs) {
  const currentCost = Math.max(0, Number(inputs.currentWeddingCost) || 0)
  const years = Math.max(0, Number(inputs.yearsToWedding) || 0)
  const costInflation = Math.max(0, Number(inputs.costInflationRate) || 0) / 100
  const savings = Math.max(0, Number(inputs.currentSavings) || 0)
  const returnRate = Math.max(0, Number(inputs.investmentReturnRate) || 0) / 100

  const target = currentCost * Math.pow(1 + costInflation, years)
  const months = years * 12
  const r = returnRate / 12
  const futureSavings = savings * Math.pow(1 + r, months)
  const gap = Math.max(0, target - futureSavings)

  const monthlySaving = gap <= 0 || months <= 0
    ? 0
    : r === 0
      ? gap / months
      : gap / (((Math.pow(1 + r, months) - 1) / r) * (1 + r))

  return {
    futureWeddingCost: Math.round(target),
    futureValueOfCurrentSavings: Math.round(futureSavings),
    requiredMonthlySaving: Math.round(monthlySaving),
    fundingGap: Math.round(gap),
  }
}
