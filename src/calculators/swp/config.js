export const config = {
  id: 'swp',
  title: 'Regular Withdrawal Calculator',
  shortDescription: 'See how long a one-time investment could support your monthly withdrawals.',
  category: 'Investing',
  fields: [
    { name: 'initialInvestment', label: 'How much money do you have invested now?', unit: '₹', defaultValue: 5000000, min: 0, max: 100000000, step: 50000 },
    { name: 'monthlyWithdrawal', label: 'How much do you want to withdraw each month?', unit: '₹', defaultValue: 30000, min: 0, max: 1000000, step: 500 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 8, min: 0, max: 30, step: 0.5 },
    { name: 'years', label: 'How many years should the money last?', unit: 'years', defaultValue: 20, min: 1, max: 40, step: 1 },
  ],
  resultFields: [
    { name: 'remainingCorpus', label: 'Money left at the end', primary: true },
    { name: 'totalWithdrawn', label: 'Total money withdrawn' },
    { name: 'totalGrowth', label: 'Estimated investment growth' },
  ],
}
