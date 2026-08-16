export const config = {
  id: 'sip',
  title: 'SIP Calculator',
  shortDescription: 'See how your monthly investment could grow over time.',
  category: 'Investing',

  fields: [
    { name: 'monthlyInvestment', label: 'How much will you invest each month?', unit: '₹', defaultValue: 10000, min: 500, max: 500000, step: 500 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 12, min: 1, max: 30, step: 0.5 },
    { name: 'years', label: 'How many years will you invest?', unit: 'years', defaultValue: 10, min: 1, max: 40, step: 1 },
  ],

  resultFields: [
    { name: 'totalValue', label: 'What your investment could become', primary: true },
    { name: 'totalInvested', label: 'Total money you put in' },
    { name: 'totalReturns', label: 'Estimated growth' },
  ],
}
