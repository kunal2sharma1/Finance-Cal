export const config = {
  id: 'financial-independence-date',
  title: 'Financial Independence Date Calculator',
  shortDescription:
    'Estimate when your investments could become large enough to support your current lifestyle.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'currentAge', label: 'How old are you now?', unit: 'years', defaultValue: 30, min: 18, max: 70, step: 1 },
    { name: 'investedAssets', label: 'How much do you currently have invested?', unit: '₹', defaultValue: 2000000, min: 0, max: 1000000000, step: 10000 },
    { name: 'monthlyInvestment', label: 'How much do you invest each month?', unit: '₹', defaultValue: 30000, min: 0, max: 5000000, step: 500 },
    { name: 'monthlyExpenses', label: 'How much do you spend each month?', unit: '₹', defaultValue: 50000, min: 0, max: 5000000, step: 500 },
    { name: 'annualInvestmentReturn', label: 'Expected yearly investment return', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
    { name: 'annualInflation', label: 'Expected yearly increase in your expenses', unit: '%', defaultValue: 6, min: 0, max: 20, step: 0.5 },
    { name: 'withdrawalRate', label: 'Yearly withdrawal rate at financial independence', unit: '%', defaultValue: 4, min: 1, max: 10, step: 0.1 },
  ],

  resultFields: [
    { name: 'estimatedAge', label: 'Estimated financial independence age', primary: true },
    { name: 'estimatedYears', label: 'Estimated years until financial independence' },
    { name: 'targetCorpus', label: 'Estimated amount you may need' },
    { name: 'projectedCorpus', label: 'Projected investment amount at that time' },
  ],
}
