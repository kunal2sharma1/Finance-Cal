export const config = {
  id: 'auto-loan',
  title: 'Auto Loan Calculator',
  shortDescription: 'Estimate monthly auto loan payments, total interest and total repayment from price, down payment, rate and term.',
  category: 'Loans & Debt',
  fields: [
    { name: 'vehiclePrice', label: 'Vehicle price', unit: '₹', defaultValue: 1200000, min: 0, max: 100000000, step: 10000 },
    { name: 'downPayment', label: 'Down payment', unit: '₹', defaultValue: 200000, min: 0, max: 100000000, step: 10000 },
    { name: 'annualRate', label: 'Annual interest rate', unit: '%', defaultValue: 9, min: 0, max: 50, step: 0.1 },
    { name: 'years', label: 'Loan term', unit: 'years', defaultValue: 5, min: 1, max: 15, step: 1 },
  ],
  resultFields: [
    { name: 'loanAmount', label: 'Loan amount', primary: true, unit: '₹' },
    { name: 'monthlyPayment', label: 'Monthly payment', unit: '₹' },
    { name: 'totalInterest', label: 'Total interest', unit: '₹' },
    { name: 'totalRepayment', label: 'Total loan repayment', unit: '₹' },
  ],
}
