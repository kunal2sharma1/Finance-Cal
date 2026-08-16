export const config = {
  id: 'step-up-sip',
  title: 'Step-Up SIP Calculator',
  shortDescription:
    'See how increasing your monthly investment every year could change your final amount.',
  category: 'Investing',

  fields: [
    { name: 'monthlyInvestment', label: 'How much will you invest each month?', unit: '₹', defaultValue: 10000, min: 500, max: 500000, step: 500 },
    { name: 'annualStepUpPercent', label: 'How much will you increase the SIP each year?', unit: '%', defaultValue: 10, min: 0, max: 50, step: 0.5 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 12, min: 0, max: 30, step: 0.5 },
    { name: 'years', label: 'How many years will you invest?', unit: 'years', defaultValue: 15, min: 1, max: 40, step: 1 },
  ],

  resultFields: [
    { name: 'totalValue', label: 'What your investment could become', primary: true },
    { name: 'totalInvested', label: 'Total money you put in' },
    { name: 'totalReturns', label: 'Estimated growth' },
    { name: 'lastMonthlyInvestment', label: 'Monthly investment in the final year' },
  ],
}
