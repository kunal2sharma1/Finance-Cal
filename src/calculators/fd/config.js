export const config = {
  id: 'fd',
  title: 'FD Calculator',
  shortDescription: 'See how much your fixed deposit could be worth when it matures.',
  category: 'Savings',
  fields: [
    { name: 'depositAmount', label: 'How much will you put in the FD?', unit: '₹', defaultValue: 100000, min: 1000, max: 5000000, step: 1000 },
    { name: 'annualInterestRate', label: 'Interest rate offered by the bank', unit: '%', defaultValue: 7, min: 0, max: 15, step: 0.1 },
    { name: 'tenureYears', label: 'How long will you keep the money there?', unit: 'years', defaultValue: 5, min: 1, max: 10, step: 1 },
  ],
  resultFields: [
    { name: 'maturityAmount', label: 'Money you could have at maturity', primary: true },
    { name: 'totalInvested', label: 'Amount you deposited' },
    { name: 'totalReturns', label: 'Interest you could earn' },
  ],
}
