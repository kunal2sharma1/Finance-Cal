export const config = {
  id: 'inflation',
  title: 'Inflation Calculator',
  shortDescription: 'See what money may cost in the future and what a future amount could be worth in today’s money.',
  category: 'Planning',
  fields: [
    { name: 'currentAmount', label: 'What does this cost today?', unit: '₹', defaultValue: 100000, min: 0, max: 10000000, step: 1000 },
    { name: 'futureAmount', label: 'What future amount do you want to compare?', unit: '₹', defaultValue: 100000, min: 0, max: 10000000, step: 1000 },
    { name: 'inflationRate', label: 'Expected yearly increase in prices', unit: '%', defaultValue: 6, min: 0, max: 100, step: 0.5 },
    { name: 'years', label: 'How many years from now?', unit: 'years', defaultValue: 10, min: 1, max: 40, step: 1 },
  ],
  resultFields: [
    { name: 'futureCost', label: 'What today’s amount could cost later', primary: true },
    { name: 'totalIncrease', label: 'Extra money caused by rising prices' },
    { name: 'percentageIncrease', label: 'Estimated price increase', unit: '%' },
    { name: 'presentValue', label: 'What the future amount could be worth today' },
    { name: 'purchasingPowerLost', label: 'Estimated buying power lost' },
    { name: 'percentageReduction', label: 'Estimated buying-power reduction', unit: '%' },
  ],
}
