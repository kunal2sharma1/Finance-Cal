export const config = {
  id: 'credit-card-interest',
  title: 'Credit Card Interest Calculator',
  shortDescription:
    'See how long credit-card debt could take to repay and how much interest it could cost.',
  category: 'Loans & Debt',

  fields: [
    { name: 'balance', label: 'How much do you currently owe?', unit: '₹', defaultValue: 100000, min: 0, max: 10000000, step: 1000 },
    { name: 'annualAPR', label: 'Annual credit-card interest rate (APR)', unit: '%', defaultValue: 36, min: 0, max: 100, step: 0.5 },
    { name: 'monthlyPayment', label: 'How much will you pay each month?', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
  ],

  resultFields: [
    { name: 'monthsToPayoff', label: 'Estimated months until the balance is paid off', primary: true },
    { name: 'yearsToPayoff', label: 'Estimated years until payoff' },
    { name: 'totalInterest', label: 'Estimated interest paid' },
    { name: 'totalPaid', label: 'Estimated total paid' },
  ],
}
