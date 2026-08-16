export const config = {
  id: 'loan-comparison',
  title: 'Loan Comparison Calculator',
  shortDescription:
    'Compare two loan offers side by side to see which one could cost less overall.',
  category: 'Loans & Debt',

  fields: [
    { name: 'loanAmount', label: 'Amount you want to borrow', unit: '₹', defaultValue: 1000000, min: 0, max: 100000000, step: 10000 },
    { name: 'rateA', label: 'Loan A interest rate', unit: '%', defaultValue: 9, min: 0, max: 30, step: 0.1 },
    { name: 'yearsA', label: 'Loan A repayment period', unit: 'years', defaultValue: 5, min: 1, max: 40, step: 1 },
    { name: 'feesA', label: 'Loan A fees', unit: '₹', defaultValue: 5000, min: 0, max: 1000000, step: 500 },
    { name: 'rateB', label: 'Loan B interest rate', unit: '%', defaultValue: 8.5, min: 0, max: 30, step: 0.1 },
    { name: 'yearsB', label: 'Loan B repayment period', unit: 'years', defaultValue: 5, min: 1, max: 40, step: 1 },
    { name: 'feesB', label: 'Loan B fees', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
  ],

  resultFields: [
    { name: 'loanATotalCost', label: 'Loan A total cost', primary: true },
    { name: 'loanBTotalCost', label: 'Loan B total cost' },
    { name: 'cheaperOption', label: 'Lower-cost option' },
    { name: 'costDifference', label: 'Difference in total cost' },
  ],
}
