export const config = {
  id: 'dividend-yield',
  title: 'Dividend Yield Calculator',
  shortDescription:
    'See what percentage of a share price is represented by its annual dividend.',
  category: 'Investing & Markets',

  fields: [
    { name: 'sharePrice', label: 'Current share price', unit: '₹', defaultValue: 200, min: 0, max: 10000000, step: 0.01 },
    { name: 'annualDividendPerShare', label: 'Annual dividend per share', unit: '₹', defaultValue: 8, min: 0, max: 1000000, step: 0.01 },
  ],

  resultFields: [
    { name: 'dividendYield', label: 'Dividend yield', unit: '%', primary: true },
    { name: 'annualDividend', label: 'Annual dividend per share' },
  ],
}
