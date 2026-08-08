// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.

export const config = {
  id: 'home-loan',
  title: 'Home Loan Calculator',
  shortDescription:
    'Work out your home loan EMI, total interest, and how much prepayments could save you.',
  category: 'Loans',

  fields: [
    {
      name: 'loanAmount',
      label: 'Home loan amount',
      unit: '₹',
      defaultValue: 5000000,
      min: 500000,
      max: 50000000,
      step: 50000,
    },
    {
      name: 'annualInterestRate',
      label: 'Annual interest rate',
      unit: '%',
      defaultValue: 8.5,
      min: 0,
      max: 20,
      step: 0.05,
    },
    {
      name: 'loanTenureYears',
      label: 'Loan tenure',
      unit: 'years',
      defaultValue: 20,
      min: 1,
      max: 30,
      step: 1,
    },
    {
      name: 'monthlyPrepayment',
      label: 'Extra monthly prepayment',
      unit: '₹',
      defaultValue: 0,
      min: 0,
      max: 200000,
      step: 1000,
    },
    {
      name: 'annualPrepayment',
      label: 'Annual lump-sum prepayment',
      unit: '₹',
      defaultValue: 0,
      min: 0,
      max: 2000000,
      step: 5000,
    },
  ],

  // Every resultField is currency-formatted by the shared ResultPanel, so
  // all three have to stay plain ₹ amounts that are always well-defined —
  // including at the default (zero-prepayment) input state. Everything
  // else this calculator computes (revised tenure, time saved, remaining
  // principal, the two prepayment strategies, the amortization schedule)
  // isn't a bare currency figure or isn't always defined the same way
  // regardless of strategy, so it's returned on the result object for any
  // future UI or for tests, without being wired into resultFields — the
  // same approach the SWP calculator uses for its own non-currency extras.
  resultFields: [
    { name: 'monthlyEMI', label: 'Monthly EMI', primary: true },
    { name: 'totalInterestPayable', label: 'Total interest payable' },
    { name: 'interestSaved', label: 'Interest saved via prepayment' },
  ],
}

// Calculation assumptions and safety limits — kept here, out of formula.js,
// per the brief for this calculator. See explanation.js for the
// user-facing version of the prepayment-timing assumptions below.
export const assumptions = {
  // Months in a year, used to convert the years-based inputs into the
  // month-by-month loop formula.js runs internally.
  MONTHS_PER_YEAR: 12,

  // The annual lump-sum prepayment is applied once, at the END of every
  // 12th month from loan start (i.e. every loan anniversary — month 12,
  // 24, 36, ...), not on a calendar/financial-year boundary.
  ANNUAL_PREPAYMENT_INTERVAL_MONTHS: 12,

  // Strategy B ("keep tenure the same, reduce EMI") re-derives a fresh EMI
  // once a year, at the same loan-anniversary points as the annual
  // prepayment, from the outstanding balance and the remaining original
  // tenure at that point. Between anniversaries the EMI is constant.
  EMI_RECALC_INTERVAL_MONTHS: 12,

  // Absolute ceiling on how many months the amortization loop will ever
  // run, regardless of what tenure is typed into the input. This is a
  // safety backstop against an extreme/unrealistic input (well beyond the
  // 30-year slider max), not a realistic loan length.
  MAX_AMORTIZATION_MONTHS: 1200,
}