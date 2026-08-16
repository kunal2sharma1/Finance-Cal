export const config = {
  id: 'savings-rate',
  title: 'Savings Rate Calculator',
  shortDescription: 'Calculate what percentage of your income you save each month and see the amount left for spending.',
  category: 'Savings & Investing',
  fields: [
    { name: 'monthlyIncome', label: 'Monthly income', unit: '₹', defaultValue: 100000, min: 0, max: 100000000, step: 1000 },
    { name: 'monthlySavings', label: 'Monthly savings / investments', unit: '₹', defaultValue: 20000, min: 0, max: 100000000, step: 1000 },
  ],
  resultFields: [
    { name: 'savingsRate', label: 'Savings rate', primary: true, unit: '%' },
    { name: 'monthlySpending', label: 'Monthly spending', unit: '₹' },
    { name: 'annualSavings', label: 'Annual savings', unit: '₹' },
  ],
}
