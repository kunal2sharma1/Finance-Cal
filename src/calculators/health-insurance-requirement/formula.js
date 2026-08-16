export function calculate(inputs) {
  const annualBudget = Math.max(0, Number(inputs.annualFamilyMedicalBudget) || 0)
  const years = Math.max(1, Number(inputs.yearsOfProtection) || 1)
  const existing = Math.max(0, Number(inputs.existingCover) || 0)

  const suggested = annualBudget * years
  const gap = Math.max(0, suggested - existing)

  return {
    suggestedCover: Math.round(suggested),
    existingCover: Math.round(existing),
    coverageGap: Math.round(gap),
  }
}
