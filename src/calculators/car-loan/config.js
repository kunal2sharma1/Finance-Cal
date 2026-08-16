export const config = {
  id: 'car-loan',
  title: 'Car Loan Calculator',
  shortDescription: 'Estimate your car-loan payment and the overall amount you could spend on the car.',
  category: 'Loans & Debt',

  fields: [
  { name: 'carPrice', label: 'What is the car price?', unit: '₹', defaultValue: 1000000, min: 0, max: 100000000, step: 10000 },
  { name: 'downPayment', label: 'How much will you pay upfront?', unit: '₹', defaultValue: 200000, min: 0, max: 100000000, step: 5000 },
  { name: 'annualInterestRate', label: 'Interest rate on the car loan', unit: '%', defaultValue: 9, min: 0, max: 25, step: 0.1 },
  { name: 'loanTenureYears', label: 'How many years will you repay it?', unit: 'years', defaultValue: 5, min: 1, max: 10, step: 1 },
],

  resultFields: [
  { name: 'loanAmount', label: 'Amount you need to borrow', primary: true },
  { name: 'monthlyEMI', label: 'Your monthly car-loan payment' },
  { name: 'totalInterest', label: 'Total interest you could pay' },
  { name: 'totalOutflow', label: 'Upfront payment plus loan repayments' },
],
}
