export const config = {
  id: 'retirement-age',
  title: 'Retirement Age Calculator',
  shortDescription:
    'Estimate when your savings could reach the amount you need to retire under your assumptions.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'currentAge', label: 'How old are you now?', unit: 'years', defaultValue: 30, min: 18, max: 70, step: 1 },
    { name: 'currentSavings', label: 'How much have you already invested for retirement?', unit: '₹', defaultValue: 500000, min: 0, max: 1000000000, step: 10000 },
    { name: 'monthlyInvestment', label: 'How much will you invest each month?', unit: '₹', defaultValue: 30000, min: 0, max: 5000000, step: 500 },
    { name: 'annualExpensesToday', label: 'How much do you spend in a year today?', unit: '₹', defaultValue: 600000, min: 0, max: 100000000, step: 5000 },
    { name: 'inflationRate', label: 'Expected yearly increase in your expenses', unit: '%', defaultValue: 6, min: 0, max: 20, step: 0.5 },
    { name: 'investmentReturnRate', label: 'Expected yearly investment return', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
    { name: 'withdrawalRate', label: 'Yearly withdrawal rate you plan to use', unit: '%', defaultValue: 4, min: 1, max: 10, step: 0.1 },
    { name: 'maxAge', label: 'Latest age to test', unit: 'years', defaultValue: 75, min: 40, max: 100, step: 1 },
  ],

  resultFields: [
    { name: 'estimatedRetirementAge', label: 'Estimated retirement age', primary: true },
    { name: 'requiredCorpusAtRetirement', label: 'Estimated savings needed then' },
    { name: 'projectedCorpus', label: 'Projected savings at that age' },
    { name: 'yearsFromNow', label: 'Years until the estimated retirement age' },
  ],
}
