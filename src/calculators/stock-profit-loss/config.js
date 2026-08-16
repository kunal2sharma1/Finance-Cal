export const config = {
  id: 'stock-profit-loss',
  title: 'Stock Profit & Loss Calculator',
  shortDescription:
    'Estimate the profit or loss from buying and selling shares.',
  category: 'Investing & Markets',

  fields: [
    { name: 'buyPrice', label: 'What price did you buy at?', unit: '₹', defaultValue: 100, min: 0, max: 10000000, step: 0.01 },
    { name: 'sellPrice', label: 'What price do you sell at?', unit: '₹', defaultValue: 125, min: 0, max: 10000000, step: 0.01 },
    { name: 'quantity', label: 'How many shares?', unit: 'shares', defaultValue: 100, min: 0, max: 10000000, step: 1 },
    { name: 'totalCosts', label: 'Brokerage, taxes and other costs', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 1 },
  ],

  resultFields: [
    { name: 'grossProfitLoss', label: 'Gross profit or loss', primary: true },
    { name: 'netProfitLoss', label: 'Estimated profit or loss after costs' },
    { name: 'returnPercent', label: 'Estimated return', unit: '%' },
  ],
}
