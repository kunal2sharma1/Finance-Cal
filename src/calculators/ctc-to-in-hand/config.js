export const config = {
  id: 'ctc-to-in-hand',
  title: 'CTC to In-Hand Salary Calculator',
  shortDescription:
    'Turn an annual CTC package into a rough monthly in-hand salary estimate.',
  category: 'Salary & Employment',

  fields: [
    { name: 'annualCTC', label: 'What is your annual CTC?', unit: '₹', defaultValue: 1200000, min: 0, max: 100000000, step: 10000 },
    { name: 'variablePayAnnual', label: 'Variable pay included in the CTC', unit: '₹', defaultValue: 0, min: 0, max: 50000000, step: 5000 },
    { name: 'employerPFAnnual', label: 'Employer PF included in the CTC', unit: '₹', defaultValue: 0, min: 0, max: 5000000, step: 1000 },
    { name: 'gratuityAnnual', label: 'Gratuity / retirement benefit included in the CTC', unit: '₹', defaultValue: 0, min: 0, max: 5000000, step: 1000 },
    { name: 'employeePFAnnual', label: 'Your yearly PF contribution deducted from salary', unit: '₹', defaultValue: 86400, min: 0, max: 5000000, step: 1000 },
    { name: 'annualTDS', label: 'Estimated yearly income tax / TDS', unit: '₹', defaultValue: 90000, min: 0, max: 10000000, step: 1000 },
    { name: 'otherDeductionsAnnual', label: 'Other yearly deductions', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 1000 },
  ],

  resultFields: [
    { name: 'estimatedMonthlyInHand', label: 'Estimated monthly in-hand salary', primary: true },
    { name: 'estimatedAnnualFixedCash', label: 'Estimated annual cash salary before employee deductions' },
    { name: 'totalExcludedFromCash', label: 'CTC components not paid as regular cash' },
    { name: 'estimatedAnnualInHand', label: 'Estimated yearly in-hand salary' },
  ],
}
