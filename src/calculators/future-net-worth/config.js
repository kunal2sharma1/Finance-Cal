export const config = {
  id: 'future-net-worth',
  title: 'Future Net Worth Calculator',
  shortDescription:
    'Project what your assets and debts could look like after several years of saving, investing and repayment.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'currentAssets', label: 'What do you currently own in total?', unit: '₹', defaultValue: 5000000, min: 0, max: 500000000, step: 10000 },
    { name: 'currentDebt', label: 'How much do you currently owe?', unit: '₹', defaultValue: 2000000, min: 0, max: 500000000, step: 10000 },
    { name: 'monthlyInvestment', label: 'How much will you add to investments each month?', unit: '₹', defaultValue: 30000, min: 0, max: 5000000, step: 500 },
    { name: 'annualDebtPayment', label: 'How much debt will you repay each year?', unit: '₹', defaultValue: 300000, min: 0, max: 50000000, step: 5000 },
    { name: 'annualAssetGrowth', label: 'Expected yearly growth of investments/assets', unit: '%', defaultValue: 8, min: 0, max: 30, step: 0.5 },
    { name: 'years', label: 'How many years do you want to project?', unit: 'years', defaultValue: 10, min: 1, max: 40, step: 1 },
  ],

  resultFields: [
    { name: 'futureAssets', label: 'Estimated assets in the future', primary: true },
    { name: 'futureDebt', label: 'Estimated debt in the future' },
    { name: 'futureNetWorth', label: 'Estimated future net worth' },
    { name: 'netWorthGrowth', label: 'Increase in net worth from today' },
  ],
}
