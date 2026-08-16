export const config = {
  id: 'education',
  title: 'Education Cost Calculator',
  shortDescription: 'Estimate what your child’s education could cost later and how much you may need to save.',
  category: 'Planning',
  fields: [
    { name: 'childAge', label: 'How old is your child now?', unit: 'years', defaultValue: 5, min: 0, max: 25, step: 1 },
    { name: 'educationStartAge', label: 'How old will your child be when education starts?', unit: 'years', defaultValue: 18, min: 1, max: 30, step: 1 },
    { name: 'currentEducationCost', label: 'What would the education cost today?', unit: '₹', defaultValue: 1500000, min: 0, max: 100000000, step: 10000 },
    { name: 'educationDuration', label: 'How many years will the education last?', unit: 'years', defaultValue: 4, min: 1, max: 10, step: 1 },
    { name: 'educationInflationRate', label: 'How fast do you expect education costs to rise each year?', unit: '%', defaultValue: 8, min: 0, max: 20, step: 0.5 },
    { name: 'currentSavings', label: 'How much have you already saved for education?', unit: '₹', defaultValue: 500000, min: 0, max: 100000000, step: 10000 },
    { name: 'monthlyInvestment', label: 'How much are you investing each month now?', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
    { name: 'expectedReturnRate', label: 'Expected yearly return on your savings/investments', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
  ],
  resultFields: [
    { name: 'futureEducationCost', label: 'Estimated cost when education starts', primary: true },
    { name: 'totalEducationCorpus', label: 'Total amount you may need' },
    { name: 'futureSavings', label: 'What your current savings could become' },
    { name: 'futureInvestments', label: 'What your monthly investments could become' },
    { name: 'fundingShortfall', label: 'Amount you may still need' },
    { name: 'requiredMonthlyInvestment', label: 'Monthly investment that could close the gap' },
  ],
}
