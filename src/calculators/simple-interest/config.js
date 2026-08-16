export const config = {
  id: 'simple-interest',
  title: 'Simple Interest Calculator',
  shortDescription:
    'Calculate the interest earned when interest is based only on the original amount.',
  category: 'Savings & Investing',

  fields: [
    { name: 'principal', label: 'Starting amount', unit: '₹', defaultValue: 100000, min: 0, max: 100000000, step: 1000 },
    { name: 'annualRate', label: 'Annual interest rate', unit: '%', defaultValue: 8, min: 0, max: 100, step: 0.1 },
    { name: 'years', label: 'How many years?', unit: 'years', defaultValue: 5, min: 0, max: 50, step: 1 },
  ],

  resultFields: [
    { name: 'interest', label: 'Interest earned', primary: true },
    { name: 'maturityAmount', label: 'Total amount at the end' },
  ],
}
