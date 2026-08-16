function computeEMI(principal, annualRate, years) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return 0
  const r = annualRate / 12 / 100
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}

export function calculate(inputs) {
  const loanAmount = Math.max(0, Number(inputs.loanAmount) || 0)
  const annualRate = Math.max(0, Number(inputs.annualInterestRate) || 0)
  const years = Math.max(0, Number(inputs.loanTenureYears) || 0)
  const monthlyEMI = computeEMI(loanAmount, annualRate, years)
  const months = Math.round(years * 12)
  const totalPayable = monthlyEMI * months

  return {
    monthlyEMI: Math.round(monthlyEMI),
    totalInterest: Math.round(Math.max(0, totalPayable - loanAmount)),
    totalPayable: Math.round(totalPayable),
    months,
  }
}
