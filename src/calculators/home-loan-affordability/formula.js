function loanFromEMI(emi, annualRate, years) {
  const months = Math.round(years * 12)
  if (emi <= 0 || months <= 0) return 0
  const r = annualRate / 12 / 100
  if (r === 0) return emi * months
  const f = Math.pow(1 + r, months)
  return emi * (f - 1) / (r * f)
}

export function calculate(inputs) {
  const income = Math.max(0, Number(inputs.monthlyTakeHome) || 0)
  const existingEMI = Math.max(0, Number(inputs.existingEMI) || 0)
  const upfront = Math.max(0, Number(inputs.downPaymentSavings) || 0)
  const ratio = Math.max(0, Number(inputs.affordableEMIPercent) || 0) / 100
  const rate = Math.max(0, Number(inputs.annualInterestRate) || 0)
  const years = Math.max(0, Number(inputs.loanTenureYears) || 0)

  const totalEMILimit = income * ratio
  const maximumNewEMI = Math.max(0, totalEMILimit - existingEMI)
  const estimatedLoanAmount = loanFromEMI(maximumNewEMI, rate, years)
  const estimatedHomePrice = estimatedLoanAmount + upfront

  return {
    maximumNewEMI: Math.round(maximumNewEMI),
    estimatedLoanAmount: Math.round(estimatedLoanAmount),
    estimatedHomePrice: Math.round(estimatedHomePrice),
    upfrontCashUsed: Math.round(upfront),
  }
}
