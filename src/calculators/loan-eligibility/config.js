// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.
//
// This calculator estimates eligibility using FOIR (Fixed Obligation to
// Income Ratio) — the share of monthly income a lender is willing to let
// go toward ALL debt repayments combined (existing + the new loan). FOIR
// is a lender-set assumption, not a fixed rule: different banks and
// NBFCs use different thresholds depending on income slab, loan type,
// and internal policy. The default and range below are a reasonable
// planning assumption, not a value that applies universally — see
// explanation.js for more, and the note on the maxFOIR field below.

export const config = {
  id: 'loan-eligibility',
  title: 'Loan Eligibility Calculator',
  shortDescription:
    'Estimate how much loan you may qualify for based on your income and existing obligations.',
  category: 'Loans',

  fields: [
    {
      name: 'monthlyIncome',
      label: 'Monthly net income',
      unit: '₹',
      defaultValue: 75000,
      // min is 0 (rather than a small positive floor) on purpose, same
      // reasoning as the SWP calculator's fields: a ₹0 income is one of
      // this calculator's explicit edge cases, so the UI itself needs to
      // be able to reach it, not just formula.js.
      min: 0,
      max: 2000000,
      step: 1000,
    },
    {
      name: 'existingEMI',
      label: 'Existing monthly EMI / debt obligations',
      unit: '₹',
      defaultValue: 0,
      min: 0,
      max: 1000000,
      step: 500,
    },
    {
      name: 'otherObligations',
      label: 'Other monthly fixed obligations',
      unit: '₹',
      // Optional in spirit — rent, alimony, or any other recurring
      // commitment that isn't a formal "EMI" but still eats into
      // repayment capacity. Defaults to 0 so it's a genuine no-op for
      // anyone who doesn't have any; the architecture here has no
      // separate on/off toggle for a field, so a 0-defaulted field is
      // what keeps this simple rather than adding one.
      defaultValue: 0,
      min: 0,
      max: 500000,
      step: 500,
    },
    {
      name: 'annualInterestRate',
      label: 'Annual interest rate',
      unit: '%',
      // Same default and range as the EMI calculator — this is the same
      // reducing-balance loan math, just solved in the other direction.
      defaultValue: 9,
      min: 0,
      max: 25,
      step: 0.1,
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
      name: 'maxFOIR',
      label: 'Maximum allowable FOIR (debt-to-income ratio)',
      unit: '%',
      // FOIR is the share of monthly income a lender allows toward ALL
      // debt repayments combined. 50% is a commonly used moderate
      // planning assumption for salaried borrowers, but real lenders
      // range roughly 30–65%+ depending on income slab, credit profile,
      // and internal policy — there is no single "correct" number here.
      // Keeping it as a user-adjustable input (instead of a constant
      // buried in formula.js) is what lets this default be revisited in
      // one place without touching any calculation logic.
      defaultValue: 50,
      min: 10,
      max: 90,
      step: 1,
    },
  ],

  resultFields: [
    { name: 'eligibleLoanAmount', label: 'Estimated maximum loan amount', primary: true },
    { name: 'maxAffordableEMI', label: 'Maximum affordable total EMI' },
    { name: 'totalExistingObligations', label: 'Existing monthly obligations' },
    { name: 'maxNewEMI', label: 'Maximum new EMI (repayment capacity)' },
    { name: 'totalRepayment', label: 'Estimated total repayment' },
    { name: 'totalInterest', label: 'Estimated total interest' },
    { name: 'emiToIncomeRatio', label: 'EMI-to-income ratio (%)' },
  ],
}