export function calculate(inputs) {
  const income = Math.max(0, Number(inputs.priorYearIncome) || 0)
  const unused = Math.max(0, Number(inputs.unusedRoom) || 0)
  const pensionAdjustment = Math.max(0, Number(inputs.pensionAdjustment) || 0)
  const current = Math.max(0, Number(inputs.currentContribution) || 0)
  const annualCap = 33810
  const newRoom = Math.min(annualCap, income * 0.18)
  const available = Math.max(0, newRoom - pensionAdjustment + unused)
  const remaining = Math.max(0, available - current)
  return { newRoom, availableRoom: available, remainingRoom: remaining, annualCap, isValid: true }
}
