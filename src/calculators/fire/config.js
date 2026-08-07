// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'fire',
  title: 'FIRE Calculator',
  shortDescription:
    'Find out how much you need to achieve financial independence and retire early.',
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
      name: 'currentCorpus',
      label: 'Current investment corpus',
      unit: '₹',
      defaultValue: 1000000,
      min: 0,
      max: 1000000000,
      step: 10000,
    },
    {
      name: 'monthlyInvestment',
      label: 'Monthly investment',
      unit: '₹',
      defaultValue: 30000,
      min: 0,
      max: 10000000,
      step: 1000,
    },
    {
      name: 'annualExpenses',
      label: 'Current annual expenses',
      unit: '₹',
      defaultValue: 600000,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      name: 'expectedReturnRate',
      label: 'Expected annual return',
      unit: '%',
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 0.5,
    },
    {
      name: 'inflationRate',
      label: 'Expected inflation rate',
      unit: '%',
      defaultValue: 6,
      min: 0,
      max: 20,
      step: 0.5,
    },
    {
      name: 'withdrawalRate',
      label: 'Safe withdrawal rate',
      unit: '%',
      defaultValue: 4,
      min: 1,
      max: 10,
      step: 0.1,
    },
  ],

  resultFields: [
    {
      name: 'fireNumber',
      label: 'FIRE number',
      primary: true,
    },
    {
      name: 'estimatedFireAge',
      label: 'Estimated FIRE age',
      unit: 'years',
    },
    {
      name: 'yearsToFire',
      label: 'Years to financial independence',
      unit: 'years',
    },
    {
      name: 'futureAnnualExpenses',
      label: 'Annual expenses at FIRE',
    },
    {
      name: 'requiredMonthlyInvestment',
      label: 'Required monthly investment',
    },
  ],
}