export function calculate(inputs) {
  let balance = Math.max(0, Number(inputs.balance) || 0)
  const annualAPR = Math.max(0, Number(inputs.annualAPR) || 0)
  const payment = Math.max(0, Number(inputs.monthlyPayment) || 0)
  const r = annualAPR / 12 / 100

  if (balance === 0) return { monthsToPayoff: 0, yearsToPayoff: 0, totalInterest: 0, totalPaid: 0 }

  if (payment <= balance * r && r > 0) {
    return { monthsToPayoff: 0, yearsToPayoff: 0, totalInterest: 0, totalPaid: 0 }
  }

  let months = 0
  let interest = 0
  while (balance > 0.01 && months < 1200) {
    months++
    const monthInterest = balance * r
    interest += monthInterest
    const actualPayment = Math.min(payment, balance + monthInterest)
    balance = Math.max(0, balance + monthInterest - actualPayment)
  }

  return {
    monthsToPayoff: months,
    yearsToPayoff: Math.round((months / 12) * 10) / 10,
    totalInterest: Math.round(interest),
    totalPaid: Math.round((Number(inputs.balance) || 0) + interest),
  }
}
