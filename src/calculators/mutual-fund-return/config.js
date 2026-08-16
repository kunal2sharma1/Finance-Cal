export const config = {
  id: 'mutual-fund-return',
  title: 'Mutual Fund Return Calculator',
  shortDescription:
    'See how much your mutual fund investment has gained or lost and estimate the annualized return.',
  category: 'Investing & Markets',

  fields: [
    { name: 'amountInvested', label: 'How much did you invest?', unit: '₹', defaultValue: 200000, min: 0, max: 100000000, step: 1000 },
    { name: 'currentValue', label: 'What is it worth now?', unit: '₹', defaultValue: 250000, min: 0, max: 100000000, step: 1000 },
    { name: 'yearsHeld', label: 'How many years have you held it?', unit: 'years', defaultValue: 3, min: 0, max: 50, step: 1 },
  ],

  resultFields: [
    { name: 'gainOrLoss', label: 'Gain or loss', primary: true },
    { name: 'returnPercent', label: 'Total return', unit: '%' },
    { name: 'annualizedReturn', label: 'Average yearly return', unit: '%' },
  ],
}
