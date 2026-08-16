function emi(principal, annualRate, years) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return 0
  const r = annualRate / 12 / 100
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}

export function calculate(inputs) {
  const carPrice = Math.max(0, Number(inputs.carPrice) || 0)
  const downPayment = Math.min(carPrice, Math.max(0, Number(inputs.downPayment) || 0))
  const annualRate = Math.max(0, Number(inputs.annualInterestRate) || 0)
  const years = Math.max(0, Number(inputs.loanTenureYears) || 0)
  const loanAmount = Math.max(0, carPrice - downPayment)
  const months = Math.round(years * 12)
  const monthlyEMI = emi(loanAmount, annualRate, years)
  const totalRepayments = monthlyEMI * months
  const totalOutflow = downPayment + totalRepayments

  return {
    loanAmount: Math.round(loanAmount),
    monthlyEMI: Math.round(monthlyEMI),
    totalInterest: Math.round(Math.max(0, totalRepayments - loanAmount)),
    totalOutflow: Math.round(totalOutflow),
  }
}
