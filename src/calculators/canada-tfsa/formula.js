export function calculate(inputs) {
  const annualLimit = 7000
  const unused = Math.max(0, Number(inputs.unusedRoom) || 0)
  const current = Math.max(0, Number(inputs.currentYearContribution) || 0)
  const planned = Math.max(0, Number(inputs.plannedContribution) || 0)
  const available = Math.max(0, annualLimit + unused - current)
  const remaining = available - planned
  const warning = remaining < 0 ? 'Planned contribution exceeds the estimated available room. Confirm your CRA contribution room before contributing.' : 'Planned contribution fits within the estimated available room.'
  return { annualLimit, availableRoom: available, remainingRoom: Math.max(0, remaining), warning, isValid: true }
}
