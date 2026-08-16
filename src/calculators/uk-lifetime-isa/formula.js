export function calculate(inputs) {
  const annualContribution = Math.min(4000, Math.max(0, Number(inputs.annualContribution) || 0))
  const years = Math.max(1, Number(inputs.years) || 1)
  const returnRate = (Number(inputs.returnRate) || 0) / 100
  const annualBonus = annualContribution * 0.25
  const totalContributions = annualContribution * years
  const totalBonus = annualBonus * years
  const annualGrowth = returnRate === 0 ? 1 : (1 + returnRate)
  let projectedValue = 0

  for (let year = 0; year < years; year += 1) {
    projectedValue = (projectedValue + annualContribution + annualBonus) * annualGrowth
  }

  return {
    annualLimit: 4000,
    annualBonus,
    totalContributions,
    totalBonus,
    projectedValue,
    isValid: true,
  }
}
