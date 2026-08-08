// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// This estimates loan eligibility by running the EMI calculator's own
// formula in reverse: instead of solving for the EMI a given loan would
// cost, it solves for the loan principal a given (affordable) EMI would
// support.

// Percentages are rounded to 2 decimal places rather than whole numbers,
// same convention as the CAGR calculator — a whole-percent ratio (e.g.
// "55%" instead of "54.67%") hides small differences that matter when
// comparing against a FOIR threshold.
function roundTo2(value) {
  return Math.round(value * 100) / 100
}

export function calculate(inputs) {
  const monthlyIncome = Number(inputs.monthlyIncome) || 0
  const existingEMI = Number(inputs.existingEMI) || 0
  const otherObligations = Number(inputs.otherObligations) || 0
  const annualInterestRate = Number(inputs.annualInterestRate) || 0
  const loanTenureYears = Number(inputs.loanTenureYears) || 0
  const maxFOIR = Number(inputs.maxFOIR) || 0

  // Validate before doing any arithmetic, same approach as the CAGR
  // calculator: every case that could otherwise lead to a NaN, an
  // Infinity, or a nonsensical negative result is ruled out here first.
  // Zero is deliberately NOT rejected for income or existing obligations
  // — a ₹0 income or a borrower with no existing EMI are legitimate,
  // expected inputs, not errors (see the zero-eligibility explanation
  // further down for how a ₹0 income is reported to the user instead).
  let message = null
  if (
    !Number.isFinite(monthlyIncome) ||
    !Number.isFinite(existingEMI) ||
    !Number.isFinite(otherObligations) ||
    !Number.isFinite(annualInterestRate) ||
    !Number.isFinite(loanTenureYears) ||
    !Number.isFinite(maxFOIR)
  ) {
    message = 'Please enter valid numbers for all fields.'
  } else if (
    monthlyIncome < 0 ||
    existingEMI < 0 ||
    otherObligations < 0 ||
    annualInterestRate < 0
  ) {
    message = 'Income, obligations, and interest rate cannot be negative.'
  } else if (loanTenureYears <= 0) {
    message = 'Loan tenure must be greater than zero.'
  } else if (maxFOIR <= 0) {
    message = 'Maximum allowable FOIR must be greater than zero.'
  }

  if (message) {
    // Safe, zeroed shape — same keys the valid branch returns, so the UI
    // never has to special-case a missing field.
    return {
      eligibleLoanAmount: 0,
      maxAffordableEMI: 0,
      totalExistingObligations: 0,
      maxNewEMI: 0,
      totalRepayment: 0,
      totalInterest: 0,
      emiToIncomeRatio: 0,
      loanTenureMonths: 0,
      isValid: false,
      isEligible: false,
      message,
    }
  }

  // FOIR is a percentage of income, so however it's entered, it can
  // never sensibly exceed 100 — clamped defensively here since the
  // number input can be typed past the slider's own range.
  const clampedFOIR = Math.min(maxFOIR, 100)

  const months = Math.round(loanTenureYears * 12)
  const monthlyRate = annualInterestRate / 12 / 100

  // Step 1: total EMI (existing + new) the selected FOIR allows.
  const maxAffordableEMI = monthlyIncome * (clampedFOIR / 100)

  // Step 2: what's already spoken for.
  const totalExistingObligations = existingEMI + otherObligations

  // Step 3: what's left for a new loan. Floored at 0 rather than left
  // negative — a borrower whose existing obligations already meet or
  // exceed the affordable ceiling has zero room for a new EMI, not a
  // negative one.
  const maxNewEMI = Math.max(maxAffordableEMI - totalExistingObligations, 0)

  // Step 4: solve the standard reducing-balance EMI formula for
  // principal instead of EMI — same formula and 0%-interest handling as
  // the EMI calculator, solved in the opposite direction:
  // EMI = P × r × (1+r)^n / ((1+r)^n − 1) → P = EMI × ((1+r)^n−1) / (r×(1+r)^n)
  //
  // eligibleLoanAmount and totalRepayment are resolved together, inside
  // the same guard, on purpose: an extreme manually-typed rate or tenure
  // (bypassing the slider's own bounds) can push Math.pow toward
  // Infinity, which would turn the solved principal into Infinity or
  // NaN. If that happens, both values fall back to 0 together rather
  // than leaving a stray, disconnected totalRepayment (e.g. a repayment
  // total with no matching principal) as the one broken UI value that
  // slipped through.
  let eligibleLoanAmount = 0
  let totalRepayment = 0
  if (months > 0 && maxNewEMI > 0) {
    let principal
    if (monthlyRate === 0) {
      principal = maxNewEMI * months
    } else {
      const factor = Math.pow(1 + monthlyRate, months)
      principal = (maxNewEMI * (factor - 1)) / (monthlyRate * factor)
    }

    if (Number.isFinite(principal) && principal > 0) {
      eligibleLoanAmount = principal
      totalRepayment = maxNewEMI * months
    }
  }

  const totalInterest = Math.max(totalRepayment - eligibleLoanAmount, 0)

  const emiToIncomeRatio =
    monthlyIncome > 0
      ? roundTo2(((totalExistingObligations + maxNewEMI) / monthlyIncome) * 100)
      : 0

  const isEligible = eligibleLoanAmount > 0

  // If nothing is eligible, say why. The checks below cover every way
  // this calculator can legitimately land on ₹0, from most to least
  // specific.
  let zeroMessage = null
  if (!isEligible) {
    if (monthlyIncome === 0) {
      zeroMessage =
        'Monthly income is ₹0, so no affordable EMI or loan amount can be calculated.'
    } else if (maxAffordableEMI <= totalExistingObligations) {
      zeroMessage =
        'Existing EMI and other obligations already use up all (or more than) the maximum EMI allowed at the selected FOIR, leaving no room for a new loan.'
    } else if (months <= 0) {
      zeroMessage = 'Loan tenure is too short to calculate a meaningful loan amount.'
    } else {
      zeroMessage = 'No loan amount is eligible with the current inputs.'
    }
  }

  return {
    eligibleLoanAmount: Math.round(eligibleLoanAmount),
    maxAffordableEMI: Math.round(maxAffordableEMI),
    totalExistingObligations: Math.round(totalExistingObligations),
    maxNewEMI: Math.round(maxNewEMI),
    totalRepayment: Math.round(totalRepayment),
    totalInterest: Math.round(totalInterest),
    emiToIncomeRatio,

    // Extra fields describing tenure and eligibility status, for
    // callers/tests (and any future results UI) to use. Left out of
    // config.js's resultFields on purpose: ResultPanel.jsx currency-
    // formats every resultField it's given, and a month count or a
    // boolean forced through an INR formatter would show up as a
    // broken-looking value (e.g. '₹240') — same reasoning the SWP
    // calculator uses for its own exhaustion-tracking fields.
    loanTenureMonths: months,
    isValid: true,
    isEligible,
    message: zeroMessage,
  }
}