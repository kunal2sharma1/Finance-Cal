// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'epf',
  title: 'EPF Calculator',
  shortDescription:
    'See how your EPF savings could grow until retirement.',
  category: 'Retirement',

  fields: [
    {
      name: 'currentAge',
      label: 'Current age',
      unit: 'years',
      defaultValue: 30,
      min: 18,
      max: 70,
      step: 1,
    },
    {
      name: 'retirementAge',
      label: 'Retirement age',
      unit: 'years',
      defaultValue: 58,
      min: 40,
      max: 75,
      step: 1,
    },
    {
      name: 'monthlyBasicSalary',
      label: 'Monthly basic salary',
      unit: '₹',
      defaultValue: 30000,
      min: 0,
      max: 10000000,
      step: 1000,
    },
    {
      name: 'currentEpfBalance',
      label: 'Current EPF balance',
      unit: '₹',
      defaultValue: 0,
      min: 0,
      max: 1000000000,
      step: 1000,
    },
    {
      name: 'annualSalaryGrowth',
      label: 'Annual salary growth',
      unit: '%',
      defaultValue: 5,
      min: 0,
      max: 25,
      step: 0.5,
    },
    {
      name: 'interestRate',
      label: 'EPF interest rate',
      unit: '%',
      defaultValue: 8.25,
      min: 0,
      max: 20,
      step: 0.05,
    },
  ],

  resultFields: [
    {
      name: 'projectedCorpus',
      label: 'Projected EPF corpus',
      primary: true,
    },
    {
      name: 'totalEmployeeContributions',
      label: 'Employee contributions',
    },
    {
      name: 'totalEmployerEpfContributions',
      label: 'Employer EPF contributions',
    },
    {
      name: 'totalInterestEarned',
      label: 'Interest earned',
    },
  ],
}