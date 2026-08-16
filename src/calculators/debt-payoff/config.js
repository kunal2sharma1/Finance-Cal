export const config = {
  id: 'debt-payoff',
  title: 'Debt Payoff Calculator',
  shortDescription:
    'Estimate when you could become debt-free and how much interest you may pay along the way.',
  category: 'Loans & Debt',

  fields: [
    { name: 'totalDebt', label: 'How much debt do you have in total?', unit: '₹', defaultValue: 500000, min: 0, max: 100000000, step: 5000 },
    { name: 'averageAnnualRate', label: 'Average interest rate on the debt', unit: '%', defaultValue: 18, min: 0, max: 50, step: 0.1 },
    { name: 'monthlyPayment', label: 'How much can you pay toward the debt each month?', unit: '₹', defaultValue: 20000, min: 0, max: 5000000, step: 500 },
  ],

  resultFields: [
    { name: 'monthsToDebtFree', label: 'Estimated months until debt-free', primary: true },
    { name: 'yearsToDebtFree', label: 'Estimated years until debt-free' },
    { name: 'totalInterest', label: 'Estimated interest paid' },
    { name: 'totalPaid', label: 'Estimated total paid' },
  ],
}
