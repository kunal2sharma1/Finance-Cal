export const config = {
  id: 'fi-progress',
  title: 'Financial Independence Progress Calculator',
  shortDescription:
    'See how close your current investments are to supporting your lifestyle without relying on salary income.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'investedAssets', label: 'How much do you currently have invested?', unit: '₹', defaultValue: 2000000, min: 0, max: 1000000000, step: 10000 },
    { name: 'annualExpenses', label: 'How much do you spend each year?', unit: '₹', defaultValue: 600000, min: 0, max: 100000000, step: 5000 },
    { name: 'withdrawalRate', label: 'Yearly withdrawal rate', unit: '%', defaultValue: 4, min: 1, max: 10, step: 0.1 },
  ],

  resultFields: [
    { name: 'targetCorpus', label: 'Estimated amount needed for financial independence', primary: true },
    { name: 'progressPercent', label: 'Progress toward financial independence', unit: '%' },
    { name: 'remainingGap', label: 'Amount still to build' },
  ],
}
