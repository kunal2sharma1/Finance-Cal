export const config = {
  id: 'mutual-fund-sip-return',
  title: 'Mutual Fund SIP Return Calculator',
  shortDescription:
    'Estimate how your regular mutual-fund investments could grow over time.',
  category: 'Investing & Markets',

  fields: [
    { name: 'monthlyInvestment', label: 'How much will you invest each month?', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 12, min: 0, max: 30, step: 0.5 },
    { name: 'years', label: 'How many years will you invest?', unit: 'years', defaultValue: 10, min: 1, max: 40, step: 1 },
  ],

  resultFields: [
    { name: 'futureValue', label: 'What your SIP could become', primary: true },
    { name: 'totalInvested', label: 'Total money you put in' },
    { name: 'estimatedGrowth', label: 'Estimated growth' },
  ],
}
