export const config = {
  id: 'emergency-fund',
  title: 'Emergency Fund Calculator',
  shortDescription:
    'Estimate how much cash you may want to keep aside for unexpected expenses or loss of income.',
  category: 'Planning',

  fields: [
    { name: 'monthlyEssentialExpenses', label: 'How much do your essential expenses cost each month?', unit: '₹', defaultValue: 30000, min: 0, max: 1000000, step: 500 },
    { name: 'monthsOfCover', label: 'How many months of expenses do you want covered?', unit: 'months', defaultValue: 6, min: 1, max: 24, step: 1 },
    { name: 'currentEmergencySavings', label: 'How much do you already have set aside?', unit: '₹', defaultValue: 100000, min: 0, max: 10000000, step: 1000 },
  ],

  resultFields: [
    { name: 'recommendedFund', label: 'Suggested emergency fund', primary: true },
    { name: 'currentSavings', label: 'Money already set aside' },
    { name: 'shortfall', label: 'Amount still to build' },
    { name: 'monthsCovered', label: 'Months currently covered', unit: 'months' },
  ],
}
