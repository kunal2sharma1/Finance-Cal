export const config = {
  id: 'loan-balance-transfer',
  title: 'Loan Balance Transfer Calculator',
  shortDescription:
    'See whether moving an existing loan to a lower-rate lender could save money after transfer costs.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'outstandingBalance', label: 'How much do you still owe?', unit: '₹', defaultValue: 3000000, min: 0, max: 200000000, step: 10000 },
    { name: 'currentRate', label: 'Current loan interest rate', unit: '%', defaultValue: 9.5, min: 0, max: 30, step: 0.1 },
    { name: 'remainingYears', label: 'How many years are left on the current loan?', unit: 'years', defaultValue: 15, min: 1, max: 40, step: 1 },
    { name: 'newRate', label: 'New lender interest rate', unit: '%', defaultValue: 8.5, min: 0, max: 30, step: 0.1 },
    { name: 'transferFees', label: 'Transfer, processing and other switching costs', unit: '₹', defaultValue: 25000, min: 0, max: 10000000, step: 500 },
  ],

  resultFields: [
    { name: 'currentInterest', label: 'Estimated interest if you stay', primary: true },
    { name: 'newInterest', label: 'Estimated interest with the new rate' },
    { name: 'estimatedSavings', label: 'Estimated net savings after fees' },
    { name: 'breakEvenMonths', label: 'Approximate months to recover the switching cost' },
  ],
}
