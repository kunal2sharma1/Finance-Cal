export function calculate(inputs) {
  const currentRoom = Math.min(40000, Math.max(0, Number(inputs.currentRoom) || 0))
  const annualContribution = Math.min(8000, Math.max(0, Number(inputs.annualContribution) || 0))
  const years = Math.max(1, Number(inputs.years) || 1)
  const returnRate = (Number(inputs.returnRate) || 0) / 100
  const plannedContributions = Math.min(currentRoom, annualContribution * years)
  const remainingLifetimeRoom = Math.max(0, 40000 - plannedContributions)
  let projectedValue = 0

  for (let year = 0; year < years; year += 1) {
    projectedValue = (projectedValue + Math.min(annualContribution, Math.max(0, 40000 - year * annualContribution))) * (1 + returnRate)
  }

  return {
    annualLimit: 8000,
    lifetimeLimit: 40000,
    plannedContributions,
    remainingLifetimeRoom,
    projectedValue,
    isValid: true,
  }
}
