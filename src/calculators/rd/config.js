export const config = {
  id: 'rd',
  title: 'RD Calculator',
  shortDescription: 'See how your regular monthly deposits could grow by the time your RD ends.',
  category: 'Savings',
  fields: [
    { name: 'monthlyDeposit', label: 'How much will you deposit each month?', unit: '₹', defaultValue: 5000, min: 100, max: 100000, step: 100 },
    { name: 'annualInterestRate', label: 'Interest rate offered by the bank', unit: '%', defaultValue: 7, min: 1, max: 12, step: 0.1 },
    { name: 'years', label: 'How long will you keep making deposits?', unit: 'years', defaultValue: 5, min: 1, max: 10, step: 1 },
  ],
  resultFields: [
    { name: 'maturityAmount', label: 'Money you could have at maturity', primary: true },
    { name: 'totalInvested', label: 'Total money you deposit' },
    { name: 'totalReturns', label: 'Interest you could earn' },
  ],
}
