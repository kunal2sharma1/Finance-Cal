// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// TIMING CONVENTION: every monthly cash flow in this calculator — new
// monthly investments before retirement, and monthly withdrawals during
// retirement — is assumed to land at the START of the month, before that
// month's growth is applied (an "annuity due"). This mirrors the SIP
// calculator's future-value formula in this project (which includes the
// same "× (1 + i)" annuity-due adjustment) and the SWP calculator's
// explicit beginning-of-month convention, so all three calculators treat
// monthly cash flows the same way.
//
// RATE MODEL: "Expected pre-retirement annual return" grows the EXISTING
// corpus (a lumpsum) up to retirement. "Expected return on new monthly
// investments" is the return assumed on the NEW monthly contributions
// needed to close any shortfall. These are kept separate because many
// savers hold their existing corpus (e.g. EPF/PPF/existing funds) and any
// new SIPs in different instruments with different expected returns — if
// your situation doesn't distinguish between the two, enter the same
// value for both.

function safeNumber(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

// Converts an annual percentage input into a decimal rate, floored at
// -99%. This keeps (1 + rate) strictly positive no matter what gets typed
// into the number input (min/max on the field only constrain the slider,
// not manual typing — see CalculatorForm.jsx), which is what keeps every
// Math.pow(...) below from ever seeing a zero-or-negative base — the
// actual source of NaN/Infinity risk in compound-interest formulas.
function toRateDecimal(percent) {
  const rate = safeNumber(percent) / 100
  return Math.max(rate, -0.99)
}

// Future-value-of-annuity-due factor: what ₹1 invested at the start of
// every month for `months` months, earning `monthlyRate` a month, grows
// to. Same shape as the SIP calculator's formula, split out so it can be
// both used directly and inverted (solved for the payment instead of the
// future value).
function annuityDueFutureValueFactor(monthlyRate, months) {
  if (months <= 0) return 0
  if (monthlyRate === 0) return months
  return ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
}

// Present-value-of-annuity-due factor: what ₹1 withdrawn at the start of
// every month for `months` months, while the balance earns `monthlyRate`
// a month, is worth today.
function annuityDuePresentValueFactor(monthlyRate, months) {
  if (months <= 0) return 0
  if (monthlyRate === 0) return months
  return ((1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate) * (1 + monthlyRate)
}

export function calculate(inputs) {
  const currentAge = safeNumber(inputs.currentAge)
  const retirementAge = safeNumber(inputs.retirementAge)
  const lifeExpectancy = safeNumber(inputs.lifeExpectancy)
  const currentMonthlyExpenses = Math.max(safeNumber(inputs.currentMonthlyExpenses), 0)
  const existingCorpus = Math.max(safeNumber(inputs.existingCorpus), 0)
  const preRetirementReturn = safeNumber(inputs.preRetirementReturn)
  const postRetirementReturn = safeNumber(inputs.postRetirementReturn)
  const inflation = safeNumber(inputs.inflation)
  const newInvestmentReturn = safeNumber(inputs.newInvestmentReturn)

  const warnings = []

  // --- Edge case: current age at or past retirement age ---
  // No time remains to grow the existing corpus further or invest new
  // money before retirement, so the pre-retirement window is clamped to
  // zero months rather than allowed to go negative.
  const rawYearsToRetirement = retirementAge - currentAge
  if (rawYearsToRetirement <= 0) {
    warnings.push(
      'Retirement age is at or before current age, so there is no pre-retirement window left. Figures below reflect your position today, with no further pre-retirement growth or investing.'
    )
  }
  const yearsToRetirement = Math.max(rawYearsToRetirement, 0)
  const monthsToRetirement = Math.round(yearsToRetirement * 12)

  // --- Edge case: life expectancy at or before retirement age ---
  // A zero-or-negative retirement duration means there is no withdrawal
  // period to fund, so the required corpus collapses to ₹0 rather than
  // going negative or undefined.
  const rawRetirementDurationYears = lifeExpectancy - retirementAge
  if (rawRetirementDurationYears <= 0) {
    warnings.push(
      'Life expectancy is at or before retirement age, so no retirement duration is defined. Required corpus and sustainable income are shown as ₹0.'
    )
  }
  const retirementDurationYears = Math.max(rawRetirementDurationYears, 0)
  const retirementDurationMonths = Math.round(retirementDurationYears * 12)

  // --- Step 1: project today's monthly expenses forward to retirement ---
  const inflationRate = toRateDecimal(inflation)
  const monthlyExpensesAtRetirement =
    currentMonthlyExpenses * Math.pow(1 + inflationRate, yearsToRetirement)

  // --- Step 2: required retirement corpus (finite withdrawal period) ---
  // Withdrawals are assumed to rise with inflation every year of
  // retirement (to hold purchasing power) while the corpus keeps earning
  // the post-retirement return. Discounting a payment stream that grows
  // with inflation at the nominal post-retirement rate is mathematically
  // equivalent to discounting a LEVEL stream (in retirement-year-1 terms)
  // at the REAL rate of return, so a single real-rate annuity does the
  // job without an explicit year-by-year simulation.
  const postRetRate = toRateDecimal(postRetirementReturn)
  const realAnnualRate = (1 + postRetRate) / (1 + inflationRate) - 1
  const realMonthlyRate = realAnnualRate / 12

  const requiredCorpusFactor = annuityDuePresentValueFactor(
    realMonthlyRate,
    retirementDurationMonths
  )
  const requiredRetirementCorpus = Math.max(
    monthlyExpensesAtRetirement * requiredCorpusFactor,
    0
  )

  // --- Step 3: existing corpus grown to retirement ---
  const preRetRate = toRateDecimal(preRetirementReturn)
  const projectedExistingCorpus = existingCorpus * Math.pow(1 + preRetRate, yearsToRetirement)

  // --- Step 4: shortfall vs surplus ---
  // Kept as two separate non-negative fields (rather than one signed
  // number) because config.js's resultFields are always rendered, always
  // as INR currency, with a fixed label — there's no way to flip a label
  // between "shortfall" and "surplus" based on sign without touching
  // ResultPanel.jsx. Whichever of the two doesn't apply is simply 0, per
  // the brief: show the surplus instead of a negative shortfall.
  const netCorpusGap = requiredRetirementCorpus - projectedExistingCorpus
  const additionalCorpusRequired = Math.max(netCorpusGap, 0)
  const corpusSurplus = Math.max(-netCorpusGap, 0)

  // --- Step 5: required monthly investment to close the shortfall ---
  // Inverts the SIP calculator's own future-value formula, solved for the
  // monthly payment instead of the future value.
  const newInvRate = toRateDecimal(newInvestmentReturn)
  const monthlyNewInvRate = newInvRate / 12
  const investmentFactor = annuityDueFutureValueFactor(monthlyNewInvRate, monthsToRetirement)

  let requiredMonthlyInvestment = 0
  if (additionalCorpusRequired > 0) {
    if (investmentFactor > 0) {
      requiredMonthlyInvestment = additionalCorpusRequired / investmentFactor
    } else {
      // There's a shortfall but no months remain before retirement.
      warnings.push(
        'A shortfall exists but no time remains before retirement to close it through monthly investing. Consider a higher retirement age, a larger lump sum today, or higher expected returns.'
      )
    }
  }

  // --- Step 6: sustainable monthly income from the EXISTING trajectory ---
  // How much monthly (inflation-adjusted-going-forward) income the
  // existing corpus alone — grown to retirement, with no further
  // investment — could support over the retirement duration. Deliberately
  // uses the existing (not required) corpus: run against the required
  // corpus this would just reproduce monthlyExpensesAtRetirement, since
  // that corpus is defined as exactly enough to fund it.
  const sustainableMonthlyIncome =
    requiredCorpusFactor > 0 ? projectedExistingCorpus / requiredCorpusFactor : 0

  // Defensive backstop only: every rate feeding a Math.pow(...) above is
  // floored at -99% by toRateDecimal, and every exponent is a clamped,
  // non-negative, whole number of months, so none of the values below can
  // actually be NaN or Infinity today. round() still guards the boundary
  // in case that invariant is ever broken by a future edit.
  function round(value) {
    return Number.isFinite(value) ? Math.round(value) : 0
  }

  return {
    // These map 1:1 to config.js's resultFields — ResultPanel.jsx
    // currency-formats every one of them, so all eight have to be plain,
    // finite, non-negative rupee amounts.
    monthlyExpensesToday: round(currentMonthlyExpenses),
    monthlyExpensesAtRetirement: round(monthlyExpensesAtRetirement),
    requiredRetirementCorpus: round(requiredRetirementCorpus),
    projectedExistingCorpus: round(projectedExistingCorpus),
    additionalCorpusRequired: round(additionalCorpusRequired),
    corpusSurplus: round(corpusSurplus),
    requiredMonthlyInvestment: round(requiredMonthlyInvestment),
    sustainableMonthlyIncome: round(sustainableMonthlyIncome),

    // Extra fields, deliberately left out of config.js's resultFields —
    // same reasoning as the SWP calculator's corpusExhausted /
    // exhaustedInMonth / exhaustedInYears in this project. ResultPanel.jsx
    // currency-formats every resultField it's given, and a plain year
    // count or boolean forced through an INR formatter would show up as a
    // broken-looking value (e.g. '₹25'). Kept on the result object for
    // callers, tests, and any future results UI.
    yearsToRetirement: Math.round(yearsToRetirement * 10) / 10,
    retirementDurationYears: Math.round(retirementDurationYears * 10) / 10,
    hasShortfall: additionalCorpusRequired > 0,
    warnings,
  }
}