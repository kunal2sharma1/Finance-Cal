export const config = {
  id: 'monthly-investment-required',
  title: 'Monthly Investment Required Calculator',
  shortDescription:
    'Work out the monthly amount you may need to invest to reach a future target.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'targetAmount', label: 'How much do you want to have in the future?', unit: '₹', defaultValue: 10000000, min: 0, max: 1000000000, step: 50000 },
    { name: 'currentInvestment', label: 'How much have you already invested?', unit: '₹', defaultValue: 1000000, min: 0, max: 1000000000, step: 10000 },
    { name: 'years', label: 'How many years do you have?', unit: 'years', defaultValue: 15, min: 1, max: 50, step: 1 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
  ],

  resultFields: [
    { name: 'requiredMonthlyInvestment', label: 'Estimated monthly investment needed', primary: true },
    { name: 'futureValueOfCurrentInvestment', label: 'What your current investment could become' },
    { name: 'additionalContributions', label: 'Total new money you would contribute' },
    { name: 'estimatedGrowth', label: 'Estimated growth' },
  ],
}
