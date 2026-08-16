export const config = {
  id: 'wedding-goal',
  title: 'Wedding Goal Calculator',
  shortDescription:
    'Estimate how much you may need to save each month for a future wedding budget.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'currentWeddingCost', label: 'What would the wedding cost today?', unit: '₹', defaultValue: 1000000, min: 0, max: 200000000, step: 10000 },
    { name: 'yearsToWedding', label: 'How many years until the wedding?', unit: 'years', defaultValue: 5, min: 1, max: 30, step: 1 },
    { name: 'costInflationRate', label: 'Expected yearly increase in wedding costs', unit: '%', defaultValue: 6, min: 0, max: 30, step: 0.5 },
    { name: 'currentSavings', label: 'How much have you already saved?', unit: '₹', defaultValue: 200000, min: 0, max: 200000000, step: 5000 },
    { name: 'investmentReturnRate', label: 'Expected yearly return on the savings/investment', unit: '%', defaultValue: 8, min: 0, max: 30, step: 0.5 },
  ],

  resultFields: [
    { name: 'futureWeddingCost', label: 'Estimated wedding cost at that time', primary: true },
    { name: 'futureValueOfCurrentSavings', label: 'What your current savings could become' },
    { name: 'requiredMonthlySaving', label: 'Estimated monthly saving needed' },
    { name: 'fundingGap', label: 'Amount still to build' },
  ],
}
