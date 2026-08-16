export const config = {
  id: 'emi',
  title: 'EMI Calculator',
  shortDescription: 'Find your monthly loan payment and see how much interest you could pay.',
  category: 'Loans',
  fields: [
    { name: 'loanAmount', label: 'How much do you want to borrow?', unit: '₹', defaultValue: 1000000, min: 50000, max: 20000000, step: 10000 },
    { name: 'annualInterestRate', label: 'Interest rate on the loan', unit: '%', defaultValue: 9, min: 0, max: 25, step: 0.1 },
    { name: 'loanTenureYears', label: 'How many years will you repay the loan?', unit: 'years', defaultValue: 5, min: 1, max: 30, step: 1 },
  ],
  resultFields: [
    { name: 'monthlyEMI', label: 'Your monthly loan payment (EMI)', primary: true },
    { name: 'totalAmountPayable', label: 'Total amount you could pay' },
    { name: 'totalInterestPayable', label: 'Total interest you could pay' },
  ],
}
