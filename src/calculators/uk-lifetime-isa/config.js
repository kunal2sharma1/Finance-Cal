export const config = {
  id: 'uk-lifetime-isa',
  title: 'Lifetime ISA Calculator',
  shortDescription: 'Estimate UK Lifetime ISA contributions, 25% government bonus and projected value under your assumptions.',
  category: 'Savings',
  countries: ['GB'],
  currency: 'GBP',
  fields: [
    { name: 'annualContribution', label: 'Annual contribution', unit: '£', defaultValue: 4000, min: 0, max: 4000, step: 100 },
    { name: 'years', label: 'Years of contributions', unit: 'years', defaultValue: 10, min: 1, max: 32, step: 1 },
    { name: 'returnRate', label: 'Expected annual return', unit: '%', defaultValue: 5, min: -20, max: 30, step: 0.1 },
  ],
  resultFields: [
    { name: 'annualLimit', label: 'Lifetime ISA annual limit', primary: true, unit: '£' },
    { name: 'annualBonus', label: 'Annual government bonus', unit: '£' },
    { name: 'totalContributions', label: 'Total contributions', unit: '£' },
    { name: 'totalBonus', label: 'Total government bonus', unit: '£' },
    { name: 'projectedValue', label: 'Illustrative projected value', unit: '£' },
  ],
}
