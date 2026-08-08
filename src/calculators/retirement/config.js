// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'retirement',
  title: 'Retirement Calculator',
  shortDescription:
    'See how big a retirement corpus you need, and whether your current savings are on track to reach it.',
  category: 'Retirement Planning',

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
      defaultValue: 60,
      min: 35,
      max: 75,
      step: 1,
    },
    {
      name: 'lifeExpectancy',
      label: 'Life expectancy',
      unit: 'years',
      defaultValue: 85,
      min: 50,
      max: 100,
      step: 1,
    },
    {
      name: 'currentMonthlyExpenses',
      label: 'Current monthly expenses',
      unit: '₹',
      defaultValue: 50000,
      min: 0,
      max: 1000000,
      step: 1000,
    },
    {
      name: 'existingCorpus',
      label: 'Existing retirement savings',
      unit: '₹',
      defaultValue: 500000,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      name: 'preRetirementReturn',
      label: 'Expected pre-retirement annual return',
      unit: '%',
      defaultValue: 12,
      min: 0,
      max: 30,
      step: 0.5,
    },
    {
      name: 'postRetirementReturn',
      label: 'Expected post-retirement annual return',
      unit: '%',
      defaultValue: 7,
      min: 0,
      max: 30,
      step: 0.5,
    },
    {
      name: 'inflation',
      label: 'Expected annual inflation',
      unit: '%',
      defaultValue: 6,
      min: 0,
      max: 25,
      step: 0.5,
    },
    {
      name: 'newInvestmentReturn',
      label: 'Expected return on new monthly investments',
      unit: '%',
      defaultValue: 12,
      min: 0,
      max: 30,
      step: 0.5,
    },
  ],

  // min is 0 (rather than SIP's small-positive-floor pattern) on
  // currentMonthlyExpenses, existingCorpus, and every rate field on
  // purpose: this calculator is specifically required to handle ₹0
  // expenses, a ₹0 starting corpus, and 0% rates, so the UI itself needs
  // to be able to reach those values, not just formula.js. Same reasoning
  // as the SWP calculator's config.js in this project.

  resultFields: [
    {
      name: 'requiredRetirementCorpus',
      label: 'Required retirement corpus',
      primary: true,
    },
    { name: 'monthlyExpensesToday', label: 'Monthly expenses today' },
    {
      name: 'monthlyExpensesAtRetirement',
      label: 'Monthly expenses at retirement',
    },
    {
      name: 'projectedExistingCorpus',
      label: 'Existing corpus projected to retirement',
    },
    {
      name: 'additionalCorpusRequired',
      label: 'Additional corpus required',
    },
    { name: 'corpusSurplus', label: 'Corpus surplus (over target)' },
    {
      name: 'requiredMonthlyInvestment',
      label: 'Required monthly investment',
    },
    {
      name: 'sustainableMonthlyIncome',
      label: 'Est. monthly income on current trajectory',
    },
  ],
}