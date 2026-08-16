export const config = {
  id: 'uae-end-of-service',
  title: 'UAE End of Service Gratuity Calculator',
  shortDescription: 'Estimate UAE private-sector expatriate end-of-service gratuity from basic salary and completed service years.',
  category: 'Salary & Employment',
  countries: ['AE'],
  currency: 'AED',
  fields: [
    { name: 'basicSalary', label: 'Last basic monthly salary', unit: 'AED', defaultValue: 10000, min: 0, max: 1000000, step: 100 },
    { name: 'years', label: 'Completed years of service', unit: 'years', defaultValue: 5, min: 0, max: 50, step: 0.1 },
  ],
  resultFields: [
    { name: 'dailyBasicSalary', label: 'Daily basic salary', primary: false, unit: 'AED' },
    { name: 'gratuity', label: 'Estimated gratuity', primary: true, unit: 'AED' },
    { name: 'cap', label: 'Two-year wage cap', unit: 'AED' },
    { name: 'eligibility', label: 'Eligibility check', unit: '' },
  ],
}
