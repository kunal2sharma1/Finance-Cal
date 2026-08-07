// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// WITHDRAWAL TIMING ASSUMPTION: each month, the withdrawal is taken out of
// the corpus FIRST, and the expected annual return (converted to a monthly
// rate) is then applied to whatever remains — i.e. withdrawals happen at
// the beginning of the month, before that month's growth. This mirrors the
// SIP calculator in this project, whose future-value formula also assumes
// contributions land at the start of the month before growth is applied,
// so both calculators treat monthly cash flows the same way.

export function calculate(inputs) {
  const initialInvestment = Number(inputs.initialInvestment) || 0
  const monthlyWithdrawal = Number(inputs.monthlyWithdrawal) || 0
  const annualReturnRate = Number(inputs.annualReturnRate) || 0
  const years = Number(inputs.years) || 0

  // Rounded so a fractional `years` can never leave the loop below with a
  // fractional bound.
  const totalMonths = Math.round(years * 12)
  const monthlyRate = annualReturnRate / 12 / 100

  let corpus = initialInvestment
  let totalWithdrawn = 0

  // Tracks *if* and *when* the corpus hits ₹0 before the plan finishes, so
  // that can be reported on the result — see the comment on the return
  // value below for how that reporting works within this UI's constraints.
  let corpusExhausted = false
  let exhaustedInMonth = null

  for (let month = 1; month <= totalMonths; month++) {
    if (corpus <= 0) {
      // Already exhausted in an earlier month (or started at ₹0). Flag it
      // once, on the first month this is true, as long as a withdrawal was
      // actually still wanted — a ₹0 withdrawal plan never 'exhausts'.
      if (!corpusExhausted && monthlyWithdrawal > 0) {
        corpusExhausted = true
        exhaustedInMonth = month
      }
      continue
    }

    // Edge case: 0% return, ₹0 withdrawal, and a ₹0 corpus are all just
    // ordinary values here — Math.min keeps the withdrawal from ever
    // exceeding what's actually left, so the corpus can never go negative.
    const actualWithdrawal = Math.min(monthlyWithdrawal, corpus)
    corpus -= actualWithdrawal
    totalWithdrawn += actualWithdrawal

    if (corpus > 0) {
      corpus *= 1 + monthlyRate
    } else if (monthlyWithdrawal > 0) {
      // This month's withdrawal used up exactly what was left.
      corpus = 0
      corpusExhausted = true
      exhaustedInMonth = month
    }
  }

  // Defensive floor: the loop above already guarantees this, but a result
  // that reaches the UI should never rely on that alone.
  const remainingCorpus = Math.max(corpus, 0)
  const totalGrowth = remainingCorpus + totalWithdrawn - initialInvestment

  return {
    // These three map to config.js's resultFields and are what actually
    // reaches the screen — ResultPanel.jsx formats every resultField as
    // INR currency, so all three have to be plain, finite numbers.
    remainingCorpus: Math.round(remainingCorpus),
    totalWithdrawn: Math.round(totalWithdrawn),
    totalGrowth: Math.round(totalGrowth),

    // Extra fields describing early exhaustion, for callers/tests (and any
    // future results UI) to use. They're deliberately left out of
    // config.js's resultFields: ResultPanel.jsx currency-formats every
    // resultField it's given, and a boolean or a month count forced
    // through an INR formatter would show up as a broken-looking value
    // (e.g. '₹1'). Keeping them off resultFields is what keeps the visible
    // UI limited to real, safe currency values while still surfacing the
    // exhaustion status on the result object itself.
    corpusExhausted,
    exhaustedInMonth,
    exhaustedInYears: corpusExhausted
      ? Math.round((exhaustedInMonth / 12) * 10) / 10
      : null,
  }
}