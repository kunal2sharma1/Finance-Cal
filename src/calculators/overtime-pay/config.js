export const config = {
  id: 'overtime-pay',
  title: 'Overtime Pay Calculator',
  shortDescription:
    'Estimate what extra working hours could be worth using your hourly rate and overtime multiplier.',
  category: 'Salary & Employment',

  fields: [
    { name: 'monthlySalary', label: 'Monthly salary used for the calculation', unit: '₹', defaultValue: 50000, min: 0, max: 10000000, step: 1000 },
    { name: 'monthlyWorkHours', label: 'Normal paid working hours per month', unit: 'hours', defaultValue: 208, min: 1, max: 500, step: 1 },
    { name: 'overtimeHours', label: 'How many overtime hours?', unit: 'hours', defaultValue: 10, min: 0, max: 500, step: 1 },
    { name: 'overtimeMultiplier', label: 'Overtime pay multiplier', unit: 'x', defaultValue: 2, min: 1, max: 5, step: 0.1 },
  ],

  resultFields: [
    { name: 'hourlyRate', label: 'Normal hourly rate', primary: true },
    { name: 'overtimePay', label: 'Estimated overtime pay' },
    { name: 'effectiveOvertimeRate', label: 'Effective overtime rate per hour' },
  ],
}
