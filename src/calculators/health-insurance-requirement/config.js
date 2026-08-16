export const config = {
  id: 'health-insurance-requirement',
  title: 'Health Insurance Requirement Calculator',
  shortDescription:
    'Estimate a reasonable health-insurance coverage range based on family size, expenses and existing cover.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'annualFamilyMedicalBudget', label: 'How much could your family need for major medical costs in a year?', unit: '₹', defaultValue: 500000, min: 0, max: 100000000, step: 5000 },
    { name: 'yearsOfProtection', label: 'How many years of protection should the cover be able to support?', unit: 'years', defaultValue: 2, min: 1, max: 10, step: 1 },
    { name: 'existingCover', label: 'How much health insurance cover do you already have?', unit: '₹', defaultValue: 500000, min: 0, max: 100000000, step: 5000 },
  ],

  resultFields: [
    { name: 'suggestedCover', label: 'Illustrative cover target', primary: true },
    { name: 'existingCover', label: 'Existing cover' },
    { name: 'coverageGap', label: 'Illustrative coverage gap' },
  ],
}
