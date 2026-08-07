// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'education',
  title: 'Education Cost Calculator',
  shortDescription:
    'Estimate future education costs and how much you may need to invest today.',
  category: 'Planning',

  fields: [
    {
      name: 'childAge',
      label: 'Child’s current age',
      unit: 'years',
      defaultValue: 5,
      min: 0,
      max: 25,
      step: 1,
    },
    {
      name: 'educationStartAge',
      label: 'Education start age',
      unit: 'years',
      defaultValue: 18,
      min: 1,
      max: 30,
      step: 1,
    },
    {
      name: 'currentEducationCost',
      label: 'Current education cost',
      unit: '₹',
      defaultValue: 1500000,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      name: 'educationDuration',
      label: 'Education duration',
      unit: 'years',
      defaultValue: 4,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      name: 'educationInflationRate',
      label: 'Education cost inflation',
      unit: '%',
      defaultValue: 8,
      min: 0,
      max: 20,
      step: 0.5,
    },
    {
      name: 'currentSavings',
      label: 'Current education savings',
      unit: '₹',
      defaultValue: 500000,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      name: 'monthlyInvestment',
      label: 'Current monthly investment',
      unit: '₹',
      defaultValue: 10000,
      min: 0,
      max: 1000000,
      step: 500,
    },
    {
      name: 'expectedReturnRate',
      label: 'Expected investment return',
      unit: '%',
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 0.5,
    },
  ],

  resultFields: [
    {
      name: 'futureEducationCost',
      label: 'Future education cost',
      primary: true,
    },
    {
      name: 'totalEducationCorpus',
      label: 'Total education corpus required',
    },
    {
      name: 'futureSavings',
      label: 'Future value of current savings',
    },
    {
      name: 'futureInvestments',
      label: 'Future value of monthly investments',
    },
    {
      name: 'fundingShortfall',
      label: 'Funding shortfall',
    },
    {
      name: 'requiredMonthlyInvestment',
      label: 'Required monthly investment',
    },
  ],
}