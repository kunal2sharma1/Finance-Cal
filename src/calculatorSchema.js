export const SUPPORTED_FIELD_TYPES = Object.freeze([
  'number',
  'textarea',
  'cashflows',
  'select',
  'currency-select',
])

export const SUPPORTED_RESULT_TYPES = Object.freeze([
  'date',
  'dynamicCurrency',
])

export const CALCULATOR_DOMAINS = Object.freeze([
  'investing',
  'saving',
  'borrowing',
  'housing',
  'debt',
  'salary',
  'retirement',
  'tax',
  'education',
  'insurance',
  'financial-health',
  'financial-planning',
])

export const CALCULATOR_INTENTS = Object.freeze([
  'calculate',
  'compare',
  'check',
  'plan',
  'project',
  'measure',
])

export const CALCULATOR_MODEL_TYPES = Object.freeze([
  'standard-formula',
  'rule-based',
  'numerical-solver',
  'live-data',
])

export const CALCULATOR_MODEL_SCOPES = Object.freeze([
  'exact',
  'standard-model',
  'simplified-model',
  'rule-based-illustration',
  'projection',
  'live-data',
])

export const CALCULATOR_CERTAINTY_LEVELS = Object.freeze([
  'exact',
  'estimate',
  'projection',
  'scenario',
  'live-data',
])

export const CALCULATOR_CLASSES = Object.freeze([
  'standard',
  'select-based',
  'dynamic-input',
  'text-input',
  'live-data',
])

export const CALCULATOR_RISK_LEVELS = Object.freeze([
  'low',
  'medium',
  'high',
  'very-high',
  'external-data',
])

export function isSupportedFieldType(type) {
  return SUPPORTED_FIELD_TYPES.includes(type || 'number')
}

export function isSupportedResultType(type) {
  return SUPPORTED_RESULT_TYPES.includes(type)
}

export function isSupportedModelScope(scope) {
  return CALCULATOR_MODEL_SCOPES.includes(scope)
}

export function isSupportedCertaintyLevel(level) {
  return CALCULATOR_CERTAINTY_LEVELS.includes(level)
}
