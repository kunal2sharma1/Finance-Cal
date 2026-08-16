export const config = {
  id: 'capital-gains',
  title: 'Capital Gains Calculator',
  shortDescription:
    'Estimate the gain or loss from selling an investment after including buying and selling costs.',
  category: 'Investing & Markets',

  fields: [
    { name: 'purchaseValue', label: 'What did you pay for the investment?', unit: '₹', defaultValue: 500000, min: 0, max: 1000000000, step: 5000 },
    { name: 'saleValue', label: 'How much did you receive when you sold it?', unit: '₹', defaultValue: 700000, min: 0, max: 1000000000, step: 5000 },
    { name: 'purchaseCosts', label: 'Buying costs', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 500 },
    { name: 'saleCosts', label: 'Selling costs', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 500 },
  ],

  resultFields: [
    { name: 'netGain', label: 'Estimated capital gain or loss', primary: true },
    { name: 'grossGain', label: 'Gain before costs' },
    { name: 'totalCosts', label: 'Total buying and selling costs' },
  ],
}
