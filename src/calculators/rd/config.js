// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'rd',
  title: 'RD Calculator',
  shortDescription: 'See what your monthly deposits could grow into by maturity.',
  category: 'Savings',

  fields: [
    {
      name: 'monthlyDeposit',
      label: 'Monthly deposit',
      unit: '₹',
      defaultValue: 5000,
      min: 100,
      max: 100000,
      step: 100,
    },
    {
      name: 'annualInterestRate',
      label: 'Annual interest rate',
      unit: '%',
      defaultValue: 7,
      min: 1,
      max: 12,
      step: 0.1,
    },
    {
      name: 'years',
      label: 'Investment tenure',
      unit: 'years',
      defaultValue: 5,
      min: 1,
      max: 10,
      step: 1,
    },
  ],

  resultFields: [
    { name: 'maturityAmount', label: 'Maturity amount', primary: true },
    { name: 'totalInvested', label: 'Total deposited' },
    { name: 'totalReturns', label: 'Interest earned' },
  ],
}