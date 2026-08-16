export const config = {
  id: 'roth-ira',
  title: 'Roth IRA Calculator',
  shortDescription: 'Estimate Roth IRA contribution room and projected value using the 2026 IRS contribution limits.',
  category: 'Retirement',
  countries: ['US'],
  currency: 'USD',
  fields: [
    { name: 'age', label: 'Current age', unit: 'years', defaultValue: 30, min: 18, max: 75, step: 1 },
    { name: 'filingStatus', label: 'Tax filing status', type: 'select', defaultValue: 'single', options: [
      { value: 'single', label: 'Single / Head of household' },
      { value: 'married', label: 'Married filing jointly' },
      { value: 'separate', label: 'Married filing separately' },
    ] },
    { name: 'magi', label: 'Modified adjusted gross income', unit: '$', defaultValue: 90000, min: 0, max: 10000000, step: 1000 },
    { name: 'contribution', label: 'Planned contribution', unit: '$', defaultValue: 7500, min: 0, max: 50000, step: 100 },
    { name: 'years', label: 'Years invested', unit: 'years', defaultValue: 25, min: 1, max: 60, step: 1 },
    { name: 'returnRate', label: 'Expected annual return', unit: '%', defaultValue: 7, min: -20, max: 30, step: 0.1 },
  ],
  resultFields: [
    { name: 'allowedContribution', label: 'Modeled contribution', primary: true, unit: '$' },
    { name: 'projectedValue', label: 'Projected value', unit: '$' },
    { name: 'contributionLimit', label: '2026 base contribution limit', unit: '$' },
    { name: 'eligibility', label: 'Income eligibility check', unit: '' },
  ],
}
