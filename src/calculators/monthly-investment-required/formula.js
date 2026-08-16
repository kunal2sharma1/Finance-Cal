export function calculate(inputs) {
  const target = Math.max(0, Number(inputs.targetAmount) || 0)
  const current = Math.max(0, Number(inputs.currentInvestment) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0)

  const months = years * 12
  const r = annualReturn / 12 / 100
  const futureCurrent = current * Math.pow(1 + r, months)
  const gap = Math.max(0, target - futureCurrent)

  let required = 0
  if (gap > 0 && months > 0) {
    required = r === 0
      ? gap / months
      : gap / (((Math.pow(1 + r, months) - 1) / r) * (1 + r))
  }

  const additionalContributions = required * months
  const estimatedGrowth = Math.max(0, target - current - additionalContributions)

  return {
    requiredMonthlyInvestment: Math.round(required),
    futureValueOfCurrentInvestment: Math.round(futureCurrent),
    additionalContributions: Math.round(additionalContributions),
    estimatedGrowth: Math.round(estimatedGrowth),
  }
}
