export const config = {
  id: 'car-loan-vs-cash',
  title: 'Car Loan vs Cash Purchase Calculator',
  shortDescription:
    'Compare paying for a car upfront with financing it and keeping the remaining cash invested.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'carPrice', label: 'What is the car price?', unit: '₹', defaultValue: 1200000, min: 0, max: 100000000, step: 10000 },
    { name: 'downPayment', label: 'How much would you pay upfront if you finance?', unit: '₹', defaultValue: 300000, min: 0, max: 100000000, step: 5000 },
    { name: 'loanRate', label: 'Car-loan interest rate', unit: '%', defaultValue: 9, min: 0, max: 30, step: 0.1 },
    { name: 'loanYears', label: 'How many years would you repay the loan?', unit: 'years', defaultValue: 5, min: 1, max: 10, step: 1 },
    { name: 'cashReturnRate', label: 'Expected yearly return if the spare cash stays invested', unit: '%', defaultValue: 8, min: 0, max: 30, step: 0.5 },
    { name: 'comparisonYears', label: 'How long should we compare?', unit: 'years', defaultValue: 5, min: 1, max: 20, step: 1 },
  ],

  resultFields: [
    { name: 'cashPurchaseCost', label: 'Cash-purchase outflow', primary: true },
    { name: 'financeCost', label: 'Estimated finance outflow' },
    { name: 'estimatedInvestmentValue', label: 'Estimated value of cash kept invested' },
    { name: 'difference', label: 'Estimated difference' },
  ],
}
