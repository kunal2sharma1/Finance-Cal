export function calculate({ grossMonthlyIncome = 0, housingPayment = 0, otherDebtPayments = 0 }) {
  const income = Number(grossMonthlyIncome)
  const housing = Number(housingPayment)
  const other = Number(otherDebtPayments)
  if (!(income > 0) || housing < 0 || other < 0) return { dti: 0, housingDti: 0, monthlyDebt: 0 }
  const monthlyDebt = housing + other
  return {
    dti: (monthlyDebt / income) * 100,
    housingDti: (housing / income) * 100,
    monthlyDebt,
  }
}
