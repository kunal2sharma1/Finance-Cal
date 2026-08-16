export const config = {
  id: 'credit-card-emi',
  title: 'Credit Card EMI Calculator',
  shortDescription:
    'Estimate the monthly payment and total cost if a purchase or balance is converted into EMI.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'purchaseAmount', label: 'Amount you want to convert into EMI', unit: '₹', defaultValue: 100000, min: 0, max: 10000000, step: 1000 },
    { name: 'annualInterestRate', label: 'Interest rate on the EMI', unit: '%', defaultValue: 18, min: 0, max: 60, step: 0.5 },
    { name: 'tenureMonths', label: 'How many months will you repay?', unit: 'months', defaultValue: 12, min: 1, max: 60, step: 1 },
    { name: 'processingFee', label: 'Processing fee', unit: '₹', defaultValue: 999, min: 0, max: 100000, step: 10 },
  ],

  resultFields: [
    { name: 'monthlyEMI', label: 'Estimated monthly EMI', primary: true },
    { name: 'totalInterest', label: 'Estimated interest' },
    { name: 'totalCost', label: 'Estimated total cost including fee' },
  ],
}
