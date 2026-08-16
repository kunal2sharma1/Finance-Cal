export const config = {
  id: 'investment-return',
  title: 'Investment Return Calculator',
  shortDescription:
    'See how much your investment gained or lost and what percentage return that represents.',
  category: 'Investing',

  fields: [
    { name: 'amountInvested', label: 'How much money did you put in?', unit: '₹', defaultValue: 100000, min: 0, max: 100000000, step: 1000 },
    { name: 'currentValue', label: 'What is it worth now?', unit: '₹', defaultValue: 125000, min: 0, max: 100000000, step: 1000 },
    { name: 'yearsHeld', label: 'How many years did you hold it?', unit: 'years', defaultValue: 2, min: 0, max: 50, step: 1 },
  ],

  resultFields: [
    { name: 'gainOrLoss', label: 'Gain or loss', primary: true },
    { name: 'returnPercent', label: 'Total return', unit: '%' },
    { name: 'annualizedReturn', label: 'Average yearly return', unit: '%' },
  ],
}
