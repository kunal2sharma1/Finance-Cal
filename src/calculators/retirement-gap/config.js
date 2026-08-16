export const config = {
  id: 'retirement-gap',
  title: 'Retirement Gap Calculator',
  shortDescription:
    'See how much more you may need to save for retirement beyond your current plan.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'currentAge', label: 'How old are you now?', unit: 'years', defaultValue: 35, min: 18, max: 70, step: 1 },
    { name: 'retirementAge', label: 'At what age do you want to retire?', unit: 'years', defaultValue: 60, min: 35, max: 80, step: 1 },
    { name: 'currentCorpus', label: 'How much have you already saved for retirement?', unit: '₹', defaultValue: 1000000, min: 0, max: 1000000000, step: 10000 },
    { name: 'monthlyInvestment', label: 'How much are you investing each month now?', unit: '₹', defaultValue: 30000, min: 0, max: 5000000, step: 500 },
    { name: 'monthlyRetirementExpensesToday', label: 'How much would you need each month in today’s money?', unit: '₹', defaultValue: 50000, min: 0, max: 5000000, step: 500 },
    { name: 'inflationRate', label: 'Expected yearly increase in living costs', unit: '%', defaultValue: 6, min: 0, max: 20, step: 0.5 },
    { name: 'preRetirementReturn', label: 'Expected yearly return before retirement', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
    { name: 'withdrawalRate', label: 'Yearly withdrawal rate in retirement', unit: '%', defaultValue: 4, min: 1, max: 10, step: 0.1 },
  ],

  resultFields: [
    { name: 'requiredCorpus', label: 'Estimated savings needed at retirement', primary: true },
    { name: 'projectedCorpus', label: 'Projected savings at retirement' },
    { name: 'gap', label: 'Estimated retirement savings gap' },
    { name: 'requiredAdditionalMonthlyInvestment', label: 'Extra monthly investment that could close the gap' },
  ],
}
