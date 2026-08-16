export const config = {
  id: 'epf',
  title: 'EPF Calculator',
  shortDescription: 'Estimate how your EPF savings could grow until retirement.',
  category: 'Retirement',
  fields: [
    { name: 'currentAge', label: 'How old are you now?', unit: 'years', defaultValue: 30, min: 18, max: 70, step: 1 },
    { name: 'retirementAge', label: 'At what age do you plan to retire?', unit: 'years', defaultValue: 58, min: 40, max: 75, step: 1 },
    { name: 'monthlyBasicSalary', label: 'Monthly basic salary (from your payslip)', unit: '₹', defaultValue: 30000, min: 0, max: 10000000, step: 1000 },
    { name: 'currentEpfBalance', label: 'How much money is already in your EPF?', unit: '₹', defaultValue: 0, min: 0, max: 1000000000, step: 1000 },
    { name: 'annualSalaryGrowth', label: 'Expected yearly salary increase', unit: '%', defaultValue: 5, min: 0, max: 25, step: 0.5 },
    { name: 'interestRate', label: 'EPF interest rate', unit: '%', defaultValue: 8.25, min: 0, max: 20, step: 0.05 },
  ],
  resultFields: [
    { name: 'projectedCorpus', label: 'Estimated EPF balance at retirement', primary: true },
    { name: 'totalEmployeeContributions', label: 'Money you contribute' },
    { name: 'totalEmployerEpfContributions', label: 'Employer contribution added to EPF' },
    { name: 'totalInterestEarned', label: 'Estimated interest earned' },
  ],
}
