export function calculate(inputs) {
  const coverage = inputs.coverage === 'family' ? 'family' : 'self'
  const current = Math.max(0, Number(inputs.currentContribution) || 0)
  const planned = Math.max(0, Number(inputs.additionalContribution) || 0)
  const years = Math.max(1, Number(inputs.years) || 1)
  const returnRate = (Number(inputs.returnRate) || 0) / 100

  const annualLimit = coverage === 'family' ? 8750 : 4400
  const hdhpDeductible = coverage === 'family' ? 3400 : 1700
  const oopLimit = coverage === 'family' ? 17000 : 8500
  const remainingRoom = Math.max(0, annualLimit - current)
  const eligibleAdditional = Math.min(planned, remainingRoom)
  const growthFactor = returnRate === 0
    ? years
    : ((1 + returnRate) ** years - 1) / returnRate

  return {
    annualLimit,
    remainingRoom,
    projectedValue: eligibleAdditional * growthFactor,
    hdhpDeductible,
    oopLimit,
    isValid: true,
  }
}
