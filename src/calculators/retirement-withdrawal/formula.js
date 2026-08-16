export function calculate(inputs) {
  let balance = Math.max(0, Number(inputs.startingCorpus) || 0)
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0) / 100
  const inflation = Math.max(0, Number(inputs.inflationRate) || 0) / 100
  let monthlyWithdrawal = Math.max(0, Number(inputs.monthlyWithdrawal) || 0)
  const years = Math.max(0, Math.floor(Number(inputs.years) || 0))

  let totalWithdrawn = 0
  const firstYearWithdrawal = monthlyWithdrawal * 12

  for (let year = 0; year < years; year++) {
    let annualWithdrawn = 0

    for (let month = 0; month < 12; month++) {
      balance *= Math.pow(1 + annualReturn, 1 / 12)
      const withdrawal = Math.min(monthlyWithdrawal, balance)
      balance -= withdrawal
      annualWithdrawn += withdrawal
      totalWithdrawn += withdrawal
      if (balance <= 0.01) break
    }

    if (balance <= 0.01) break
    monthlyWithdrawal *= 1 + inflation
  }

  return {
    remainingBalance: Math.round(Math.max(0, balance)),
    totalWithdrawn: Math.round(totalWithdrawn),
    firstYearWithdrawal: Math.round(firstYearWithdrawal),
    lastYearWithdrawal: Math.round(monthlyWithdrawal),
  }
}
