export const CALCULATOR_MODEL_SCOPES = Object.freeze([
  'exact',
  'standard-model',
  'simplified-model',
  'rule-based-illustration',
  'projection',
  'live-data',
])

const SCOPE_OVERRIDES = Object.freeze({
  ppf: {
    modelScope: 'simplified-model',
    note: 'Illustration uses an annual contribution and annual-compounding convention; it does not reproduce the scheme’s actual monthly lowest-balance interest rule.',
  },
  'bond-return': {
    modelScope: 'simplified-model',
    note: 'Illustration models coupon income plus capital gain/loss and does not model accrued interest, reinvestment, taxes, fees, credit events, or market-price effects beyond the entered sale price.',
  },
  'income-tax': {
    modelScope: 'rule-based-illustration',
    note: 'Rule-based tax illustration using the configured financial-year slabs and assumptions; it is not a tax return and may omit facts specific to an individual taxpayer.',
  },
  retirement: {
    modelScope: 'projection',
    note: 'Projection assumes fixed return, inflation, contribution, and withdrawal conventions; actual retirement outcomes vary with market returns, taxes, fees, timing, and spending changes.',
  },
  fire: {
    modelScope: 'projection',
    note: 'Projection uses the configured savings, return, inflation, and withdrawal assumptions; it is not a guarantee of financial independence timing.',
  },
  'future-net-worth': {
    modelScope: 'projection',
    note: 'Projection assumes the entered savings, growth, debt, and time assumptions remain stable; actual net worth can change materially.',
  },
  'wealth-accumulation': {
    modelScope: 'projection',
    note: 'Projection uses assumed contributions and returns rather than observed future market performance.',
  },
  'retirement-gap': {
    modelScope: 'projection',
    note: 'Gap is a scenario estimate based on the configured retirement income, inflation, return, and time assumptions.',
  },
  'retirement-income': {
    modelScope: 'projection',
    note: 'Income estimate depends on assumed corpus, withdrawal horizon, inflation, and return conventions.',
  },
  'retirement-withdrawal': {
    modelScope: 'projection',
    note: 'Withdrawal results are scenario projections based on fixed return, inflation, timing, and withdrawal assumptions.',
  },
})

export function getCalculatorScope(config, modelType) {
  const id = String(config?.id || '').trim()
  const override = SCOPE_OVERRIDES[id]
  if (override) return override

  if (modelType === 'live-data') {
    return {
      modelScope: 'live-data',
      note: 'Result depends on external data that can change between requests and may be unavailable or stale.',
    }
  }

  if (modelType === 'numerical-solver') {
    return {
      modelScope: 'exact',
      note: 'Result is produced by the configured numerical method for the entered cash flows and solver assumptions.',
    }
  }

  if (modelType === 'rule-based') {
    return {
      modelScope: 'rule-based-illustration',
      note: 'Result applies the rules and assumptions configured for this calculator; individual eligibility and real-world circumstances may differ.',
    }
  }

  return {
    modelScope: 'standard-model',
    note: 'Result follows the calculator’s documented mathematical convention and entered assumptions.',
  }
}

export function hasExplicitScope(config) {
  return Boolean(SCOPE_OVERRIDES[String(config?.id || '').trim()])
}
