export const config = {
  id: 'savings-goal',
  title: 'Savings Goal Calculator',
  shortDescription:
    'Find out how much you may need to save each month to reach a target amount by a chosen date.',
  category: 'Planning',

  fields: [
    { name: 'targetAmount', label: 'How much money do you want to have?', unit: '₹', defaultValue: 1000000, min: 0, max: 100000000, step: 10000 },
    { name: 'currentSavings', label: 'How much have you already saved?', unit: '₹', defaultValue: 100000, min: 0, max: 100000000, step: 10000 },
    { name: 'years', label: 'How many years until you need the money?', unit: 'years', defaultValue: 5, min: 1, max: 40, step: 1 },
    { name: 'annualReturnRate', label: 'Expected yearly return on your savings/investments', unit: '%', defaultValue: 8, min: 0, max: 30, step: 0.5 },
  ],

  resultFields: [
    { name: 'requiredMonthlySaving', label: 'Estimated monthly amount to save', primary: true },
    { name: 'futureValueOfCurrentSavings', label: 'What your current savings could become' },
    { name: 'targetAmount', label: 'Target amount' },
    { name: 'totalNewContributions', label: 'Total new money you may add' },
    { name: 'estimatedGrowth', label: 'Estimated growth' },
  ],
}
