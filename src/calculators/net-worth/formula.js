// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// Net worth is a sum across many independent categories rather than a
// single growth formula, so — unlike the other calculators in this project
// — this file reads its category list from config.js (`assetFields` and
// `liabilityFields`) instead of naming each input by hand. Add, remove, or
// reclassify a category in config.js and this file picks it up
// automatically; nothing here needs to change.

import { assetFields, liabilityFields } from './config.js'

// Percentages and ratios are rounded to 2 decimal places rather than whole
// numbers, matching the CAGR calculator in this project — a whole-percent
// figure (e.g. "37%" instead of "36.5%") hides real differences once
// several six- and seven-figure categories are added together.
function roundTo2(value) {
  return Math.round(value * 100) / 100
}

// Coerces one raw form value (always a string, per CalculatorView.jsx) into
// a safe, non-negative, finite number. This is a stricter version of the
// `Number(x) || 0` pattern the simpler calculators in this project use:
// plain `|| 0` still lets the literal string "Infinity" through, because
// Number('Infinity') is a truthy value, not zero — and it doesn't stop
// negative entries either. Individual asset/liability amounts must never be
// negative or non-finite here, so both are guarded directly.
function toAmount(rawValue) {
  const num = Number(rawValue)
  if (!Number.isFinite(num) || num < 0) return 0
  return num
}

function sumFields(fields, inputs) {
  return fields.reduce((total, field) => total + toAmount(inputs[field.name]), 0)
}

function sumByClassification(fields, inputs, classification) {
  return sumFields(
    fields.filter((field) => field.classification === classification),
    inputs
  )
}

// A plain per-category breakdown: how much each category contributes, and
// what share of its group's total that is. Used for both assets and
// liabilities — see config.js's header comment for why liabilities get
// this flat breakdown instead of a secured/unsecured split.
function buildBreakdown(fields, inputs, groupTotal) {
  return fields.map((field) => {
    const value = toAmount(inputs[field.name])
    return {
      key: field.name,
      label: field.label,
      value: Math.round(value),
      percentOfTotal: groupTotal > 0 ? roundTo2((value / groupTotal) * 100) : 0,
    }
  })
}

export function calculate(inputs) {
  const totalAssets = sumFields(assetFields, inputs)
  const totalLiabilities = sumFields(liabilityFields, inputs)

  const liquidAssets = sumByClassification(assetFields, inputs, 'liquid')
  const investmentAssets = sumByClassification(assetFields, inputs, 'investment')
  const nonLiquidAssets = sumByClassification(assetFields, inputs, 'nonLiquid')

  const netWorth = totalAssets - totalLiabilities
  const investableAssets = liquidAssets + investmentAssets

  // Both ratios below divide by a total that can legitimately be zero (no
  // debt at all, or the all-zero starting state before any input is
  // entered) — each is guarded so the result is `null` ("not applicable")
  // rather than Infinity or NaN reaching the UI.
  const assetToLiabilityRatio =
    totalLiabilities > 0 ? roundTo2(totalAssets / totalLiabilities) : null
  const liabilitiesPercentOfAssets =
    totalAssets > 0 ? roundTo2((totalLiabilities / totalAssets) * 100) : null

  return {
    // These four map to config.js's resultFields and are what actually
    // reaches the screen — ResultPanel.jsx formats every resultField as
    // INR currency, so all four have to be plain, finite, currency-shaped
    // numbers. netWorth is deliberately never clamped to zero: a negative
    // net worth is a real result, and formatCurrency already renders a
    // negative INR value correctly (e.g. "-₹12,00,000") on its own.
    netWorth: Math.round(netWorth),
    totalAssets: Math.round(totalAssets),
    totalLiabilities: Math.round(totalLiabilities),
    investableAssets: Math.round(investableAssets),

    // Extra fields for callers/tests (and any future results UI) to use.
    // Deliberately left out of config.js's resultFields, for the same
    // reason the SWP calculator in this project keeps its own exhaustion
    // fields off resultFields: ResultPanel.jsx currency-formats every
    // resultField it's given, and a ratio or a percentage forced through
    // an INR formatter would show up as a broken-looking value (e.g. "₹2"
    // instead of "2.35x", or "₹0" instead of "36.5%").
    liquidAssets: Math.round(liquidAssets),
    investmentAssets: Math.round(investmentAssets),
    nonLiquidAssets: Math.round(nonLiquidAssets),
    assetToLiabilityRatio,
    liabilitiesPercentOfAssets,
    isDebtFree: totalLiabilities === 0,
    assetBreakdown: buildBreakdown(assetFields, inputs, totalAssets),
    liabilityBreakdown: buildBreakdown(liabilityFields, inputs, totalLiabilities),
  }
}