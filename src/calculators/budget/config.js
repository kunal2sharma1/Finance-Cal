export const config = {
  id: 'budget',
  title: 'Monthly Budget Calculator',
  shortDescription:
    'Build a simple monthly budget and see how much you have left after essential spending, lifestyle costs and debt.',
  category: 'Budgeting',

  fields: [
    { name: 'monthlyIncome', label: 'Monthly take-home income', unit: '₹', defaultValue: 75000, min: 0, max: 5000000, step: 1000 },
    { name: 'housing', label: 'Rent or home payment', unit: '₹', defaultValue: 20000, min: 0, max: 2000000, step: 500 },
    { name: 'food', label: 'Food and groceries', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
    { name: 'transport', label: 'Transport', unit: '₹', defaultValue: 5000, min: 0, max: 1000000, step: 500 },
    { name: 'utilities', label: 'Bills and utilities', unit: '₹', defaultValue: 4000, min: 0, max: 1000000, step: 500 },
    { name: 'debtPayments', label: 'Loan and credit-card payments', unit: '₹', defaultValue: 5000, min: 0, max: 5000000, step: 500 },
    { name: 'lifestyle', label: 'Shopping, entertainment and other lifestyle spending', unit: '₹', defaultValue: 5000, min: 0, max: 5000000, step: 500 },
    { name: 'plannedSavings', label: 'How much would you like to save or invest?', unit: '₹', defaultValue: 15000, min: 0, max: 5000000, step: 500 },
  ],

  resultFields: [
    { name: 'monthlyBalance', label: 'Money left after your budget', primary: true },
    { name: 'totalExpenses', label: 'Total monthly spending and debt' },
    { name: 'totalSavings', label: 'Planned monthly savings' },
    { name: 'savingsRate', label: 'Planned savings rate', unit: '%' },
  ],
}
