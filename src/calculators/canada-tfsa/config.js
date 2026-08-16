export const config = {
  id: 'canada-tfsa', title: 'Canada TFSA Contribution Calculator', shortDescription: 'Estimate your 2026 TFSA contribution room after annual additions, unused room and current-year contributions.', category: 'Savings', countries: ['CA'], currency: 'CAD',
  fields: [
    { name: 'unusedRoom', label: 'Unused contribution room from previous years', unit: 'C$', defaultValue: 5000, min: 0, max: 500000, step: 100 },
    { name: 'newResidentYears', label: 'Years of Canadian residency since age 18', unit: 'years', defaultValue: 10, min: 0, max: 30, step: 1 },
    { name: 'currentYearContribution', label: 'Contributions already made in 2026', unit: 'C$', defaultValue: 2000, min: 0, max: 100000, step: 100 },
    { name: 'plannedContribution', label: 'Planned additional contribution', unit: 'C$', defaultValue: 3000, min: 0, max: 100000, step: 100 },
  ],
  resultFields: [
    { name: 'annualLimit', label: '2026 annual TFSA limit', primary: true, unit: 'C$' },
    { name: 'availableRoom', label: 'Estimated room before new contribution', unit: 'C$' },
    { name: 'remainingRoom', label: 'Estimated remaining room after new contribution', unit: 'C$' },
    { name: 'warning', label: 'Contribution check', unit: '' },
  ],
}
