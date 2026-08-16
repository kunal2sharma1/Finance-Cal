export const config = {
  id: 'debt-to-income',
  title: 'Debt-to-Income Ratio Calculator',
  shortDescription: 'Calculate your debt-to-income ratio from monthly income and debt payments to understand borrowing capacity.',
  category: 'Loans & Debt',
  fields: [
    { name: 'grossMonthlyIncome', label: 'Gross monthly income', unit: '₹', defaultValue: 100000, min: 0, max: 100000000, step: 1000 },
    { name: 'housingPayment', label: 'Housing payment', unit: '₹', defaultValue: 25000, min: 0, max: 100000000, step: 1000 },
    { name: 'otherDebtPayments', label: 'Other monthly debt payments', unit: '₹', defaultValue: 10000, min: 0, max: 100000000, step: 1000 },
  ],
  resultFields: [
    { name: 'dti', label: 'Debt-to-income ratio', primary: true, unit: '%' },
    { name: 'housingDti', label: 'Housing ratio', unit: '%' },
    { name: 'monthlyDebt', label: 'Total monthly debt payments', unit: '₹' },
  ],
}
