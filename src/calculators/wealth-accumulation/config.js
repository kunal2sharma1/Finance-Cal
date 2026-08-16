export const config = {
  id: 'wealth-accumulation',
  title: 'Wealth Accumulation Calculator',
  shortDescription:
    'See how starting savings and growing monthly investments could build wealth over time.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'startingAmount', label: 'How much do you already have invested?', unit: '₹', defaultValue: 500000, min: 0, max: 1000000000, step: 10000 },
    { name: 'monthlyInvestment', label: 'How much will you invest each month?', unit: '₹', defaultValue: 20000, min: 0, max: 5000000, step: 500 },
    { name: 'annualInvestmentIncrease', label: 'How much will you increase your monthly investment each year?', unit: '%', defaultValue: 10, min: 0, max: 50, step: 0.5 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
    { name: 'years', label: 'How many years will you invest?', unit: 'years', defaultValue: 20, min: 1, max: 50, step: 1 },
  ],

  resultFields: [
    { name: 'finalValue', label: 'Estimated wealth at the end', primary: true },
    { name: 'totalContributions', label: 'Total money you put in' },
    { name: 'estimatedGrowth', label: 'Estimated investment growth' },
    { name: 'finalMonthlyInvestment', label: 'Monthly investment in the final year' },
  ],
}
