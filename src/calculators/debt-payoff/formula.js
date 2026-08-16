export function calculate(inputs) {
  let balance = Math.max(0, Number(inputs.totalDebt) || 0)
  const annualRate = Math.max(0, Number(inputs.averageAnnualRate) || 0)
  const payment = Math.max(0, Number(inputs.monthlyPayment) || 0)
  const r = annualRate / 12 / 100

  if (balance === 0) return { monthsToDebtFree: 0, yearsToDebtFree: 0, totalInterest: 0, totalPaid: 0 }
  if (payment <= balance * r && r > 0) {
    return { monthsToDebtFree: 0, yearsToDebtFree: 0, totalInterest: 0, totalPaid: 0 }
  }

  let months = 0
  let interest = 0

  while (balance > 0.01 && months < 1200) {
    months++
    const interestPart = balance * r
    interest += interestPart
    const actualPayment = Math.min(payment, balance + interestPart)
    balance = Math.max(0, balance + interestPart - actualPayment)
  }

  return {
    monthsToDebtFree: months,
    yearsToDebtFree: Math.round((months / 12) * 10) / 10,
    totalInterest: Math.round(interest),
    totalPaid: Math.round((Number(inputs.totalDebt) || 0) + interest),
  }
}
