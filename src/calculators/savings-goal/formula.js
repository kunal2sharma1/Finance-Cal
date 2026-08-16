export function calculate(inputs) {
  const target = Math.max(0, Number(inputs.targetAmount) || 0)
  const current = Math.max(0, Number(inputs.currentSavings) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0)

  const months = years * 12
  const monthlyRate = annualReturn / 12 / 100
  const futureCurrent = current * Math.pow(1 + monthlyRate, months)
  const gap = Math.max(0, target - futureCurrent)

  let monthlySaving = 0
  if (gap > 0 && months > 0) {
    if (monthlyRate === 0) {
      monthlySaving = gap / months
    } else {
      monthlySaving = gap / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
    }
  }

  const totalNewContributions = monthlySaving * months
  const estimatedGrowth = Math.max(0, target - current - totalNewContributions)

  return {
    requiredMonthlySaving: Math.round(monthlySaving),
    futureValueOfCurrentSavings: Math.round(futureCurrent),
    targetAmount: Math.round(target),
    totalNewContributions: Math.round(totalNewContributions),
    estimatedGrowth: Math.round(estimatedGrowth),
  }
}
