// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'fd',
  title: 'FD Calculator',
  shortDescription: 'See what your fixed deposit will be worth at maturity.',
  category: 'Savings',

  fields: [
    {
      name: 'depositAmount',
      label: 'Deposit amount',
      unit: '₹',
      defaultValue: 100000,
      min: 1000,
      max: 5000000,
      step: 1000,
    },
    {
      name: 'annualInterestRate',
      label: 'Annual interest rate',
      unit: '%',
      defaultValue: 7,
      min: 0,
      max: 15,
      step: 0.1,
    },
    {
      name: 'tenureYears',
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
    { name: 'totalInvested', label: 'Total deposit' },
    { name: 'totalReturns', label: 'Interest earned' },
  ],
}