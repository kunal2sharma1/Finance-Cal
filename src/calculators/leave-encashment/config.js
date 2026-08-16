export const config = {
  id: 'leave-encashment',
  title: 'Leave Encashment Calculator',
  shortDescription:
    'Estimate the gross value of unused paid leave based on the salary amount and days you enter.',
  category: 'Salary & Employment',

  fields: [
    { name: 'monthlyBasicSalary', label: 'Monthly basic salary used for leave calculation', unit: '₹', defaultValue: 30000, min: 0, max: 10000000, step: 500 },
    { name: 'unusedLeaveDays', label: 'How many leave days could be encashed?', unit: 'days', defaultValue: 15, min: 0, max: 365, step: 1 },
    { name: 'workingDaysPerMonth', label: 'Number of paid working days used by your employer', unit: 'days', defaultValue: 26, min: 1, max: 31, step: 1 },
  ],

  resultFields: [
    { name: 'dailyRate', label: 'Daily salary rate used', primary: true },
    { name: 'grossLeaveEncashment', label: 'Estimated gross leave encashment' },
  ],
}
