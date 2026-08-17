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

const METHODOLOGY = {
  '401k': {
    summary: 'Illustrates 401(k) contribution-limit capacity using the selected annual contribution assumptions.',
    approach: 'Applies the calculator inputs to the published annual-limit assumptions and keeps plan matching, fees and investment performance outside the model.',
    limitations: 'Actual plan limits, employer matching, eligibility, tax treatment and investment outcomes depend on the specific plan and individual circumstances.',
  },
  hsa: {
    summary: 'Illustrates HSA contribution capacity using the selected annual contribution and plan-limit assumptions.',
    approach: 'Applies the configured annual HSA limits to the entered contribution scenario without modeling employer-specific plan mechanics.',
    limitations: 'Eligibility, employer contributions, coverage status and other plan details can change the applicable limits and outcome.',
  },
  'uk-isa': {
    summary: 'Illustrates ISA contribution capacity and scenario growth using the configured UK allowance assumptions.',
    approach: 'Uses the published subscription allowance as a rule input; any investment growth is treated as a scenario rather than a guaranteed outcome.',
    limitations: 'Provider rules, product availability, withdrawals, taxes outside the ISA wrapper and investment performance can change the outcome.',
  },
  'uk-pension': {
    summary: 'Illustrates pension annual-allowance capacity using the configured UK pension rules.',
    approach: 'Applies the configured annual allowance to the entered scenario without modeling individualized tapering or carry-forward calculations.',
    limitations: 'Tapering, carry-forward, scheme rules, tax status and individual circumstances may change the applicable allowance.',
  },
  'uk-lifetime-isa': {
    summary: 'Illustrates Lifetime ISA contribution and bonus outcomes using the configured allowance assumptions.',
    approach: 'Applies the configured subscription allowance and rule-based bonus illustration to the entered contribution scenario.',
    limitations: 'Eligibility, withdrawal charges, provider terms and use of funds can materially change the actual outcome.',
  },
  'canada-tfsa': {
    summary: 'Illustrates TFSA annual contribution capacity using the configured Canadian limit assumptions.',
    approach: 'Applies the annual dollar limit as a rule input without reconstructing the user’s full historical contribution room.',
    limitations: 'Actual room depends on age, residency, prior unused room and contribution/withdrawal history.',
  },
  'canada-rrsp': {
    summary: 'Illustrates RRSP contribution capacity using the configured Canadian dollar-limit assumptions.',
    approach: 'Applies the calculator’s configured annual limit to the scenario rather than calculating a personalized deduction room from full tax history.',
    limitations: 'Actual available room depends on prior-year earned income, pension adjustments and personal CRA records.',
  },
  'canada-fhsa': {
    summary: 'Illustrates FHSA contribution-room capacity using the configured participation rules.',
    approach: 'Applies the annual and lifetime participation-room framework represented by the calculator.',
    limitations: 'Eligibility, participation history and transfers can affect actual available room.',
  },
  'singapore-cpf': {
    summary: 'Illustrates CPF contribution outcomes using the configured wage-ceiling and contribution assumptions.',
    approach: 'Applies the calculator’s configured CPF contribution framework to the entered wage scenario.',
    limitations: 'Actual contribution rates and ceilings vary with age, residency, wage band and applicable CPF rules.',
  },
  'australia-super': {
    summary: 'Illustrates superannuation contributions and projected accumulation using the configured contribution assumptions.',
    approach: 'Applies the configured superannuation contribution rate to the entered salary scenario; projected growth remains a scenario assumption.',
    limitations: 'Employer arrangements, contribution timing, fund fees, taxes and investment returns can change actual outcomes.',
  },
  'australia-concessional-super': {
    summary: 'Illustrates concessional superannuation contribution capacity against the configured cap assumptions.',
    approach: 'Compares the entered concessional contribution scenario with the configured annual cap framework.',
    limitations: 'Carry-forward eligibility, prior contributions and individual circumstances can change available concessional capacity.',
  },
  'uae-end-of-service': {
    summary: 'Illustrates private-sector end-of-service gratuity using the configured standard framework.',
    approach: 'Applies the calculator’s configured service-period and wage assumptions to the standard gratuity illustration.',
    limitations: 'Worker status, contract type, employment circumstances and legal exceptions can change actual entitlement.',
  },
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
    methodology: METHODOLOGY[calculatorId] || {
      summary: 'Illustrative financial model using the documented calculator assumptions.',
      approach: 'Applies the configured calculator inputs and model conventions to produce the displayed scenario.',
      limitations: 'Actual outcomes can differ when real-world rules, fees, taxes or product terms vary from the model assumptions.',
    },
  }]),
)

export function getTrustDefinition(calculatorId) {
  return trustDefinitions[calculatorId] || null
}
