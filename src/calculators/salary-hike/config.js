export const config = {
  id: 'salary-hike',
  title: 'Salary Hike Calculator',
  shortDescription:
    'See what your salary becomes after a percentage or amount-based increase.',
  category: 'Salary & Employment',

  fields: [
    { name: 'currentAnnualSalary', label: 'What is your current yearly salary?', unit: '₹', defaultValue: 600000, min: 0, max: 100000000, step: 5000 },
    { name: 'hikePercent', label: 'What percentage hike are you getting?', unit: '%', defaultValue: 10, min: 0, max: 100, step: 0.5 },
  ],

  resultFields: [
    { name: 'newAnnualSalary', label: 'New yearly salary', primary: true },
    { name: 'annualIncrease', label: 'Yearly increase' },
    { name: 'monthlyIncrease', label: 'Approximate monthly increase' },
    { name: 'newMonthlySalary', label: 'New monthly salary before deductions' },
  ],
}
