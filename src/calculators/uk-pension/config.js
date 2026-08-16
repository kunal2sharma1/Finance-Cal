export const config = {
  id: 'uk-pension', title: 'UK Pension Allowance Calculator', shortDescription: 'Estimate how much of the 2026–27 UK pension annual allowance your contributions use.', category: 'Retirement', countries: ['GB'], currency: 'GBP',
  fields: [
    { name: 'personalContribution', label: 'Your pension contributions this tax year', unit: '£', defaultValue: 12000, min: 0, max: 1000000, step: 100 },
    { name: 'employerContribution', label: 'Employer contributions this tax year', unit: '£', defaultValue: 6000, min: 0, max: 1000000, step: 100 },
    { name: 'carryForward', label: 'Unused allowance carried forward', unit: '£', defaultValue: 0, min: 0, max: 180000, step: 100 },
    { name: 'adjustedIncome', label: 'Adjusted income', unit: '£', defaultValue: 90000, min: 0, max: 5000000, step: 1000 },
  ],
  resultFields: [
    { name: 'totalContributions', label: 'Total pension input', primary: true, unit: '£' },
    { name: 'availableAllowance', label: 'Modeled available allowance', unit: '£' },
    { name: 'remainingAllowance', label: 'Remaining allowance', unit: '£' },
    { name: 'warning', label: 'Allowance check', unit: '' },
  ],
}
