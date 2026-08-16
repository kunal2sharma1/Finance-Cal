export function calculate(inputs) {
  const income = Math.max(0, Number(inputs.monthlyIncome) || 0)
  const fixed = Math.max(0, Number(inputs.fixedExpenses) || 0)
  const variable = Math.max(0, Number(inputs.variableExpenses) || 0)
  const debt = Math.max(0, Number(inputs.monthlyDebtPayments) || 0)

  const totalMonthlyOutflow = fixed + variable + debt
  const monthlySavings = income - totalMonthlyOutflow
  const annualSavings = monthlySavings * 12
  const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0

  return {
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    savingsRate: Math.round(savingsRate * 100) / 100,
    totalMonthlyOutflow: Math.round(totalMonthlyOutflow),
  }
}
