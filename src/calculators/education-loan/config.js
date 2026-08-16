export const config = {
  id: 'education-loan',
  title: 'Education Loan Calculator',
  shortDescription:
    'Estimate the repayment amount and monthly payment for an education loan.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'courseCost', label: 'What is the total education cost?', unit: '₹', defaultValue: 2000000, min: 0, max: 200000000, step: 10000 },
    { name: 'ownContribution', label: 'How much will you pay yourself?', unit: '₹', defaultValue: 500000, min: 0, max: 200000000, step: 5000 },
    { name: 'annualInterestRate', label: 'Education-loan interest rate', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.1 },
    { name: 'moratoriumYears', label: 'How many years before regular repayment starts?', unit: 'years', defaultValue: 1, min: 0, max: 10, step: 0.5 },
    { name: 'repaymentYears', label: 'How many years will you repay the loan?', unit: 'years', defaultValue: 7, min: 1, max: 20, step: 1 },
  ],

  resultFields: [
    { name: 'loanAmount', label: 'Amount you may need to borrow', primary: true },
    { name: 'estimatedInterestDuringMoratorium', label: 'Illustrative interest during moratorium' },
    { name: 'monthlyEMI', label: 'Estimated monthly repayment after moratorium' },
    { name: 'totalRepayment', label: 'Estimated total repayment' },
  ],
}
