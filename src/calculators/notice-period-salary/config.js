export const config = {
  id: 'notice-period-salary',
  title: 'Notice Period Salary Calculator',
  shortDescription:
    'Estimate salary for the part of your notice period you serve or need to buy out.',
  category: 'Salary & Employment',

  fields: [
    { name: 'monthlyGrossSalary', label: 'Monthly gross salary', unit: '₹', defaultValue: 50000, min: 0, max: 10000000, step: 1000 },
    { name: 'noticeDays', label: 'Total notice period in days', unit: 'days', defaultValue: 30, min: 1, max: 180, step: 1 },
    { name: 'daysServed', label: 'How many notice days will you serve?', unit: 'days', defaultValue: 30, min: 0, max: 180, step: 1 },
    { name: 'buyoutMultiplier', label: 'Buyout is charged at what times the daily salary?', unit: 'x', defaultValue: 1, min: 0, max: 3, step: 0.1 },
  ],

  resultFields: [
    { name: 'dailySalary', label: 'Approximate daily salary', primary: true },
    { name: 'servedPeriodPay', label: 'Gross salary for days served' },
    { name: 'unservedDays', label: 'Notice days not served' },
    { name: 'estimatedBuyout', label: 'Estimated buyout amount' },
  ],
}
