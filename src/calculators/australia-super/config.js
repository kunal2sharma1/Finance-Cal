export const config = {
  id: 'australia-super',
  title: 'Australian Superannuation Calculator',
  shortDescription: 'Estimate employer super guarantee contributions, voluntary contributions and projected super balance using Australian assumptions.',
  category: 'Retirement',
  countries: ['AU'],
  currency: 'AUD',
  fields: [
    { name: 'salary', label: 'Annual ordinary-time earnings', unit: 'A$', defaultValue: 80000, min: 0, max: 5000000, step: 1000 },
    { name: 'employeeRate', label: 'Additional employee contribution', unit: '%', defaultValue: 0, min: 0, max: 50, step: 0.5 },
    { name: 'sgRate', label: 'Super guarantee rate', unit: '%', defaultValue: 12, min: 0, max: 20, step: 0.1 },
    { name: 'years', label: 'Years until retirement', unit: 'years', defaultValue: 30, min: 1, max: 60, step: 1 },
    { name: 'returnRate', label: 'Expected annual return', unit: '%', defaultValue: 7, min: -20, max: 30, step: 0.1 },
  ],
  resultFields: [
    { name: 'annualEmployer', label: 'Annual employer super contribution', primary: true, unit: 'A$' },
    { name: 'annualEmployee', label: 'Annual additional employee contribution', unit: 'A$' },
    { name: 'annualTotal', label: 'Annual total contribution', unit: 'A$' },
    { name: 'projectedBalance', label: 'Projected super balance', unit: 'A$' },
    { name: 'sgRateUsed', label: 'SG rate used', unit: '%' },
  ],
}
