export const config = {
  id: 'compound-interest',
  title: 'Compound Interest Calculator',
  shortDescription:
    'See how your money could grow when the interest itself also earns interest.',
  category: 'Savings & Investing',

  fields: [
    { name: 'principal', label: 'How much are you starting with?', unit: '₹', defaultValue: 100000, min: 0, max: 100000000, step: 1000 },
    { name: 'annualRate', label: 'Annual interest/return rate', unit: '%', defaultValue: 8, min: 0, max: 50, step: 0.1 },
    { name: 'years', label: 'How many years?', unit: 'years', defaultValue: 10, min: 1, max: 50, step: 1 },
    { name: 'compoundsPerYear', label: 'How many times is the interest added each year?', unit: 'times', defaultValue: 12, min: 1, max: 365, step: 1 },
    { name: 'monthlyContribution', label: 'Will you add money every month?', unit: '₹', defaultValue: 0, min: 0, max: 1000000, step: 500 },
  ],

  resultFields: [
    { name: 'futureValue', label: 'What your money could become', primary: true },
    { name: 'totalContributed', label: 'Total money you put in' },
    { name: 'totalGrowth', label: 'Interest/estimated growth' },
  ],
}
