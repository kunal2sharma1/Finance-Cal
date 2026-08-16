export const config = {
  id: 'dividend-income',
  title: 'Dividend Income Calculator',
  shortDescription:
    'Estimate how much dividend income your shares could generate.',
  category: 'Investing & Markets',

  fields: [
    { name: 'shares', label: 'How many shares do you own?', unit: 'shares', defaultValue: 500, min: 0, max: 100000000, step: 1 },
    { name: 'dividendPerShare', label: 'Dividend per share each year', unit: '₹', defaultValue: 5, min: 0, max: 100000, step: 0.01 },
  ],

  resultFields: [
    { name: 'annualDividend', label: 'Estimated yearly dividend income', primary: true },
    { name: 'monthlyEquivalent', label: 'Average monthly equivalent' },
  ],
}
