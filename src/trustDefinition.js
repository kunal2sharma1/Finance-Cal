export const TRUST_MODEL_TYPES = Object.freeze([
  'exact-mathematical',
  'standard-financial-model',
  'illustrative',
  'rule-based',
  'numerical-solver',
  'live-data',
])

export const TRUST_RISK_LEVELS = Object.freeze(['low', 'moderate', 'high', 'very-high'])

export const TRUST_SOURCE_TIERS = Object.freeze([
  'official-authority',
  'primary-institutional',
  'high-quality-secondary',
])

function isDateOrNull(value) {
  return value === null || (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value))
}

export function isValidTrustRule(rule) {
  if (!rule || typeof rule !== 'object') return false
  if (typeof rule.id !== 'string' || !rule.id) return false
  if (typeof rule.calculatorId !== 'string' || !rule.calculatorId) return false
  if (typeof rule.statement !== 'string' || !rule.statement) return false
  if (!rule.source || typeof rule.source !== 'object') return false
  if (typeof rule.source.label !== 'string' || !rule.source.label) return false
  if (typeof rule.source.url !== 'string' || !/^https:\/\//.test(rule.source.url)) return false
  if (!rule.effectivePeriod || typeof rule.effectivePeriod !== 'object') return false
  if (!isDateOrNull(rule.effectivePeriod.from) || !isDateOrNull(rule.effectivePeriod.to)) return false
  if (typeof rule.reviewedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(rule.reviewedAt)) return false
  if (!Array.isArray(rule.validationCases)) return false
  return true
}

export function isValidTrustDefinition(definition) {
  if (!definition || typeof definition !== 'object') return false
  if (!TRUST_MODEL_TYPES.includes(definition.modelType)) return false
  if (!TRUST_RISK_LEVELS.includes(definition.riskLevel)) return false
  if (!TRUST_SOURCE_TIERS.includes(definition.sourceTier)) return false
  if (!Array.isArray(definition.sources) || definition.sources.length === 0) return false
  if (!Array.isArray(definition.assumptions)) return false
  if (!Array.isArray(definition.exclusions)) return false
  if (typeof definition.reviewedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(definition.reviewedAt)) return false
  if (!definition.effectivePeriod || typeof definition.effectivePeriod !== 'object') return false
  for (const key of ['from', 'to']) {
    const value = definition.effectivePeriod[key]
    if (!isDateOrNull(value)) return false
  }
  return true
}
