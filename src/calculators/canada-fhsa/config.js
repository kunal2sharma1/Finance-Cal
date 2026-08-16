export const config = {
  id: 'canada-fhsa',
  title: 'Canada FHSA Calculator',
  shortDescription: 'Estimate Canadian FHSA contribution room and projected value toward a first home using current limits.',
  category: 'Savings',
  countries: ['CA'],
  currency: 'CAD',
  fields: [
    { name: 'existingContributions', label: 'Existing lifetime FHSA contributions', unit: 'C$', defaultValue: 0, min: 0, max: 40000, step: 100 },
    { name: 'annualContribution', label: 'Planned annual contribution', unit: 'C$', defaultValue: 8000, min: 0, max: 8000, step: 100 },
    { name: 'years', label: 'Years of contributions', unit: 'years', defaultValue: 5, min: 1, max: 15, step: 1 },
    { name: 'returnRate', label: 'Expected annual return', unit: '%', defaultValue: 5, min: -20, max: 30, step: 0.1 },
  ],
  resultFields: [
    { name: 'annualLimit', label: 'Annual FHSA limit', primary: true, unit: 'C$' },
    { name: 'lifetimeLimit', label: 'Lifetime FHSA limit', unit: 'C$' },
    { name: 'plannedContributions', label: 'Planned contributions', unit: 'C$' },
    { name: 'remainingLifetimeRoom', label: 'Remaining lifetime room', unit: 'C$' },
    { name: 'projectedValue', label: 'Illustrative projected value', unit: 'C$' },
  ],
}
