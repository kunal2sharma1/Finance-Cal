export const config = {
  id: 'debt-snowball',
  title: 'Debt Snowball Calculator',
  shortDescription:
    'See a payoff plan that focuses extra money on your smallest debt first.',
  category: 'Loans & Debt',

  fields: [
    {
      name: 'debts',
      type: 'textarea',
      label: 'Enter your debts',
      unit: '',
      defaultValue: 'Credit Card, 50000, 24, 3000\nPersonal Loan, 150000, 14, 5000\nCar Loan, 400000, 9, 10000',
      rows: 7,
      help: 'One per line: Name, balance, yearly interest rate, minimum monthly payment.',
    },
    { name: 'extraPayment', label: 'How much extra can you pay each month?', unit: '₹', defaultValue: 5000, min: 0, max: 1000000, step: 500 },
  ],

  resultFields: [
    { name: 'monthsToDebtFree', label: 'Estimated months until debt-free', primary: true },
    { name: 'yearsToDebtFree', label: 'Estimated years until debt-free' },
    { name: 'totalInterest', label: 'Estimated interest paid' },
    { name: 'totalPaid', label: 'Estimated total paid' },
  ],
}
