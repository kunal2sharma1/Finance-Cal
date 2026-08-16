export const config = {
  id: 'lumpsum',
  title: 'One-Time Investment Calculator',
  shortDescription: 'See what a single investment could grow into over time.',
  category: 'Investing',

  fields: [
    { name: 'principal', label: 'How much will you invest once?', unit: '₹', defaultValue: 100000, min: 1000, max: 10000000, step: 1000 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 12, min: 1, max: 30, step: 0.5 },
    { name: 'years', label: 'How many years will you keep it invested?', unit: 'years', defaultValue: 10, min: 1, max: 40, step: 1 },
  ],

  resultFields: [
    { name: 'totalValue', label: 'What your investment could become', primary: true },
    { name: 'totalInvested', label: 'Amount you put in' },
    { name: 'totalReturns', label: 'Estimated growth' },
  ],
}
