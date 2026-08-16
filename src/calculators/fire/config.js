export const config = {
  id: 'fire',
  title: 'Financial Independence Calculator',
  shortDescription: 'Estimate how much money you may need before your investments can support your lifestyle.',
  category: 'Retirement',
  fields: [
    { name: 'currentAge', label: 'How old are you now?', unit: 'years', defaultValue: 30, min: 18, max: 70, step: 1 },
    { name: 'currentCorpus', label: 'How much do you already have invested?', unit: '₹', defaultValue: 1000000, min: 0, max: 1000000000, step: 10000 },
    { name: 'monthlyInvestment', label: 'How much are you investing each month?', unit: '₹', defaultValue: 30000, min: 0, max: 10000000, step: 1000 },
    { name: 'annualExpenses', label: 'How much do you spend in a year?', unit: '₹', defaultValue: 600000, min: 0, max: 100000000, step: 10000 },
    { name: 'expectedReturnRate', label: 'Expected yearly return on your investments', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
    { name: 'inflationRate', label: 'Expected yearly increase in your expenses', unit: '%', defaultValue: 6, min: 0, max: 20, step: 0.5 },
    { name: 'withdrawalRate', label: 'How much of your investments would you withdraw each year?', unit: '%', defaultValue: 4, min: 1, max: 10, step: 0.1 },
  ],
  resultFields: [
    { name: 'fireNumber', label: 'Investment amount you may need for financial independence', primary: true },
    { name: 'estimatedFireAge', label: 'Estimated age when you could reach that amount', unit: 'years' },
    { name: 'yearsToFire', label: 'Estimated years until financial independence', unit: 'years' },
    { name: 'futureAnnualExpenses', label: 'Estimated yearly expenses at that point' },
    { name: 'requiredMonthlyInvestment', label: 'Estimated monthly investment needed' },
  ],
}
