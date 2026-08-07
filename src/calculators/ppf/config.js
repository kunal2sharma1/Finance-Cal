// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.
//
// PPF is a rule-based government scheme rather than a market-linked
// product, so the numbers below aren't arbitrary UI choices — each one
// reflects an actual PPF Scheme rule. They're kept here (not in
// formula.js) so the assumptions stay visible and easy to update if the
// government revises them.

export const config = {
  id: 'ppf',
  title: 'PPF Calculator',
  shortDescription: 'See what your Public Provident Fund could be worth at maturity.',
  category: 'Savings',

  fields: [
    {
      name: 'annualInvestment',
      label: 'Annual investment',
      unit: '₹',
      // Real PPF deposit limits: min ₹500, max ₹1,50,000 per financial
      // year. Default is the max, since that's the figure most people
      // model when planning around the Section 80C limit.
      defaultValue: 150000,
      min: 500,
      max: 150000,
      step: 500,
    },
    {
      name: 'annualInterestRate',
      label: 'Annual interest rate',
      unit: '%',
      // Government-declared PPF rate, reviewed quarterly. 7.1% has been
      // the rate since April 2020 (through Q2 FY2026-27). Min/max give a
      // slider range covering PPF's historical band, not a hard rule —
      // update the default whenever the government revises the rate.
      defaultValue: 7.1,
      min: 4,
      max: 12,
      step: 0.1,
    },
    {
      name: 'years',
      label: 'Investment period',
      unit: 'years',
      // Real PPF rule: mandatory 15-year minimum tenure, extendable only
      // in 5-year blocks after that (15, 20, 25, ...). min/step encode
      // that rule directly so the slider can't land on an invalid year.
      defaultValue: 15,
      min: 15,
      max: 40,
      step: 5,
    },
  ],

  resultFields: [
    { name: 'maturityAmount', label: 'Maturity amount', primary: true },
    { name: 'totalInvested', label: 'Total amount invested' },
    { name: 'totalReturns', label: 'Total interest earned' },
  ],
}