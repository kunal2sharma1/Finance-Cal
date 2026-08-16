export const config = {
  id: 'child-education-planning',
  title: 'Child Education Planning Calculator',
  shortDescription:
    'Estimate how much your child’s future education could cost and how much you may need to invest.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'childAge', label: 'How old is your child now?', unit: 'years', defaultValue: 5, min: 0, max: 25, step: 1 },
    { name: 'educationStartAge', label: 'At what age will education start?', unit: 'years', defaultValue: 18, min: 1, max: 30, step: 1 },
    { name: 'currentEducationCost', label: 'What would the education cost today?', unit: '₹', defaultValue: 1500000, min: 0, max: 200000000, step: 10000 },
    { name: 'educationInflationRate', label: 'Expected yearly increase in education costs', unit: '%', defaultValue: 8, min: 0, max: 30, step: 0.5 },
    { name: 'currentSavings', label: 'How much have you already saved?', unit: '₹', defaultValue: 300000, min: 0, max: 200000000, step: 5000 },
    { name: 'investmentReturnRate', label: 'Expected yearly return on savings/investments', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
  ],

  resultFields: [
    { name: 'yearsToGoal', label: 'Years until education begins', primary: true },
    { name: 'futureEducationCost', label: 'Estimated future education cost' },
    { name: 'futureCurrentSavings', label: 'What current savings could become' },
    { name: 'requiredMonthlyInvestment', label: 'Estimated monthly investment needed' },
    { name: 'shortfall', label: 'Estimated funding gap today' },
  ],
}
