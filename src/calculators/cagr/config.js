// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'cagr',
  title: 'CAGR Calculator',
  shortDescription:
    'Find the annual growth rate that took your investment from its starting value to where it is today.',
  category: 'Investing',

  fields: [
    {
      name: 'initialInvestment',
      label: 'Initial investment',
      unit: '₹',
      defaultValue: 100000,
      min: 1000,
      max: 100000000,
      step: 1000,
    },
    {
      name: 'finalValue',
      label: 'Final investment value',
      unit: '₹',
      defaultValue: 200000,
      min: 0,
      max: 100000000,
      step: 1000,
    },
    {
      name: 'years',
      label: 'Investment period',
      unit: 'years',
      defaultValue: 5,
      min: 1,
      max: 40,
      step: 1,
    },
  ],

  resultFields: [
    { name: 'cagr', label: 'CAGR (%)', primary: true },
    { name: 'absoluteGain', label: 'Absolute gain' },
    { name: 'totalGrowthPercentage', label: 'Total growth (%)' },
  ],
}