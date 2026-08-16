export function calculate(inputs) {
  const existingContributions = Math.min(40000, Math.max(0, Number(inputs.existingContributions) || 0))
  const annualContribution = Math.min(8000, Math.max(0, Number(inputs.annualContribution) || 0))
  const years = Math.max(1, Number(inputs.years) || 1)
  const returnRate = (Number(inputs.returnRate) || 0) / 100
  let plannedContributions = 0
  let projectedValue = 0

  for (let year = 0; year < years; year += 1) {
    const lifetimeRoomBeforeYear = Math.max(0, 40000 - existingContributions - plannedContributions)
    const yearContribution = Math.min(annualContribution, lifetimeRoomBeforeYear)
    plannedContributions += yearContribution
    projectedValue = (projectedValue + yearContribution) * (1 + returnRate)
    if (yearContribution === 0) break
  }

  return {
    annualLimit: 8000,
    lifetimeLimit: 40000,
    plannedContributions,
    remainingLifetimeRoom: Math.max(0, 40000 - existingContributions - plannedContributions),
    projectedValue,
    isValid: true,
  }
}
