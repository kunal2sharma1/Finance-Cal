export function calculate(inputs) {
  const personal = Math.max(0, Number(inputs.personalContribution) || 0)
  const employer = Math.max(0, Number(inputs.employerContribution) || 0)
  const carry = Math.max(0, Number(inputs.carryForward) || 0)
  const adjustedIncome = Math.max(0, Number(inputs.adjustedIncome) || 0)
  const annualAllowance = adjustedIncome > 260000 ? 10000 : 60000
  const total = personal + employer
  const available = annualAllowance + carry
  const remaining = available - total
  const warning = adjustedIncome > 260000
    ? 'Adjusted income is above the published 2026–27 taper threshold; this estimate uses the £10,000 minimum allowance and does not calculate the exact tapered allowance.'
    : remaining < 0
      ? 'Modeled pension input exceeds the available allowance.'
      : 'Modeled pension input is within the available allowance.'
  return { totalContributions: total, availableAllowance: available, remainingAllowance: Math.max(0, remaining), warning, isValid: true }
}
