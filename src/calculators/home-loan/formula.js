// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// PREPAYMENT TIMING & ORDER ASSUMPTION (see explanation.js for the
// user-facing version): every month, that month's interest is calculated
// on the opening balance first, then the EMI's principal portion is
// applied, then any extra monthly prepayment, then — only in months 12,
// 24, 36, ... (each loan anniversary) — the annual lump-sum prepayment.
// Each of those is capped so the balance can never go negative, and the
// loop stops the moment the balance reaches ₹0. This mirrors how the EMI
// calculator in this project describes a normal instalment: interest
// first, then whatever's left reduces principal.
//
// TWO PREPAYMENT STRATEGIES are computed in full, since the shared
// CalculatorForm only renders numeric slider/number fields — there's no
// dropdown or radio component in this project to let someone pick a
// strategy in the UI without changing shared components. Rather than
// bolt on a non-numeric control, both outcomes are always calculated and
// returned on the result object (strategyA / strategyB below):
//   A. Keep EMI the same, reduce tenure — the EMI never changes; every
//      prepayment shortens the loan.
//   B. Keep tenure the same, reduce EMI — the EMI is recalculated once a
//      year (see EMI_RECALC_INTERVAL_MONTHS in config.js) from the
//      outstanding balance and remaining original tenure, similar to how
//      a lender typically only revises an EMI periodically rather than
//      every month.
// Strategy A is what drives the three headline resultFields, since it's
// the simpler, always-unambiguous story ("your EMI" stays one number);
// strategy B is fully computed alongside it for anyone reading the result
// object directly.

import { assumptions } from './config.js'

const {
  MONTHS_PER_YEAR,
  ANNUAL_PREPAYMENT_INTERVAL_MONTHS,
  EMI_RECALC_INTERVAL_MONTHS,
  MAX_AMORTIZATION_MONTHS,
} = assumptions

// Standard reducing-balance EMI formula, same shape as the EMI calculator
// elsewhere in this project: EMI = P × r × (1 + r)^n / ((1 + r)^n − 1),
// with 0% interest falling back to an even split across the months.
function computeEMI(principal, monthlyRate, months) {
  if (months <= 0 || principal <= 0) return 0
  if (monthlyRate === 0) return principal / months
  const factor = Math.pow(1 + monthlyRate, months)
  return (principal * monthlyRate * factor) / (factor - 1)
}

// Runs one full month-by-month amortization under a given strategy.
// Always finishes with a closing balance of ₹0 (or stops at
// totalMonths / MAX_AMORTIZATION_MONTHS, whichever comes first), and
// never lets a balance, EMI, or principal component go negative.
function runAmortization({
  loanAmount,
  monthlyRate,
  totalMonths,
  monthlyPrepayment,
  annualPrepayment,
  strategy,
  startingEMI,
  baselineTotalInterestPayable,
}) {
  const label =
    strategy === 'B'
      ? 'Keep tenure the same, reduce EMI'
      : 'Keep EMI the same, reduce tenure'

  if (totalMonths <= 0 || loanAmount <= 0) {
    // Degenerate loan (zero tenure or zero principal): nothing to
    // amortize. Reported as a safe, zeroed shape rather than letting a
    // downstream division or subtraction produce NaN/Infinity/negatives.
    return {
      label,
      initialEMI: Math.round(startingEMI),
      revisedEMI: null,
      finalEMI: Math.round(startingEMI),
      emiSchedule: [],
      revisedTenureMonths: 0,
      revisedTenureYears: 0,
      timeSavedMonths: 0,
      timeSavedYears: 0,
      totalInterestPayable: 0,
      totalAmountPayable: 0,
      interestSaved: 0,
      totalPrepaymentApplied: 0,
      remainingPrincipal: Math.round(loanAmount),
      schedule: [],
    }
  }

  const loopMonths = Math.min(totalMonths, MAX_AMORTIZATION_MONTHS)

  let balance = loanAmount
  // currentEMI is kept UNROUNDED for all arithmetic below. The standard
  // EMI formula is only exact — i.e. a zero-prepayment run only lands on
  // a closing balance of precisely ₹0 at precisely the original tenure —
  // when the full-precision value is used throughout; rounding it to the
  // nearest rupee first and then compounding that rounding over up to
  // MAX_AMORTIZATION_MONTHS iterations is what would otherwise leave a
  // small leftover balance (or a small phantom "interest saved") even
  // with no prepayment at all. Rounding only happens where a value is
  // actually reported, below.
  let currentEMI = startingEMI
  let totalInterest = 0
  let totalPrepaid = 0
  const schedule = []
  const emiSchedule = [{ fromMonth: 1, emi: Math.round(currentEMI) }]

  for (let month = 1; month <= loopMonths && balance > 0.5; month++) {
    // Strategy B only: re-derive the EMI at each loan anniversary, from
    // whatever balance is left and however many months remain of the
    // ORIGINAL tenure — never beyond it, so the loan still finishes at
    // (or before) the original tenure.
    if (
      strategy === 'B' &&
      month > 1 &&
      (month - 1) % EMI_RECALC_INTERVAL_MONTHS === 0
    ) {
      const remainingMonths = totalMonths - (month - 1)
      if (remainingMonths > 0) {
        const revisedEMI = computeEMI(balance, monthlyRate, remainingMonths)
        // Only counts as a "step" worth recording if it actually moves
        // the rupee amount someone would be told; the unrounded value is
        // still what's used going forward either way.
        if (Math.round(revisedEMI) !== Math.round(currentEMI)) {
          emiSchedule.push({ fromMonth: month, emi: Math.round(revisedEMI) })
        }
        currentEMI = revisedEMI
      }
    }

    const openingBalance = balance
    const interestComponent = openingBalance * monthlyRate

    // The EMI's principal portion can never exceed what's actually left —
    // this is what makes the final instalment of a loan smaller than a
    // regular EMI instead of pushing the balance negative.
    let principalComponent = currentEMI - interestComponent
    if (principalComponent < 0) principalComponent = 0
    if (principalComponent > openingBalance) principalComponent = openingBalance
    const afterEMI = openingBalance - principalComponent

    const appliedMonthlyPrepay = Math.min(monthlyPrepayment, afterEMI)
    const afterMonthlyPrepay = afterEMI - appliedMonthlyPrepay

    let appliedAnnualPrepay = 0
    if (
      annualPrepayment > 0 &&
      month % ANNUAL_PREPAYMENT_INTERVAL_MONTHS === 0
    ) {
      appliedAnnualPrepay = Math.min(annualPrepayment, afterMonthlyPrepay)
    }

    const closingBalance = Math.max(afterMonthlyPrepay - appliedAnnualPrepay, 0)
    const prepaymentThisMonth = appliedMonthlyPrepay + appliedAnnualPrepay

    schedule.push({
      month,
      openingBalance: Math.round(openingBalance),
      interest: Math.round(interestComponent),
      principal: Math.round(principalComponent),
      prepayment: Math.round(prepaymentThisMonth),
      closingBalance: Math.round(closingBalance),
      emi: Math.round(currentEMI),
    })

    totalInterest += interestComponent
    totalPrepaid += prepaymentThisMonth
    balance = closingBalance
  }

  const revisedTenureMonths = schedule.length
  const remainingPrincipal = Math.max(0, Math.round(balance))
  const totalInterestPayable = Math.round(totalInterest)
  // Every rupee of principal is eventually repaid exactly once, whether
  // through an EMI's principal portion or a prepayment — so total amount
  // paid is always just the interest paid plus the original loan amount,
  // once the balance has reached ₹0.
  const totalAmountPayable = Math.round(loanAmount) + totalInterestPayable
  const interestSaved = Math.max(
    0,
    baselineTotalInterestPayable - totalInterestPayable
  )

  const finalEMI = emiSchedule[emiSchedule.length - 1].emi
  const revisedEMI = emiSchedule.length > 1 ? emiSchedule[1].emi : null

  return {
    label,
    initialEMI: Math.round(startingEMI),
    revisedEMI,
    finalEMI,
    emiSchedule,
    revisedTenureMonths,
    revisedTenureYears: Math.round((revisedTenureMonths / 12) * 10) / 10,
    timeSavedMonths: Math.max(0, totalMonths - revisedTenureMonths),
    timeSavedYears:
      Math.round((Math.max(0, totalMonths - revisedTenureMonths) / 12) * 10) /
      10,
    totalInterestPayable,
    totalAmountPayable,
    interestSaved,
    totalPrepaymentApplied: Math.round(totalPrepaid),
    remainingPrincipal,
    schedule,
  }
}

export function calculate(inputs) {
  const loanAmount = Math.max(0, Number(inputs.loanAmount) || 0)
  const annualInterestRate = Math.max(0, Number(inputs.annualInterestRate) || 0)
  const loanTenureYears = Math.max(0, Number(inputs.loanTenureYears) || 0)
  const monthlyPrepayment = Math.max(0, Number(inputs.monthlyPrepayment) || 0)
  const annualPrepayment = Math.max(0, Number(inputs.annualPrepayment) || 0)

  const monthlyRate = annualInterestRate / 12 / 100
  const rawMonths = loanTenureYears * MONTHS_PER_YEAR
  // Rounded so a fractional tenure can never leave the amortization loop
  // with a fractional bound — same reasoning the SWP calculator uses for
  // its own month-based loop.
  const totalMonths = Math.min(Math.round(rawMonths), MAX_AMORTIZATION_MONTHS)

  // Baseline: exactly what the plain EMI calculator elsewhere in this
  // project would show for these same three inputs, with no prepayment.
  const rawEMI = computeEMI(loanAmount, monthlyRate, rawMonths)
  const monthlyEMI = Math.round(rawEMI)
  const baselineTotalAmountPayable =
    totalMonths > 0 ? Math.round(rawEMI * rawMonths) : 0
  const baselineTotalInterestPayable =
    totalMonths > 0
      ? Math.max(0, baselineTotalAmountPayable - Math.round(loanAmount))
      : 0

  const baseline = {
    monthlyEMI,
    totalAmountPayable: baselineTotalAmountPayable,
    totalInterestPayable: baselineTotalInterestPayable,
    tenureMonths: totalMonths,
    tenureYears: Math.round((totalMonths / 12) * 10) / 10,
  }

  const hasPrepayment = monthlyPrepayment > 0 || annualPrepayment > 0

  const sharedArgs = {
    loanAmount,
    monthlyRate,
    totalMonths,
    monthlyPrepayment,
    annualPrepayment,
    // Unrounded on purpose — see the comment on currentEMI inside
    // runAmortization for why.
    startingEMI: rawEMI,
    baselineTotalInterestPayable,
  }

  const strategyA = runAmortization({ ...sharedArgs, strategy: 'A' })
  const strategyB = runAmortization({ ...sharedArgs, strategy: 'B' })

  return {
    // Headline figures — these three map to config.js's resultFields and
    // are what ResultPanel actually renders, currency-formatted. All stay
    // valid ₹ numbers even with no prepayment entered, in which case
    // totalInterestPayable just equals the baseline and interestSaved is
    // honestly ₹0. Based on strategy A (see the note at the top of this
    // file for why).
    monthlyEMI,
    totalInterestPayable: strategyA.totalInterestPayable,
    interestSaved: strategyA.interestSaved,

    // A few more clean, always-defined ₹ figures, useful on their own but
    // not part of the 3-field resultFields limit.
    totalAmountPayable: strategyA.totalAmountPayable,
    remainingPrincipal: strategyA.remainingPrincipal,

    // The original loan with no prepayment at all — i.e. what a plain EMI
    // calculator would show for the same three base inputs.
    baseline,

    hasPrepayment,

    // Full detail for both prepayment strategies, including each one's
    // own month-by-month amortization schedule.
    strategyA,
    strategyB,

    // Convenience alias for strategyA.schedule, since that's the strategy
    // the headline figures above are based on.
    schedule: strategyA.schedule,
  }
}