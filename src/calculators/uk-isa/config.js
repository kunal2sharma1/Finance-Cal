export const config = {
  id: 'uk-isa', title: 'UK ISA Calculator', shortDescription: 'Estimate your ISA allowance usage and remaining subscription room for the 2026–27 tax year.', category: 'Savings', countries: ['GB'], currency: 'GBP',
  fields: [
    { name: 'annualAllowanceUsed', label: 'ISA subscriptions already made this tax year', unit: '£', defaultValue: 5000, min: 0, max: 20000, step: 100 },
    { name: 'newContribution', label: 'Planned new ISA contribution', unit: '£', defaultValue: 5000, min: 0, max: 50000, step: 100 },
    { name: 'lifetimeContribution', label: 'Of planned amount going to a Lifetime ISA', unit: '£', defaultValue: 0, min: 0, max: 4000, step: 100 },
    { name: 'years', label: 'Years to project', unit: 'years', defaultValue: 10, min: 1, max: 50, step: 1 },
    { name: 'returnRate', label: 'Expected annual return', unit: '%', defaultValue: 6, min: -20, max: 30, step: 0.1 },
  ],
  resultFields: [
    { name: 'remainingAllowance', label: 'Remaining ISA allowance', primary: true, unit: '£' },
    { name: 'allowedNewContribution', label: 'Contribution within annual allowance', unit: '£' },
    { name: 'lifetimeBonus', label: 'Potential Lifetime ISA bonus', unit: '£' },
    { name: 'projectedValue', label: 'Projected value of new contribution', unit: '£' },
    { name: 'warning', label: 'Allowance check', unit: '' },
  ],
}
