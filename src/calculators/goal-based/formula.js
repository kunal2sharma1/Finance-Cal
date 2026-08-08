// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// CONTRIBUTION TIMING ASSUMPTION: every periodic contribution (monthly or
// annual) is assumed to land at the BEGINNING of its period, so it earns a
// full period of growth before that period ends. This mirrors the SIP and
// PPF calculators in this project, whose future-value formulas both use
// the same "annuity due" shape (an extra ×(1 + rate) term) for exactly
// this reason — see their formula.js files. Reusing that convention here
// keeps every periodic-investment calculator in this project consistent
// with each other.
//
// GROWTH ASSUMPTION: existing savings and new contributions are assumed to
// earn the SAME expected annual return. Existing savings compound
// annually for the whole period (the same FV = P × (1 + r)^t formula the
// Lumpsum calculator uses); new contributions compound monthly or
// annually depending on the chosen frequency.
//
// INFLATION MODE: `expectedInflation` defaults to 0, which makes the
// inflation adjustment a true no-op (targetAmountAtGoal === the amount
// typed in). Set it above 0 to treat "Target amount" as today's cost of
// the goal and inflate it forward over the investment period — no
// separate on/off switch is needed because 0% already behaves as "off".

function toSafeNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

// Every monetary/time/rate input here must be zero or greater — a
// negative target amount or a negative number of years isn't a
// meaningful real-world input, so it's treated as 0 rather than allowed
// to flow into the maths, where a stray negative could flip a sign
// somewhere and produce a nonsensical result.
function clampNonNegative(value) {
  const n = toSafeNumber(value)
  return n < 0 ? 0 : n
}

// Final defensive pass applied only when building the value that actually
// reaches the UI. Guards against the (should-never-happen, but checked
// anyway) case where an extreme combination of inputs produces NaN or
// Infinity somewhere upstream — ResultPanel.jsx's own `value || 0` guard
// only catches falsy values, so a stray Infinity would otherwise render
// as a literal "₹∞". `allowNegative` is used only for the
// surplus/shortfall figure, which is meaningful in both directions; every
// other result is a monetary amount that should never go below 0.
function safeResult(value, { allowNegative = false } = {}) {
  const n = toSafeNumber(value)
  if (!allowNegative && n < 0) return 0
  const rounded = Math.round(n)
  // Normalizes rounded -0 (e.g. from a tiny floating-point residue like
  // -0.0000001) back to plain 0 — otherwise Intl.NumberFormat renders it
  // as the confusing "-₹0" instead of "₹0".
  return rounded === 0 ? 0 : rounded
}

export function calculate(inputs) {
  const targetAmountInput = clampNonNegative(inputs.targetAmount)
  const currentSavings = clampNonNegative(inputs.currentSavings)
  const years = clampNonNegative(inputs.years)
  const annualReturnRate = clampNonNegative(inputs.annualReturnRate) / 100
  const expectedInflationRate = clampNonNegative(inputs.expectedInflation) / 100

  // Frequency is stored as a single 0/1 number so it can reuse the same
  // number+slider input every other field in this app uses (see
  // config.js) instead of needing a dropdown the shared form doesn't
  // support: 0 selects Monthly, anything else in practice just means 1,
  // which selects Annual.
  const isAnnualFrequency = toSafeNumber(inputs.investmentFrequency) === 1

  // --- Step 1: inflate the goal itself (no-op at the 0% default). ---
  const targetAmountAtGoal =
    targetAmountInput * Math.pow(1 + expectedInflationRate, years)

  // --- Step 2: grow existing savings for the full period, using the same
  // annual-compounding lumpsum formula as this project's Lumpsum
  // calculator: FV = P × (1 + r)^t ---
  const futureValueOfExistingSavings =
    currentSavings * Math.pow(1 + annualReturnRate, years)

  // --- Step 3: whatever the goal still needs beyond what existing
  // savings alone will grow into. Floored at 0 — existing savings are
  // never treated as needing to "give back" a surplus, it just carries
  // forward into the projected final value and shows up as a surplus at
  // the end. ---
  const requiredAdditionalCorpus = Math.max(
    targetAmountAtGoal - futureValueOfExistingSavings,
    0
  )

  // --- Step 4: reverse-solve the periodic contribution that grows, via
  // the annuity-due formula, into exactly requiredAdditionalCorpus. Both
  // the monthly and annual versions are always computed, regardless of
  // which frequency is selected, so results can show both side by side.
  const months = Math.round(years * 12)
  const monthlyRate = annualReturnRate / 12

  let requiredMonthlyInvestment = 0
  let futureValueOfMonthlyPlan = 0
  if (requiredAdditionalCorpus > 0 && months > 0) {
    if (monthlyRate === 0) {
      // Edge case: 0% return means the corpus needed is just spread
      // evenly across the months, with nothing extra required for growth.
      requiredMonthlyInvestment = requiredAdditionalCorpus / months
      futureValueOfMonthlyPlan = requiredAdditionalCorpus
    } else {
      // FV = P × [((1 + i)^n − 1) / i] × (1 + i)  — solved for P:
      const annuityFactor =
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate)
      requiredMonthlyInvestment = requiredAdditionalCorpus / annuityFactor
      futureValueOfMonthlyPlan = requiredMonthlyInvestment * annuityFactor
    }
  }

  let requiredAnnualInvestment = 0
  let futureValueOfAnnualPlan = 0
  if (requiredAdditionalCorpus > 0 && years > 0) {
    if (annualReturnRate === 0) {
      requiredAnnualInvestment = requiredAdditionalCorpus / years
      futureValueOfAnnualPlan = requiredAdditionalCorpus
    } else {
      const annuityFactor =
        ((Math.pow(1 + annualReturnRate, years) - 1) / annualReturnRate) *
        (1 + annualReturnRate)
      requiredAnnualInvestment = requiredAdditionalCorpus / annuityFactor
      futureValueOfAnnualPlan = requiredAnnualInvestment * annuityFactor
    }
  }

  // --- Step 5: the plan matching the SELECTED frequency drives every
  // "totals" figure below, so Total Contributions / Estimated Returns /
  // Projected Final Value / Surplus-Shortfall all describe one consistent
  // plan instead of mixing monthly and annual numbers together. ---
  const requiredInvestment = isAnnualFrequency
    ? requiredAnnualInvestment
    : requiredMonthlyInvestment
  const totalContributions = isAnnualFrequency
    ? requiredAnnualInvestment * years
    : requiredMonthlyInvestment * months
  const futureValueOfSelectedPlan = isAnnualFrequency
    ? futureValueOfAnnualPlan
    : futureValueOfMonthlyPlan

  const projectedFinalValue =
    futureValueOfExistingSavings + futureValueOfSelectedPlan
  const totalInvested = currentSavings + totalContributions
  const totalReturns = projectedFinalValue - totalInvested
  const surplusOrShortfall = projectedFinalValue - targetAmountAtGoal

  return {
    // These map to config.js's resultFields and are what actually reaches
    // the screen — ResultPanel.jsx currency-formats every resultField, so
    // all of them have to be plain, non-negative, finite numbers (except
    // surplusOrShortfall, which is meaningful as a signed value).
    requiredInvestment: safeResult(requiredInvestment),
    requiredMonthlyInvestment: safeResult(requiredMonthlyInvestment),
    requiredAnnualInvestment: safeResult(requiredAnnualInvestment),
    targetAmountAtGoal: safeResult(targetAmountAtGoal),
    futureValueOfExistingSavings: safeResult(futureValueOfExistingSavings),
    requiredAdditionalCorpus: safeResult(requiredAdditionalCorpus),
    totalContributions: safeResult(totalContributions),
    totalReturns: safeResult(totalReturns),
    projectedFinalValue: safeResult(projectedFinalValue),
    surplusOrShortfall: safeResult(surplusOrShortfall, { allowNegative: true }),

    // Extra field, deliberately left out of config.js's resultFields (the
    // same way SWP's formula.js keeps a few extra fields off its
    // resultFields list): ResultPanel.jsx also looks for a raw
    // `totalInvested` alongside `totalReturns` on the result object
    // itself — not through resultFields — to draw its invested-vs-returns
    // bar. Adding it here gets that existing visual "for free", the same
    // way it already renders for the SIP/Lumpsum/FD/PPF/RD calculators.
    totalInvested: safeResult(totalInvested),

    // Extra context for callers/tests: which frequency and contribution
    // timing this result actually assumes, and whether existing savings
    // alone already meet the goal.
    frequency: isAnnualFrequency ? 'annual' : 'monthly',
    contributionTiming: 'start-of-period',
    isGoalAlreadyMetByExistingSavings: requiredAdditionalCorpus <= 0,
  }
}