// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.
//
// This calculator answers two related questions with one set of inputs:
// "what will today's money cost later?" (currentAmount -> futureCost) and
// "what is a future amount worth today?" (futureAmount -> presentValue).
// The existing form/result components render a single static field list
// and a single static result list with no conditional logic between them,
// so rather than a mode toggle that would leave a field's label wrong
// half the time, both directions are always computed from their own
// clearly-named input. See formula.js for how the two calculations share
// the same inflation-rate/years pair.

export const config = {
  id: 'inflation',
  title: 'Inflation Calculator',
  shortDescription:
    "See what today's money will be worth later, or what a future amount is worth today.",
  category: 'Planning',

  fields: [
    {
      name: 'currentAmount',
      label: 'Current amount',
      unit: '₹',
      defaultValue: 100000,
      min: 0,
      max: 10000000,
      step: 1000,
    },
    {
      name: 'futureAmount',
      label: 'Future amount',
      unit: '₹',
      defaultValue: 100000,
      min: 0,
      max: 10000000,
      step: 1000,
    },
    {
      name: 'inflationRate',
      label: 'Annual inflation rate',
      unit: '%',
      defaultValue: 6,
      min: 0,
      max: 100,
      step: 0.5,
    },
    {
      name: 'years',
      label: 'Number of years',
      unit: 'years',
      defaultValue: 10,
      min: 1,
      max: 40,
      step: 1,
    },
  ],

  resultFields: [
    { name: 'futureCost', label: 'Future cost of current amount', primary: true },
    { name: 'totalIncrease', label: 'Increase due to inflation' },
    { name: 'percentageIncrease', label: 'Percentage increase (%)' },
    { name: 'presentValue', label: "Today's value of future amount" },
    { name: 'purchasingPowerLost', label: 'Purchasing power lost' },
    { name: 'percentageReduction', label: 'Percentage reduction (%)' },
  ],
}