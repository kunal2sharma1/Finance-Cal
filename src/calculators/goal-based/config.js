// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.
//
// FREQUENCY FIELD: the shared CalculatorForm only renders a number+slider
// input (see components/CalculatorForm.jsx) — there's no dropdown/select
// field type in this app. `investmentFrequency` reuses that same
// number+slider control as a 2-position toggle (min 0, max 1, step 1) so
// this calculator stays self-contained and doesn't need any changes to
// shared components: 0 = Monthly, 1 = Annual.
//
// INFLATION FIELD: `expectedInflation` defaults to 0, which makes the
// optional inflation-aware mode a no-op unless the user deliberately
// raises it — see formula.js for how that keeps the core calculation
// reliable with no separate on/off switch required.

export const config = {
  id: 'goal-based',
  title: 'Goal-Based Investment Calculator',
  shortDescription:
    'Find out how much to invest regularly to reach a financial goal — a house, education, a wedding, or anything else.',
  category: 'Planning',

  fields: [
    {
      name: 'targetAmount',
      label: 'Target amount',
      unit: '₹',
      defaultValue: 1000000,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      name: 'currentSavings',
      label: 'Current savings / existing investment',
      unit: '₹',
      defaultValue: 0,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      name: 'years',
      label: 'Investment period',
      unit: 'years',
      defaultValue: 10,
      min: 1,
      max: 40,
      step: 1,
    },
    {
      name: 'annualReturnRate',
      label: 'Expected annual return',
      unit: '%',
      defaultValue: 12,
      min: 0,
      max: 30,
      step: 0.5,
    },
    {
      name: 'investmentFrequency',
      label: 'Investment frequency',
      unit: '0 = Monthly, 1 = Annual',
      defaultValue: 0,
      min: 0,
      max: 1,
      step: 1,
    },
    {
      name: 'expectedInflation',
      label: 'Expected inflation (optional — leave at 0 to ignore)',
      unit: '%',
      defaultValue: 0,
      min: 0,
      max: 15,
      step: 0.1,
    },
  ],

  resultFields: [
    { name: 'requiredInvestment', label: 'Required investment', primary: true },
    { name: 'requiredMonthlyInvestment', label: 'Required monthly investment' },
    { name: 'requiredAnnualInvestment', label: 'Required annual investment' },
    { name: 'targetAmountAtGoal', label: 'Target amount at goal' },
    { name: 'futureValueOfExistingSavings', label: 'Future value of existing savings' },
    { name: 'requiredAdditionalCorpus', label: 'Required additional corpus' },
    { name: 'totalContributions', label: 'Total new contributions' },
    { name: 'totalReturns', label: 'Estimated returns' },
    { name: 'projectedFinalValue', label: 'Projected final value' },
    { name: 'surplusOrShortfall', label: 'Surplus / shortfall' },
  ],
}