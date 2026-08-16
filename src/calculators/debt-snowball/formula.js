function parseDebts(value) {
  if (Array.isArray(value)) return value
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
}

export function calculate(inputs) {
  const debts = parseDebts(inputs.debts).sort((a, b) => a.balance - b.balance)
  let extra = Math.max(0, Number(inputs.extraPayment) || 0)
  let months = 0
  let totalInterest = 0

  for (const debt of debts) debt.originalMinimum = debt.minimum

  while (debts.some((d) => d.balance > 0.01) && months < 1200) {
    months++
    for (const debt of debts) {
      if (debt.balance <= 0) continue
      const interest = debt.balance * (debt.rate / 12 / 100)
      debt.balance += interest
      totalInterest += interest

      const payment = Math.min(debt.minimum, debt.balance)
      debt.balance -= payment
    }

    const target = debts.find((d) => d.balance > 0.01)
    if (target) {
      const payment = Math.min(extra, target.balance)
      target.balance -= payment
    }
  }

  return {
    monthsToDebtFree: months,
    yearsToDebtFree: Math.round((months / 12) * 10) / 10,
    totalInterest: Math.round(totalInterest),
    totalPaid: Math.round(debts.reduce((sum, d) => sum + d.originalMinimum, 0) * months + totalInterest),
  }
}
