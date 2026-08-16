export const config = {
  id: 'canada-rrsp', title: 'Canada RRSP Contribution Room Calculator', shortDescription: 'Estimate basic RRSP contribution room from prior-year earned income and unused room.', category: 'Retirement', countries: ['CA'], currency: 'CAD',
  fields: [
    { name: 'priorYearIncome', label: 'Previous-year earned income', unit: 'C$', defaultValue: 80000, min: 0, max: 10000000, step: 1000 },
    { name: 'unusedRoom', label: 'Unused RRSP contribution room', unit: 'C$', defaultValue: 5000, min: 0, max: 500000, step: 100 },
    { name: 'pensionAdjustment', label: 'Pension adjustment', unit: 'C$', defaultValue: 0, min: 0, max: 500000, step: 100 },
    { name: 'currentContribution', label: 'Contributions already made', unit: 'C$', defaultValue: 5000, min: 0, max: 500000, step: 100 },
  ],
  resultFields: [
    { name: 'newRoom', label: 'Estimated new room', primary: true, unit: 'C$' },
    { name: 'availableRoom', label: 'Estimated total room before current contribution', unit: 'C$' },
    { name: 'remainingRoom', label: 'Estimated remaining room', unit: 'C$' },
    { name: 'annualCap', label: '2026 RRSP dollar limit', unit: 'C$' },
  ],
}
