export const config = {
  id: 'retirement-withdrawal',
  title: 'Retirement Withdrawal Calculator',
  shortDescription:
    'See how long your retirement savings could last if you withdraw a regular amount.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'startingCorpus', label: 'How much money will you have when you retire?', unit: '₹', defaultValue: 10000000, min: 0, max: 1000000000, step: 50000 },
    { name: 'monthlyWithdrawal', label: 'How much will you need each month?', unit: '₹', defaultValue: 50000, min: 0, max: 5000000, step: 500 },
    { name: 'annualReturnRate', label: 'Expected yearly return after retirement', unit: '%', defaultValue: 7, min: 0, max: 30, step: 0.5 },
    { name: 'inflationRate', label: 'Expected yearly increase in your spending', unit: '%', defaultValue: 5, min: 0, max: 20, step: 0.5 },
    { name: 'years', label: 'How many years should the money last?', unit: 'years', defaultValue: 25, min: 1, max: 60, step: 1 },
  ],

  resultFields: [
    { name: 'remainingBalance', label: 'Estimated money left at the end', primary: true },
    { name: 'totalWithdrawn', label: 'Total money withdrawn' },
    { name: 'firstYearWithdrawal', label: 'Withdrawal in the first year' },
    { name: 'lastYearWithdrawal', label: 'Withdrawal in the final year' },
  ],
}
