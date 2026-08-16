export function calculate(inputs) {
  const principal = Math.max(0, Number(inputs.purchaseAmount) || 0)
  const rate = Math.max(0, Number(inputs.annualInterestRate) || 0)
  const months = Math.max(1, Math.round(Number(inputs.tenureMonths) || 1))
  const fee = Math.max(0, Number(inputs.processingFee) || 0)
  const r = rate / 12 / 100

  const emi = r === 0
    ? principal / months
    : principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)

  const totalInterest = Math.max(0, emi * months - principal)

  return {
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalCost: Math.round(principal + totalInterest + fee),
  }
}
