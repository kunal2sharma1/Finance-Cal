export const config = {
  id: 'stock-cagr',
  title: 'Stock CAGR Calculator',
  shortDescription:
    'Find the average yearly growth of a stock between two prices.',
  category: 'Investing & Markets',

  fields: [
    { name: 'startingPrice', label: 'Stock price when you started', unit: '₹', defaultValue: 100, min: 0, max: 10000000, step: 0.01 },
    { name: 'endingPrice', label: 'Stock price now', unit: '₹', defaultValue: 180, min: 0, max: 10000000, step: 0.01 },
    { name: 'years', label: 'How many years between the two prices?', unit: 'years', defaultValue: 5, min: 1, max: 50, step: 1 },
  ],

  resultFields: [
    { name: 'cagr', label: 'Average yearly growth', unit: '%', primary: true },
    { name: 'totalGrowth', label: 'Total growth', unit: '%' },
    { name: 'priceChange', label: 'Change in price' },
  ],
}
