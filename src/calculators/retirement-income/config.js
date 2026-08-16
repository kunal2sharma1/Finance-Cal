export const config = {
  id: 'retirement-income',
  title: 'Retirement Income Calculator',
  shortDescription:
    'Estimate the monthly income your retirement savings could support under a chosen withdrawal plan.',
  category: 'Retirement & Wealth',

  fields: [
    { name: 'corpus', label: 'How much will you have saved for retirement?', unit: '₹', defaultValue: 10000000, min: 0, max: 1000000000, step: 50000 },
    { name: 'withdrawalRate', label: 'What percentage of your savings do you want to use each year?', unit: '%', defaultValue: 4, min: 0, max: 15, step: 0.1 },
    { name: 'annualReturnRate', label: 'Expected yearly return after retirement', unit: '%', defaultValue: 7, min: 0, max: 30, step: 0.5 },
    { name: 'inflationRate', label: 'Expected yearly increase in spending', unit: '%', defaultValue: 5, min: 0, max: 20, step: 0.5 },
  ],

  resultFields: [
    { name: 'firstYearAnnualIncome', label: 'Estimated income in the first year', primary: true },
    { name: 'firstYearMonthlyIncome', label: 'Estimated monthly income in the first year' },
    { name: 'corpusAfterFirstYear', label: 'Estimated balance after first-year income' },
    { name: 'secondYearMonthlyIncome', label: 'Illustrative monthly income in year 2' },
  ],
}
