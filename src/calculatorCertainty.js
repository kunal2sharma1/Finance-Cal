import { CALCULATOR_CERTAINTY_LEVELS } from './calculatorSchema.js'

export { CALCULATOR_CERTAINTY_LEVELS }

const CERTAINTY_BY_SCOPE = Object.freeze({
  exact: 'exact',
  'standard-model': 'estimate',
  'simplified-model': 'scenario',
  'rule-based-illustration': 'scenario',
  projection: 'projection',
  'live-data': 'live-data',
})

const CERTAINTY_NOTES = Object.freeze({
  exact: 'Exact within the documented mathematical model and entered assumptions.',
  estimate: 'An estimate produced by the calculator’s standard financial model; real-world inputs may differ.',
  projection: 'A forward-looking projection based on assumptions about future returns, inflation, timing, or behavior.',
  scenario: 'A scenario illustration based on simplified or rule-based assumptions; actual outcomes may differ.',
  'live-data': 'The result depends on external data that can change, become stale, or be temporarily unavailable.',
})

export function getResultCertainty(modelScope) {
  const level = CERTAINTY_BY_SCOPE[modelScope] || 'estimate'
  return {
    level,
    note: CERTAINTY_NOTES[level],
  }
}

export function isValidCertaintyLevel(level) {
  return CALCULATOR_CERTAINTY_LEVELS.includes(level)
}
