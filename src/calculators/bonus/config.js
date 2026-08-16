export const config = {
  id: 'bonus',
  title: 'Bonus Calculator',
  shortDescription:
    'Estimate your gross bonus and a rough amount left after deductions.',
  category: 'Salary & Employment',

  fields: [
    { name: 'annualSalary', label: 'Annual salary used to calculate the bonus', unit: '₹', defaultValue: 600000, min: 0, max: 100000000, step: 5000 },
    { name: 'bonusPercent', label: 'Bonus percentage', unit: '%', defaultValue: 10, min: 0, max: 100, step: 0.5 },
    { name: 'estimatedDeductionPercent', label: 'Estimated tax/other deductions on the bonus', unit: '%', defaultValue: 20, min: 0, max: 100, step: 1 },
  ],

  resultFields: [
    { name: 'grossBonus', label: 'Gross bonus', primary: true },
    { name: 'estimatedDeductions', label: 'Estimated deductions' },
    { name: 'estimatedNetBonus', label: 'Estimated bonus after deductions' },
  ],
}
