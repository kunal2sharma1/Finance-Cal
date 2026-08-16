function totalInterest(principal, annualRate, years) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return 0
  const r = annualRate / 12 / 100
  const emi = r === 0 ? principal / months : principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
  return Math.max(0, emi * months - principal)
}

function monthlyEMI(principal, annualRate, years) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return 0
  const r = annualRate / 12 / 100
  return r === 0 ? principal / months : principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
}

export function calculate(inputs) {
  const balance = Math.max(0, Number(inputs.outstandingBalance) || 0)
  const currentRate = Math.max(0, Number(inputs.currentRate) || 0)
  const newRate = Math.max(0, Number(inputs.newRate) || 0)
  const years = Math.max(0, Number(inputs.remainingYears) || 0)
  const fees = Math.max(0, Number(inputs.transferFees) || 0)

  const currentInterest = totalInterest(balance, currentRate, years)
  const newInterest = totalInterest(balance, newRate, years)
  const grossSavings = currentInterest - newInterest
  const netSavings = grossSavings - fees

  const oldEMI = monthlyEMI(balance, currentRate, years)
  const switchCost = Math.max(0, fees)
  const breakEvenMonths = grossSavings > 0
    ? Math.max(0, Math.ceil(switchCost / Math.max(1, oldEMI - monthlyEMI(balance, newRate, years))))
    : 0

  return {
    currentInterest: Math.round(currentInterest),
    newInterest: Math.round(newInterest),
    estimatedSavings: Math.round(netSavings),
    breakEvenMonths,
  }
}
