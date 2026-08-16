export const config = {
  id: 'singapore-cpf', title: 'Singapore CPF Contribution Calculator', shortDescription: 'Estimate employee and employer CPF contributions using 2026 rates and the monthly ordinary wage ceiling.', category: 'Retirement', countries: ['SG'], currency: 'SGD',
  fields: [
    { name: 'age', label: 'Age', unit: 'years', defaultValue: 30, min: 16, max: 90, step: 1 },
    { name: 'monthlyWage', label: 'Monthly ordinary wage', unit: 'S$', defaultValue: 6000, min: 0, max: 100000, step: 100 },
  ],
  resultFields: [
    { name: 'employeeContribution', label: 'Employee CPF contribution', primary: true, unit: 'S$' },
    { name: 'employerContribution', label: 'Employer CPF contribution', unit: 'S$' },
    { name: 'totalContribution', label: 'Total CPF contribution', unit: 'S$' },
    { name: 'contributionRate', label: 'Total contribution rate', unit: '%' },
    { name: 'wageUsed', label: 'Monthly wage used for CPF', unit: 'S$' },
  ],
}
