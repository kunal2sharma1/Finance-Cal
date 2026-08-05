// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'sip',
  title: 'SIP Calculator',
  shortDescription: 'See what your monthly investment could grow into.',
  category: 'Investing',

  fields: [
    {
      name: 'monthlyInvestment',
      label: 'Monthly investment',
      unit: '₹',
      defaultValue: 10000,
      min: 500,
      max: 500000,
      step: 500,
    },
    {
      name: 'annualReturnRate',
      label: 'Expected annual return',
      unit: '%',
      defaultValue: 12,
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
