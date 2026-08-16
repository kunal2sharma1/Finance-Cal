export const config = {
  id: 'cagr',
  title: 'Investment Growth Calculator',
  shortDescription: 'Find the average yearly growth between what you invested and what it is worth now.',
  category: 'Investing',
  fields: [
    { name: 'initialInvestment', label: 'How much did you invest at the start?', unit: '₹', defaultValue: 100000, min: 1000, max: 100000000, step: 1000 },
    { name: 'finalValue', label: 'How much is it worth now?', unit: '₹', defaultValue: 200000, min: 0, max: 100000000, step: 1000 },
    { name: 'years', label: 'How many years did you keep it invested?', unit: 'years', defaultValue: 5, min: 1, max: 40, step: 1 },
  ],
  resultFields: [
    { name: 'cagr', label: 'Average yearly growth', unit: '%', primary: true },
    { name: 'absoluteGain', label: 'Total increase in value' },
    { name: 'totalGrowthPercentage', label: 'Total growth', unit: '%' },
  ],
}
