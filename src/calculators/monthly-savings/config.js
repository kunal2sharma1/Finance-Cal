export const config = {
  id: 'monthly-savings',
  title: 'Monthly Savings Calculator',
  shortDescription:
    'See how much of your income you could save each month after regular expenses.',
  category: 'Budgeting',

  fields: [
    { name: 'monthlyIncome', label: 'How much money comes in each month?', unit: '₹', defaultValue: 75000, min: 0, max: 5000000, step: 1000 },
    { name: 'fixedExpenses', label: 'How much do your regular/fixed expenses cost?', unit: '₹', defaultValue: 30000, min: 0, max: 5000000, step: 1000 },
    { name: 'variableExpenses', label: 'How much do flexible expenses cost?', unit: '₹', defaultValue: 15000, min: 0, max: 5000000, step: 1000 },
    { name: 'monthlyDebtPayments', label: 'How much do you pay toward loans or credit cards?', unit: '₹', defaultValue: 5000, min: 0, max: 5000000, step: 500 },
  ],

  resultFields: [
    { name: 'monthlySavings', label: 'Money left to save each month', primary: true },
    { name: 'annualSavings', label: 'Potential savings in one year' },
    { name: 'savingsRate', label: 'Share of income you could save', unit: '%' },
    { name: 'totalMonthlyOutflow', label: 'Total monthly spending and debt payments' },
  ],
}
