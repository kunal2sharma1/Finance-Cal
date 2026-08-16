export function calculate({ monthlyIncome = 0, monthlySavings = 0 }) {
  const income = Number(monthlyIncome)
  const savings = Number(monthlySavings)
  if (!(income > 0) || savings < 0) return { savingsRate: 0, monthlySpending: 0, annualSavings: 0 }
  return {
    savingsRate: (savings / income) * 100,
    monthlySpending: Math.max(0, income - savings),
    annualSavings: savings * 12,
  }
}
