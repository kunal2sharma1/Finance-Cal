export const config = {
  id: 'down-payment',
  title: 'Down Payment Calculator',
  shortDescription:
    'Work out how much cash you may need upfront and how much you would need to finance.',
  category: 'Loans & Debt',

  fields: [
    { name: 'purchasePrice', label: 'What is the purchase price?', unit: '₹', defaultValue: 5000000, min: 0, max: 200000000, step: 10000 },
    { name: 'downPaymentPercent', label: 'What percentage do you want to pay upfront?', unit: '%', defaultValue: 20, min: 0, max: 100, step: 1 },
    { name: 'availableSavings', label: 'How much money do you currently have available?', unit: '₹', defaultValue: 1000000, min: 0, max: 200000000, step: 10000 },
    { name: 'otherUpfrontCosts', label: 'Other upfront costs such as fees or registration', unit: '₹', defaultValue: 200000, min: 0, max: 20000000, step: 5000 },
  ],

  resultFields: [
    { name: 'requiredDownPayment', label: 'Required down payment', primary: true },
    { name: 'totalCashNeeded', label: 'Total cash needed upfront' },
    { name: 'amountFinanced', label: 'Amount you may need to finance' },
    { name: 'cashGap', label: 'Extra cash you may still need' },
  ],
}
