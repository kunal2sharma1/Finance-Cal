export const config = {
  id: 'personal-loan',
  title: 'Personal Loan Calculator',
  shortDescription: 'See your monthly personal-loan payment and the total interest you could pay.',
  category: 'Loans & Debt',

  fields: [
  { name: 'loanAmount', label: 'How much do you want to borrow?', unit: '₹', defaultValue: 500000, min: 0, max: 10000000, step: 5000 },
  { name: 'annualInterestRate', label: 'Interest rate on the loan', unit: '%', defaultValue: 12, min: 0, max: 30, step: 0.1 },
  { name: 'loanTenureYears', label: 'How many years will you take to repay it?', unit: 'years', defaultValue: 5, min: 1, max: 10, step: 1 },
],

  resultFields: [
  { name: 'monthlyEMI', label: 'Your monthly loan payment', primary: true },
  { name: 'totalInterest', label: 'Total interest you could pay' },
  { name: 'totalPayable', label: 'Total amount you could repay' },
],
}
