// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// This file performs the calculation; it does not define tax rules —
// those live in ./config.js (RULES) so a new financial year's numbers can
// be dropped in without touching any logic here. See config.js for the
// financial year this calculator currently models and why.

import { RULES } from './config.js'

// ---------------------------------------------------------------------------
// Small pure helpers, each doing one part of an income-tax computation.
// Kept separate (rather than inlined twice) because every one of them has
// to run once for the Old Regime and once for the New Regime with
// different rule inputs — duplicating this logic inline would be exactly
// the kind of place a copy-paste slip produces a silently wrong regime.
// ---------------------------------------------------------------------------

// Walks slabs (ascending, cumulative upper bounds, last one Infinity) and
// sums tax bracket by bracket. Works for both regimes and every old-regime
// age category — only the `slabs` array passed in differs.
function computeSlabTax(taxableIncome, slabs) {
  let tax = 0
  let previousLimit = 0
  for (const slab of slabs) {
    if (taxableIncome <= previousLimit) break
    const amountInSlab = Math.min(taxableIncome, slab.upTo) - previousLimit
    if (amountInSlab > 0) {
      tax += amountInSlab * slab.rate
    }
    previousLimit = slab.upTo
  }
  return tax
}

// Section 87A, with marginal relief. Below the threshold, tax is fully
// rebated (rebateCap is set, in config.js, to exactly equal the tax due
// at the threshold, so this always brings tax to ₹0 inside the band).
// Just above the threshold, a taxpayer earning ₹1 more should never take
// home less than one earning exactly the threshold amount — marginal
// relief caps the tax increase at the amount of income that crossed the
// threshold, until normal slab tax naturally falls below that cap again.
function applyRebateWithMarginalRelief(taxBeforeRebate, taxableIncome, threshold, rebateCap) {
  if (taxableIncome <= threshold) {
    const rebate = Math.min(taxBeforeRebate, rebateCap)
    return { rebate, taxAfterRebate: Math.max(0, taxBeforeRebate - rebate) }
  }

  const excessIncome = taxableIncome - threshold
  if (taxBeforeRebate > excessIncome) {
    // Relief zone: cap the tax at the amount of income above the threshold.
    return { rebate: taxBeforeRebate - excessIncome, taxAfterRebate: excessIncome }
  }

  // Comfortably past the relief zone — normal slab tax applies, no rebate.
  return { rebate: 0, taxAfterRebate: taxBeforeRebate }
}

// Tax after rebate but before surcharge/cess — used both for the actual
// income and (inside applySurchargeWithRelief) for a hypothetical income
// pinned exactly at a surcharge threshold, which surcharge marginal
// relief needs as its reference point.
function taxAfterRebateFor(taxableIncome, slabs, rebateThreshold, rebateCap) {
  const taxBeforeRebate = computeSlabTax(taxableIncome, slabs)
  return applyRebateWithMarginalRelief(taxBeforeRebate, taxableIncome, rebateThreshold, rebateCap).taxAfterRebate
}

// Surcharge, with marginal relief, for one regime. isNewRegime caps the
// applicable rate at RULES.surcharge.newRegimeMaxRate (25%) instead of
// letting it reach the old regime's 37% top band.
function applySurchargeWithRelief(taxableIncome, taxAfterRebate, slabs, rebateThreshold, rebateCap, isNewRegime) {
  let rate = 0
  let thresholdCrossed = 0
  for (const band of RULES.surcharge.slabs) {
    if (taxableIncome > band.threshold) {
      rate = isNewRegime ? Math.min(band.rate, RULES.surcharge.newRegimeMaxRate) : band.rate
      thresholdCrossed = band.threshold
    }
  }

  if (rate === 0) {
    return { surcharge: 0, taxPlusSurcharge: taxAfterRebate }
  }

  const rawSurcharge = taxAfterRebate * rate
  const rawTotal = taxAfterRebate + rawSurcharge

  // Reference point: what tax-after-rebate (no surcharge) would be for a
  // taxpayer sitting exactly at the threshold that was crossed.
  const taxAtThreshold = taxAfterRebateFor(thresholdCrossed, slabs, rebateThreshold, rebateCap)
  const maxAllowed = taxAtThreshold + (taxableIncome - thresholdCrossed)

  if (rawTotal > maxAllowed) {
    return { surcharge: Math.max(0, maxAllowed - taxAfterRebate), taxPlusSurcharge: maxAllowed }
  }
  return { surcharge: rawSurcharge, taxPlusSurcharge: rawTotal }
}

// Standard three-way-minimum HRA exemption formula. basicSalaryAnnual is
// derived (not separately collected — see config.js RULES.oldRegime.hra
// and TAX ASSUMPTIONS in the chat response this calculator shipped with).
function computeHRAExemption({ hraReceived, rentPaid, basicSalaryAnnual, cityRatePercent }) {
  const rentMinusTenPercent = Math.max(0, rentPaid - 0.1 * basicSalaryAnnual)
  const cityLimit = (cityRatePercent / 100) * basicSalaryAnnual
  return Math.max(0, Math.min(hraReceived, rentMinusTenPercent, cityLimit))
}

// Full computation for one regime: taxable income -> slab tax -> rebate
// (with marginal relief) -> surcharge (with marginal relief) -> cess.
// Returns every intermediate figure a regime's block of result fields
// needs, plus the resolved surcharge rate (for callers/tests — see the
// comment on the final return value for why that isn't wired into the UI).
function computeRegimeTax(taxableIncome, slabs, rebateThreshold, rebateCap, isNewRegime) {
  const taxBeforeRebate = computeSlabTax(taxableIncome, slabs)
  const { rebate, taxAfterRebate } = applyRebateWithMarginalRelief(
    taxBeforeRebate,
    taxableIncome,
    rebateThreshold,
    rebateCap
  )
  const { surcharge, taxPlusSurcharge } = applySurchargeWithRelief(
    taxableIncome,
    taxAfterRebate,
    slabs,
    rebateThreshold,
    rebateCap,
    isNewRegime
  )
  const cess = taxPlusSurcharge * RULES.cessRate
  const totalTax = taxPlusSurcharge + cess

  return { taxBeforeRebate, rebate, taxAfterRebate, surcharge, cess, totalTax }
}

export function calculate(inputs) {
  // Every input is defensively parsed and floored at 0 — sliders can't
  // reach a negative value, but formula.js should never trust that alone
  // (same principle the SWP calculator in this project documents for its
  // own defensive floor).
  const annualGrossSalary = Math.max(0, Number(inputs.annualGrossSalary) || 0)
  const otherIncomeAnnual = Math.max(0, Number(inputs.otherIncomeAnnual) || 0)
  const age = Math.max(0, Number(inputs.age) || 0)
  const section80CInput = Math.max(0, Number(inputs.section80C) || 0)
  const section80DInput = Math.max(0, Number(inputs.section80D) || 0)
  const hraReceivedAnnual = Math.max(0, Number(inputs.hraReceivedAnnual) || 0)
  const rentPaidAnnual = Math.max(0, Number(inputs.rentPaidAnnual) || 0)
  const hraCityRateInput = Number(inputs.hraCityRate)
  const otherOldRegimeDeductions = Math.max(0, Number(inputs.otherOldRegimeDeductions) || 0)

  // Guard against a missing/invalid city-rate value landing outside the
  // two valid stops (40 or 50) the slider is built to produce.
  const hraCityRate = [
    RULES.oldRegime.hra.nonMetroRatePercentOfBasic,
    RULES.oldRegime.hra.metroRatePercentOfBasic,
  ].includes(hraCityRateInput)
    ? hraCityRateInput
    : RULES.oldRegime.hra.nonMetroRatePercentOfBasic

  const grossTotalIncome = annualGrossSalary + otherIncomeAnnual

  // ---- Old Regime ----------------------------------------------------
  const ageCategory =
    age >= RULES.oldRegime.superSeniorAge
      ? 'superSenior'
      : age >= RULES.oldRegime.seniorAge
      ? 'senior'
      : 'general'
  const oldSlabs = RULES.oldRegime.slabsByAgeCategory[ageCategory]

  const section80C = Math.min(section80CInput, RULES.oldRegime.section80CCap)
  const section80DCap =
    age >= RULES.oldRegime.seniorAge ? RULES.oldRegime.section80DCapSenior : RULES.oldRegime.section80DCapGeneral
  const section80D = Math.min(section80DInput, section80DCap)

  const basicSalaryAnnual = annualGrossSalary * (RULES.oldRegime.hra.assumedBasicPercentOfGross / 100)
  const hraExemption = computeHRAExemption({
    hraReceived: hraReceivedAnnual,
    rentPaid: rentPaidAnnual,
    basicSalaryAnnual,
    cityRatePercent: hraCityRate,
  })

  const oldRegimeDeductions =
    RULES.oldRegime.standardDeduction + section80C + section80D + hraExemption + otherOldRegimeDeductions
  const oldRegimeTaxableIncome = Math.max(0, grossTotalIncome - oldRegimeDeductions)

  const old = computeRegimeTax(
    oldRegimeTaxableIncome,
    oldSlabs,
    RULES.oldRegime.rebateThreshold,
    RULES.oldRegime.rebateCap,
    false
  )

  // ---- New Regime ------------------------------------------------------
  const newRegimeDeductions = RULES.newRegime.standardDeduction
  const newRegimeTaxableIncome = Math.max(0, grossTotalIncome - newRegimeDeductions)

  const newer = computeRegimeTax(
    newRegimeTaxableIncome,
    RULES.newRegime.slabs,
    RULES.newRegime.rebateThreshold,
    RULES.newRegime.rebateCap,
    true
  )

  // ---- Comparison --------------------------------------------------
  const preferredRegime = newer.totalTax <= old.totalTax ? 'new' : 'old'
  const recommendedRegimeTax = Math.min(old.totalTax, newer.totalTax)
  const taxSavingsBetterRegime = Math.abs(old.totalTax - newer.totalTax)

  const effectiveTaxRate = (regimeTotalTax) =>
    grossTotalIncome > 0 ? (regimeTotalTax / grossTotalIncome) * 100 : 0

  return {
    // ---- Everything below this line maps to config.js's resultFields
    // and is what actually reaches the screen. ResultPanel.jsx formats
    // every resultField as INR currency with 0 decimal places, so every
    // one of these has to be a plain, finite, non-negative number.
    recommendedRegimeTax: Math.round(recommendedRegimeTax),
    grossTotalIncome: Math.round(grossTotalIncome),

    oldRegimeDeductions: Math.round(oldRegimeDeductions),
    oldRegimeTaxableIncome: Math.round(oldRegimeTaxableIncome),
    oldRegimeTaxBeforeRebate: Math.round(old.taxBeforeRebate),
    oldRegimeRebate: Math.round(old.rebate),
    oldRegimeCess: Math.round(old.cess),
    oldRegimeTotalTax: Math.round(old.totalTax),

    newRegimeDeductions: Math.round(newRegimeDeductions),
    newRegimeTaxableIncome: Math.round(newRegimeTaxableIncome),
    newRegimeTaxBeforeRebate: Math.round(newer.taxBeforeRebate),
    newRegimeRebate: Math.round(newer.rebate),
    newRegimeCess: Math.round(newer.cess),
    newRegimeTotalTax: Math.round(newer.totalTax),

    taxSavingsBetterRegime: Math.round(taxSavingsBetterRegime),
    recommendedRegimeMonthlyTax: Math.round(recommendedRegimeTax / 12),

    // ---- Extra fields for callers/tests (and any future results UI),
    // deliberately left out of config.js's resultFields: ResultPanel.jsx
    // currency-formats every resultField it's given, and a percentage or
    // a regime name forced through an INR formatter would show up as a
    // broken-looking value (e.g. a 18.5% rate rendered as "₹19", or a
    // string producing "₹NaN"). Keeping them off resultFields is what
    // keeps the visible UI limited to real, safe currency values while
    // still surfacing this information on the result object itself.
    preferredRegime, // 'old' | 'new'
    oldRegimeEffectiveTaxRate: Math.round(effectiveTaxRate(old.totalTax) * 100) / 100,
    newRegimeEffectiveTaxRate: Math.round(effectiveTaxRate(newer.totalTax) * 100) / 100,
    recommendedRegimeEffectiveTaxRate: Math.round(effectiveTaxRate(recommendedRegimeTax) * 100) / 100,
    oldRegimeSurcharge: Math.round(old.surcharge),
    newRegimeSurcharge: Math.round(newer.surcharge),
    hraExemption: Math.round(hraExemption),
    ageCategoryUsed: ageCategory, // 'general' | 'senior' | 'superSenior'
  }
}