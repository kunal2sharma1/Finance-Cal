function emi(principal, annualRate, years) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return 0
  const r = annualRate / 12 / 100
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}

export function calculate(inputs) {
  const courseCost = Math.max(0, Number(inputs.courseCost) || 0)
  const own = Math.min(courseCost, Math.max(0, Number(inputs.ownContribution) || 0))
  const rate = Math.max(0, Number(inputs.annualInterestRate) || 0)
  const moratoriumYears = Math.max(0, Number(inputs.moratoriumYears) || 0)
  const repaymentYears = Math.max(0, Number(inputs.repaymentYears) || 0)

  const loanAmount = Math.max(0, courseCost - own)
  const growthDuringMoratorium = loanAmount * rate / 100 * moratoriumYears
  const balanceAtRepayment = loanAmount + growthDuringMoratorium
  const monthlyEMI = emi(balanceAtRepayment, rate, repaymentYears)
  const totalRepayment = monthlyEMI * repaymentYears * 12

  return {
    loanAmount: Math.round(loanAmount),
    estimatedInterestDuringMoratorium: Math.round(growthDuringMoratorium),
    monthlyEMI: Math.round(monthlyEMI),
    totalRepayment: Math.round(totalRepayment),
  }
}
