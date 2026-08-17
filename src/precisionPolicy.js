const CERTAINTY_PRECISION = Object.freeze({
  exact: { currencyDecimals: 0, percentDecimals: 2, ratioDecimals: 2 },
  estimate: { currencyDecimals: 0, percentDecimals: 1, ratioDecimals: 2 },
  projection: { currencyDecimals: 0, percentDecimals: 1, ratioDecimals: 2 },
  scenario: { currencyDecimals: 0, percentDecimals: 1, ratioDecimals: 2 },
  'live-data': { currencyDecimals: 2, percentDecimals: 2, ratioDecimals: 4 },
})

export function getPrecisionPolicy(certainty = 'estimate') {
  return CERTAINTY_PRECISION[certainty] || CERTAINTY_PRECISION.estimate
}

export function roundForDisplay(value, decimals = 0) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 0
  const factor = 10 ** decimals
  return Math.round(n * factor) / factor
}

export function getResultDisplayPrecision(certainty, unit) {
  const policy = getPrecisionPolicy(certainty)
  if (unit === '%' || unit === 'percent') return policy.percentDecimals
  if (unit === 'ratio') return policy.ratioDecimals
  return policy.currencyDecimals
}

export const PRECISION_POLICY = CERTAINTY_PRECISION
