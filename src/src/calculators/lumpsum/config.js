// Config files describe WHAT a calculator looks like — its inputs and outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'lumpsum',
  title: 'Lumpsum Investment Calculator',
  shortDescription: 'See what a one-time investment could grow into.',
  category: 'Investing',

  fields: [
    {
      name: 'investmentAmount',
      label: 'Investment amount',
      unit: '₹',
      defaultValue: 100000,
      min: 1000,
      max: 50000000,
      step: 1000,
    },
    {
      name: 'annualReturnRate',
      label: 'Expected annual return',
      unit: '%',
      defaultValue: 8.5,
      min: 1,
      max: 30,
      step: 0.5,
    },
    {
      name: 'years',
      label: 'Investment period',
      unit: 'years',
      defaultValue: 10,
      min: 1,
      max: 40,
      step: 1,
    },
  ],

  resultFields: [
    { name: 'totalValue', label: 'Total value', primary: true },
    { name: 'totalInvested', label: 'Amount invested' },
    { name: 'totalReturns', label: 'Wealth gained' },
  ],
}
