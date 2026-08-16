export const config = {
  id: 'hsa',
  title: 'HSA Calculator',
  shortDescription: 'Estimate 2026 HSA contribution room and projected growth for self-only or family HDHP coverage.',
  category: 'Retirement',
  countries: ['US'],
  currency: 'USD',
  fields: [
    { name: 'coverage', label: 'Coverage type', type: 'select', defaultValue: 'self', options: [
      { value: 'self', label: 'Self-only' },
      { value: 'family', label: 'Family' },
    ] },
    { name: 'currentContribution', label: 'Already contributed this year', unit: '$', defaultValue: 0, min: 0, max: 10000, step: 50 },
    { name: 'additionalContribution', label: 'Planned additional contribution', unit: '$', defaultValue: 1000, min: 0, max: 10000, step: 50 },
    { name: 'years', label: 'Years of growth', unit: 'years', defaultValue: 10, min: 1, max: 50, step: 1 },
    { name: 'returnRate', label: 'Expected annual return', unit: '%', defaultValue: 6, min: -20, max: 30, step: 0.1 },
  ],
  resultFields: [
    { name: 'annualLimit', label: '2026 HSA contribution limit', primary: true, unit: '$' },
    { name: 'remainingRoom', label: 'Remaining contribution room', unit: '$' },
    { name: 'projectedValue', label: 'Projected value of additional contribution', unit: '$' },
    { name: 'hdhpDeductible', label: 'Minimum HDHP deductible', unit: '$' },
    { name: 'oopLimit', label: 'Maximum HDHP out-of-pocket limit', unit: '$' },
  ],
}
