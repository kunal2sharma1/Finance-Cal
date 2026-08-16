export const config = {
  id: 'salary-take-home',
  title: 'Salary Take-Home Calculator',
  shortDescription:
    'Estimate how much of your salary you could receive in your bank account each month.',
  category: 'Salary & Employment',

  fields: [
    { name: 'annualGrossSalary', label: 'What is your yearly gross salary?', unit: '₹', defaultValue: 1200000, min: 0, max: 100000000, step: 10000 },
    { name: 'employeePFAnnual', label: 'Yearly employee PF contribution', unit: '₹', defaultValue: 86400, min: 0, max: 5000000, step: 1000 },
    { name: 'professionalTaxAnnual', label: 'Yearly professional tax', unit: '₹', defaultValue: 2400, min: 0, max: 100000, step: 100 },
    { name: 'otherDeductionsAnnual', label: 'Other yearly salary deductions', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 1000 },
    { name: 'annualTDS', label: 'Estimated yearly income tax / TDS', unit: '₹', defaultValue: 90000, min: 0, max: 10000000, step: 1000 },
  ],

  resultFields: [
    { name: 'estimatedMonthlyTakeHome', label: 'Estimated monthly take-home', primary: true },
    { name: 'estimatedAnnualTakeHome', label: 'Estimated yearly take-home' },
    { name: 'totalAnnualDeductions', label: 'Estimated yearly deductions' },
    { name: 'takeHomePercent', label: 'Share of gross salary you take home', unit: '%' },
  ],
}
