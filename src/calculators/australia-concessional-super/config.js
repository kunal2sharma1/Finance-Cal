export const config = {
  id: 'australia-concessional-super',
  title: 'Australia Concessional Super Calculator',
  shortDescription: 'Estimate Australian concessional super contributions against the current annual cap.',
  category: 'Retirement',
  countries: ['AU'],
  currency: 'AUD',
  fields: [
    { name: 'employerContribution', label: 'Employer contributions', unit: 'A$', defaultValue: 10000, min: 0, max: 100000, step: 100 },
    { name: 'salarySacrifice', label: 'Salary sacrifice', unit: 'A$', defaultValue: 5000, min: 0, max: 100000, step: 100 },
    { name: 'personalDeductible', label: 'Personal deductible contributions', unit: 'A$', defaultValue: 2000, min: 0, max: 100000, step: 100 },
  ],
  resultFields: [
    { name: 'annualCap', label: 'Concessional contribution cap', primary: true, unit: 'A$' },
    { name: 'totalConcessional', label: 'Total concessional contributions', unit: 'A$' },
    { name: 'remainingCap', label: 'Remaining cap', unit: 'A$' },
    { name: 'overCap', label: 'Amount over cap', unit: 'A$' },
  ],
}
