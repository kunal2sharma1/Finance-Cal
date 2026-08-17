import { trustMetadata } from './trustMetadata.js'

const RULE_SCOPE = Object.freeze({
  '401k': '2026 contribution-limit assumptions.',
  hsa: '2026 HSA contribution and high-deductible health-plan limits.',
  'uk-isa': '2026–27 ISA subscription allowance.',
  'uk-pension': '2026–27 annual allowance assumptions.',
  'uk-lifetime-isa': 'Lifetime ISA allowance and rule assumptions.',
  'canada-tfsa': '2026 TFSA annual dollar limit.',
  'canada-rrsp': '2026 RRSP dollar-limit assumptions.',
  'canada-fhsa': 'FHSA annual and lifetime participation-room framework.',
  'singapore-cpf': '2026 ordinary-wage ceiling and contribution framework.',
  'australia-super': 'Superannuation guarantee contribution assumptions.',
  'australia-concessional-super': 'Concessional contribution cap assumptions.',
  'uae-end-of-service': 'Standard private-sector end-of-service gratuity framework.',
})

export const trustRules = Object.fromEntries(
  Object.entries(trustMetadata).map(([calculatorId, metadata]) => [calculatorId, [
    {
      id: `${calculatorId}:primary-rule`,
      calculatorId,
      statement: RULE_SCOPE[calculatorId] || metadata.scope,
      source: {
        label: metadata.sourceLabel,
        url: metadata.sourceUrl,
      },
      effectivePeriod: {
        from: null,
        to: null,
      },
      reviewedAt: metadata.reviewed,
      validationCases: [],
    },
  ]]),
)

export function getTrustRules(calculatorId) {
  return trustRules[calculatorId] || []
}
