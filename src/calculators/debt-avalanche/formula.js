function parseDebts(value) {
  return String(value || '')
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, balance, rate, minimum] = line.split(',').map((v) => v.trim())
      return {
        name: name || 'Debt',
        balance: Math.max(0, Number(balance) || 0),
        rate: Math.max(0, Number(rate) || 0),
        minimum: Math.max(0, Number(minimum) || 0),
      }
    })
    .filter((debt) => debt.balance > 0)
    .sort((a, b) => b.rate - a.rate)
}

export function calculate(inputs) {
  const debts = parseDebts(inputs.debts)
  const extra = Math.max(0, Number(inputs.extraPayment) || 0)
  let months = 0
  let totalInterest = 0

  while (debts.some((d) => d.balance > 0.01) && months < 1200) {
    months++

    for (const debt of debts) {
      if (debt.balance <= 0) continue
      const interest = debt.balance * debt.rate / 12 / 100
      totalInterest += interest
      debt.balance += interest
      debt.balance = Math.max(0, debt.balance - Math.min(debt.minimum, debt.balance))
    }

    const target = debts.find((d) => d.balance > 0.01)
    if (target) target.balance = Math.max(0, target.balance - Math.min(extra, target.balance))
  }

  const startingDebt = parseDebts(inputs.debts).reduce((sum, d) => sum + d.balance, 0)
  return {
    monthsToDebtFree: months,
    yearsToDebtFree: Math.round((months / 12) * 10) / 10,
    totalInterest: Math.round(totalInterest),
    totalPaid: Math.round(startingDebt + totalInterest),
  }
}
