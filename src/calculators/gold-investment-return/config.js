export const config = {
  id: 'gold-investment-return',
  title: 'Gold Investment Return Calculator',
  shortDescription:
    'See how much your gold investment has gained or lost based on your purchase and current value.',
  category: 'Investing & Markets',

  fields: [
    { name: 'purchaseAmount', label: 'How much did you pay for the gold?', unit: '₹', defaultValue: 300000, min: 0, max: 100000000, step: 5000 },
    { name: 'currentValue', label: 'What is it worth now?', unit: '₹', defaultValue: 400000, min: 0, max: 100000000, step: 5000 },
    { name: 'yearsHeld', label: 'How many years have you held it?', unit: 'years', defaultValue: 5, min: 0, max: 50, step: 1 },
  ],

  resultFields: [
    { name: 'gainOrLoss', label: 'Gain or loss', primary: true },
    { name: 'returnPercent', label: 'Total return', unit: '%' },
    { name: 'annualizedReturn', label: 'Average yearly return', unit: '%' },
  ],
}
