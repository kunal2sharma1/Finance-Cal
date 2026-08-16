export function calculate(inputs) {
  const income = Math.max(0, Number(inputs.monthlyIncome) || 0)
  const housing = Math.max(0, Number(inputs.housing) || 0)
  const food = Math.max(0, Number(inputs.food) || 0)
  const transport = Math.max(0, Number(inputs.transport) || 0)
  const utilities = Math.max(0, Number(inputs.utilities) || 0)
  const debtPayments = Math.max(0, Number(inputs.debtPayments) || 0)
  const lifestyle = Math.max(0, Number(inputs.lifestyle) || 0)
  const plannedSavings = Math.max(0, Number(inputs.plannedSavings) || 0)

  const totalExpenses = housing + food + transport + utilities + debtPayments + lifestyle
  const monthlyBalance = income - totalExpenses - plannedSavings
  const savingsRate = income > 0 ? (plannedSavings / income) * 100 : 0

  return {
    monthlyBalance: Math.round(monthlyBalance),
    totalExpenses: Math.round(totalExpenses),
    totalSavings: Math.round(plannedSavings),
    savingsRate: Math.round(savingsRate * 100) / 100,
  }
}
