export const config = {
  id: 'salary-increment',
  title: 'Salary Increment Calculator',
  shortDescription:
    'Project how repeated yearly salary increases could change your earnings over time.',
  category: 'Salary & Employment',

  fields: [
    { name: 'startingSalary', label: 'Starting yearly salary', unit: '₹', defaultValue: 600000, min: 0, max: 100000000, step: 5000 },
    { name: 'annualIncrementPercent', label: 'Expected yearly increment', unit: '%', defaultValue: 8, min: 0, max: 50, step: 0.5 },
    { name: 'years', label: 'How many years do you want to project?', unit: 'years', defaultValue: 5, min: 1, max: 20, step: 1 },
  ],

  resultFields: [
    { name: 'finalAnnualSalary', label: 'Salary in the final year', primary: true },
    { name: 'totalIncrease', label: 'Increase from the starting salary' },
    { name: 'averageAnnualSalary', label: 'Average yearly salary over the period' },
  ],
}
