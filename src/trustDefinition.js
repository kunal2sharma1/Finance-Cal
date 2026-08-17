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
  if (typeof definition.effectivePeriod.from !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(definition.effectivePeriod.from)) return false
  if (definition.effectivePeriod.to !== null && (typeof definition.effectivePeriod.to !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(definition.effectivePeriod.to))) return false
  return true
}
