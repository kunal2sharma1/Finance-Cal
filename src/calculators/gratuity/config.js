export const config = {
  id: 'gratuity',
  title: 'Gratuity Calculator',
  shortDescription:
    'Estimate the gratuity you could receive based on your eligible salary and years of service.',
  category: 'Salary & Employment',

  fields: [
    { name: 'lastDrawnBasicSalary', label: 'Last drawn monthly basic salary + eligible DA', unit: '₹', defaultValue: 50000, min: 0, max: 10000000, step: 500 },
    { name: 'yearsOfService', label: 'How many completed years have you worked?', unit: 'years', defaultValue: 5, min: 0, max: 50, step: 1 },
  ],

  resultFields: [
    { name: 'estimatedGratuity', label: 'Estimated gratuity', primary: true },
    { name: 'eligibleServiceYears', label: 'Service years used in the estimate' },
  ],
}
