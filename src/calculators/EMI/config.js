// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'emi',
  title: 'EMI Calculator',
  shortDescription:
    'Work out your monthly loan payment and total interest cost.',
  category: 'Loans',

  fields: [
    {
      name: 'loanAmount',
      label: 'Loan amount',
      unit: '₹',
      defaultValue: 1000000,
      min: 50000,
      max: 20000000,
      step: 10000,
    },
    {
      name: 'annualInterestRate',
      label: 'Annual interest rate',
      unit: '%',
      defaultValue: 9,
      min: 0,
      max: 25,
      step: 0.1,
    },
    {
      name: 'loanTenureYears',
      label: 'Loan tenure',
      unit: 'years',
      defaultValue: 5,
      min: 1,
      max: 30,
      step: 1,
    },
  ],

  resultFields: [
    { name: 'monthlyEMI', label: 'Monthly EMI', primary: true },
    { name: 'totalAmountPayable', label: 'Total amount payable' },
    { name: 'totalInterestPayable', label: 'Total interest payable' },
  ],
}