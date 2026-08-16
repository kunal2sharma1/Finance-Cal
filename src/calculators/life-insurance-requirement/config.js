export const config = {
  id: 'life-insurance-requirement',
  title: 'Life Insurance Requirement Calculator',
  shortDescription:
    'Estimate how much life insurance your family may need to replace income and clear major obligations.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'annualFamilyExpenses', label: 'How much does your family need each year?', unit: '₹', defaultValue: 600000, min: 0, max: 100000000, step: 5000 },
    { name: 'yearsOfIncomeSupport', label: 'How many years of income support would your family need?', unit: 'years', defaultValue: 15, min: 1, max: 50, step: 1 },
    { name: 'outstandingDebt', label: 'What major debt would need to be cleared?', unit: '₹', defaultValue: 3000000, min: 0, max: 500000000, step: 10000 },
    { name: 'futureGoals', label: 'Money needed for future goals such as education', unit: '₹', defaultValue: 2000000, min: 0, max: 500000000, step: 10000 },
    { name: 'existingAssets', label: 'Savings/investments already available to your family', unit: '₹', defaultValue: 1000000, min: 0, max: 500000000, step: 10000 },
    { name: 'existingInsurance', label: 'Life insurance cover you already have', unit: '₹', defaultValue: 1000000, min: 0, max: 500000000, step: 10000 },
  ],

  resultFields: [
    { name: 'suggestedCover', label: 'Illustrative life-insurance need', primary: true },
    { name: 'existingCover', label: 'Existing life-insurance cover' },
    { name: 'additionalCoverNeeded', label: 'Additional cover you may need' },
  ],
}
