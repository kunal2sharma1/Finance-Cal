export const config = {
  id: 'home-loan-affordability',
  title: 'Home Loan Affordability Calculator',
  shortDescription:
    'Estimate the home price you may be able to afford based on your income, existing loans and upfront cash.',
  category: 'Loans & Debt',

  fields: [
    { name: 'monthlyTakeHome', label: 'How much do you take home each month?', unit: '₹', defaultValue: 100000, min: 0, max: 5000000, step: 1000 },
    { name: 'existingEMI', label: 'How much do you already pay toward loans each month?', unit: '₹', defaultValue: 10000, min: 0, max: 2000000, step: 500 },
    { name: 'downPaymentSavings', label: 'How much cash can you use upfront?', unit: '₹', defaultValue: 1000000, min: 0, max: 100000000, step: 10000 },
    { name: 'affordableEMIPercent', label: 'What share of your take-home pay do you want all loan payments to stay within?', unit: '%', defaultValue: 40, min: 10, max: 70, step: 1 },
    { name: 'annualInterestRate', label: 'Expected home-loan interest rate', unit: '%', defaultValue: 8.5, min: 0, max: 20, step: 0.1 },
    { name: 'loanTenureYears', label: 'How many years would you repay the home loan?', unit: 'years', defaultValue: 20, min: 5, max: 40, step: 1 },
  ],

  resultFields: [
    { name: 'maximumNewEMI', label: 'Room available for the new home-loan payment', primary: true },
    { name: 'estimatedLoanAmount', label: 'Estimated affordable loan amount' },
    { name: 'estimatedHomePrice', label: 'Estimated affordable home price' },
    { name: 'upfrontCashUsed', label: 'Upfront cash assumed' },
  ],
}
