// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'swp',
  title: 'SWP Calculator',
  shortDescription: 'See how long a lump-sum corpus can fund regular monthly withdrawals.',
  category: 'Investing',

  fields: [
    {
      name: 'initialInvestment',
      label: 'Initial investment / starting corpus',
      unit: '₹',
      defaultValue: 5000000,
      min: 0,
      max: 100000000,
      step: 50000,
    },
    {
      name: 'monthlyWithdrawal',
      label: 'Monthly withdrawal',
      unit: '₹',
      defaultValue: 30000,
      min: 0,
      max: 1000000,
      step: 500,
    },
    {
      name: 'annualReturnRate',
      label: 'Expected annual return',
      unit: '%',
      defaultValue: 8,
      min: 0,
      max: 30,
      step: 0.5,
    },
    {
      name: 'years',
      label: 'Withdrawal period',
      unit: 'years',
      defaultValue: 20,
      min: 1,
      max: 40,
      step: 1,
    },
  ],

  // min is 0 (rather than following SIP's pattern of a small positive
  // floor) on initialInvestment, monthlyWithdrawal, and annualReturnRate
  // on purpose: this calculator is specifically required to handle a 0%
  // return, a ₹0 withdrawal, and a ₹0 starting corpus, so the UI itself
  // needs to be able to reach those values, not just formula.js.

  resultFields: [
    { name: 'remainingCorpus', label: 'Remaining corpus', primary: true },
    { name: 'totalWithdrawn', label: 'Total amount withdrawn' },
    { name: 'totalGrowth', label: 'Total growth / returns' },
  ],
}