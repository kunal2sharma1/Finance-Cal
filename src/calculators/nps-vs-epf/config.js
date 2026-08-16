export const config = {
  id: 'nps-vs-epf',
  title: 'NPS vs EPF Calculator',
  shortDescription:
    'Compare how two retirement-saving paths could grow using your own assumptions.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'currentCorpus', label: 'Current retirement savings balance', unit: '₹', defaultValue: 200000, min: 0, max: 100000000, step: 5000 },
    { name: 'monthlyNPSContribution', label: 'Monthly NPS contribution', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
    { name: 'monthlyEPFContribution', label: 'Monthly EPF contribution', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
    { name: 'years', label: 'How many years will you keep contributing?', unit: 'years', defaultValue: 20, min: 1, max: 40, step: 1 },
    { name: 'npsReturnRate', label: 'Assumed yearly NPS return', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
    { name: 'epfReturnRate', label: 'Assumed yearly EPF interest rate', unit: '%', defaultValue: 8.25, min: 0, max: 20, step: 0.05 },
  ],

  resultFields: [
    { name: 'npsProjectedValue', label: 'Estimated NPS value', primary: true },
    { name: 'epfProjectedValue', label: 'Estimated EPF value' },
    { name: 'difference', label: 'Difference between the estimates' },
    { name: 'totalNPSContributions', label: 'Total NPS contributions' },
    { name: 'totalEPFContributions', label: 'Total EPF contributions' },
  ],
}
