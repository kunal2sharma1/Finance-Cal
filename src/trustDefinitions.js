import { trustMetadata } from './trustMetadata.js'

const RULE_BASED_HIGH = new Set([
  '401k',
  'hsa',
  'uk-isa',
  'uk-pension',
  'uk-lifetime-isa',
  'canada-tfsa',
  'canada-rrsp',
  'canada-fhsa',
  'singapore-cpf',
  'australia-super',
  'australia-concessional-super',
  'uae-end-of-service',
])

const MODEL_NOTES = {
  '401k': 'Rule-based contribution-limit model using published annual limits; it is not a plan statement or tax projection.',
  hsa: 'Rule-based contribution-limit model using published annual limits; eligibility and employer-plan details can differ.',
  'uk-isa': 'Rule-based allowance model; investment returns and tax outcomes remain scenario estimates.',
  'uk-pension': 'Rule-based annual-allowance model; tapering, carry-forward and individual circumstances can change the applicable limit.',
  'uk-lifetime-isa': 'Rule-based allowance and rule illustration; provider terms and eligibility may change outcomes.',
  'canada-tfsa': 'Rule-based annual-limit model; available contribution room depends on personal history and residency.',
  'canada-rrsp': 'Rule-based dollar-limit model; personal room depends on prior income and adjustments.',
  'canada-fhsa': 'Rule-based participation-room model; eligibility and personal circumstances apply.',
  'singapore-cpf': 'Rule-based contribution-framework model; exact rates vary by age, residency and wage band.',
  'australia-super': 'Rule-based superannuation contribution model; employer and fund-specific factors can differ.',
  'australia-concessional-super': 'Rule-based contribution-cap model; carry-forward eligibility and personal circumstances can affect the effective cap.',
  'uae-end-of-service': 'Rule-based gratuity illustration using the standard private-sector framework; exceptions and worker status can change outcomes.',
}

export const trustDefinitions = Object.fromEntries(
  Object.entries(trustMetadata).map(([calculatorId, metadata]) => [calculatorId, {
    modelType: RULE_BASED_HIGH.has(calculatorId) ? 'rule-based' : 'illustrative',
    riskLevel: RULE_BASED_HIGH.has(calculatorId) ? 'very-high' : 'high',
    sourceTier: 'official-authority',
    sources: [{ label: metadata.sourceLabel, url: metadata.sourceUrl }],
    assumptions: [metadata.scope],
    exclusions: [MODEL_NOTES[calculatorId] || 'Individual circumstances, provider terms and fees may change outcomes.'],
    reviewedAt: metadata.reviewed,
    effectivePeriod: { from: null, to: null },
  }]),
)

export function getTrustDefinition(calculatorId) {
  return trustDefinitions[calculatorId] || null
}
