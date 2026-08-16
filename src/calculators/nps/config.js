export const config = {
  id: 'nps',
  title: 'NPS Calculator',
  shortDescription:
    'Estimate how your NPS savings could grow and what your retirement payout could look like.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'currentAge', label: 'How old are you now?', unit: 'years', defaultValue: 30, min: 18, max: 70, step: 1 },
    { name: 'retirementAge', label: 'At what age do you want to use the money?', unit: 'years', defaultValue: 60, min: 18, max: 75, step: 1 },
    { name: 'currentCorpus', label: 'How much do you already have in NPS?', unit: '₹', defaultValue: 200000, min: 0, max: 100000000, step: 5000 },
    { name: 'monthlyContribution', label: 'How much will you add to NPS each month?', unit: '₹', defaultValue: 10000, min: 0, max: 1000000, step: 500 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 10, min: 0, max: 30, step: 0.5 },
    { name: 'annuityPercent', label: 'Share of the final NPS amount you plan to use for annuity/pension', unit: '%', defaultValue: 40, min: 20, max: 100, step: 1 },
    { name: 'annuityRate', label: 'Expected yearly annuity payout rate', unit: '%', defaultValue: 6, min: 0, max: 20, step: 0.1 },
  ],

  resultFields: [
    { name: 'projectedCorpus', label: 'Estimated NPS amount at retirement', primary: true },
    { name: 'totalContributions', label: 'Total money you add' },
    { name: 'estimatedGrowth', label: 'Estimated investment growth' },
    { name: 'estimatedLumpSum', label: 'Estimated lump-sum amount' },
    { name: 'annuityPurchaseAmount', label: 'Amount used for annuity' },
    { name: 'estimatedAnnualPension', label: 'Estimated yearly pension from the annuity' },
    { name: 'estimatedMonthlyPension', label: 'Estimated monthly pension from the annuity' },
  ],
}
