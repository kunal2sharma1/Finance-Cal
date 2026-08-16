export function calculate(inputs) {
  const employer = Math.max(0, Number(inputs.employerContribution) || 0)
  const salarySacrifice = Math.max(0, Number(inputs.salarySacrifice) || 0)
  const personal = Math.max(0, Number(inputs.personalDeductible) || 0)
  const annualCap = 30000
  const totalConcessional = employer + salarySacrifice + personal
  const remainingCap = Math.max(0, annualCap - totalConcessional)
  const overCap = Math.max(0, totalConcessional - annualCap)

  return { annualCap, totalConcessional, remainingCap, overCap, isValid: true }
}
