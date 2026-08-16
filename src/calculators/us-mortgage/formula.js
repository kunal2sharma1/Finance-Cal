export function calculate(inputs) {
  const principal = Math.max(0, Number(inputs.loanAmount) || 0)
  const annualRate = Math.max(0, Number(inputs.annualRate) || 0) / 100
  const years = Math.max(1, Number(inputs.termYears) || 1)
  const months = Math.round(years * 12)
  const monthlyRate = annualRate / 12

  const monthlyPayment = monthlyRate === 0
    ? principal / months
    : principal * (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1)
  const totalPaid = monthlyPayment * months
  const totalInterest = Math.max(0, totalPaid - principal)

  return { monthlyPayment, totalInterest, totalPaid, isValid: true }
}
