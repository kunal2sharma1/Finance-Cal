export const trustMetadata = {
  '401k': {
    reviewed: '2026-08-17',
    sourceLabel: 'Internal Revenue Service (IRS)',
    sourceUrl: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits',
    scope: '2026 contribution-limit assumptions only. Plan-specific matching, fees, investment performance and tax treatment can differ.',
  },
  'hsa': {
    reviewed: '2026-08-17',
    sourceLabel: 'Internal Revenue Service (IRS)',
    sourceUrl: 'https://www.irs.gov/irb/2025-21_IRB',
    scope: '2026 HSA contribution and high-deductible health-plan limits. Eligibility and employer-plan details can differ.',
  },
  'uk-isa': {
    reviewed: '2026-08-17',
    sourceLabel: 'GOV.UK — Rates and allowances',
    sourceUrl: 'https://www.gov.uk/government/publications/budget-2025-overview-of-tax-legislation-and-rates-ootlar/annex-a-rates-and-allowances',
    scope: '2026–27 ISA subscription allowance. Investment returns and tax outcomes are scenario estimates.',
  },
  'uk-pension': {
    reviewed: '2026-08-17',
    sourceLabel: 'GOV.UK — Pension scheme rates',
    sourceUrl: 'https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates',
    scope: '2026–27 annual allowance assumptions. Tapering, carry-forward and individual circumstances can change the applicable limit.',
  },
  'uk-lifetime-isa': {
    reviewed: '2026-08-17',
    sourceLabel: 'GOV.UK',
    sourceUrl: 'https://www.gov.uk/lifetime-isa',
    scope: 'Lifetime ISA rules and allowance. Eligibility, withdrawal charges and account-provider terms may affect outcomes.',
  },
  'canada-tfsa': {
    reviewed: '2026-08-17',
    sourceLabel: 'Canada Revenue Agency (CRA)',
    sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/before.html',
    scope: '2026 TFSA annual dollar limit. Actual available contribution room depends on residency, age and unused room.',
  },
  'canada-rrsp': {
    reviewed: '2026-08-17',
    sourceLabel: 'Canada Revenue Agency (CRA)',
    sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html?lang=en',
    scope: '2026 RRSP dollar-limit assumptions. Individual room is generally based on prior-year earned income and other adjustments.',
  },
  'canada-fhsa': {
    reviewed: '2026-08-17',
    sourceLabel: 'Canada Revenue Agency (CRA)',
    sourceUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account/contributing-your-fhsa.html',
    scope: 'FHSA participation-room framework, including the $8,000 annual room and $40,000 lifetime limit. Eligibility rules apply.',
  },
  'singapore-cpf': {
    reviewed: '2026-08-17',
    sourceLabel: 'Central Provident Fund Board (CPF)',
    sourceUrl: 'https://www.cpf.gov.sg/service/article/what-is-the-ordinary-wage-ow-ceiling',
    scope: '2026 ordinary-wage ceiling and contribution framework. Exact rates vary by age, residency and wage band.',
  },
  'australia-super': {
    reviewed: '2026-08-17',
    sourceLabel: 'Australian Taxation Office (ATO)',
    sourceUrl: 'https://www.ato.gov.au/businesses-and-organisations/starting-registering-or-closing-a-business/starting-your-own-business/supporting-your-small-business',
    scope: 'Superannuation guarantee assumptions. Employer eligibility, payment timing and fund-specific investment returns can differ.',
  },
  'australia-concessional-super': {
    reviewed: '2026-08-17',
    sourceLabel: 'Australian Taxation Office (ATO)',
    sourceUrl: 'https://www.ato.gov.au/Individuals/Super/Growing-and-keeping-track-of-your-super/Caps-limits-and-tax-on-super-contributions/?page=7',
    scope: 'Concessional contribution cap assumptions. Carry-forward eligibility and personal circumstances can affect the effective cap.',
  },
  'uae-end-of-service': {
    reviewed: '2026-08-17',
    sourceLabel: 'UAE Government Portal',
    sourceUrl: 'https://u.ae/en/information-and-services/jobs/employment-in-the-private-sector/end-of-service-benefits-for-employees-in-the-private-sector',
    scope: 'Standard private-sector end-of-service gratuity framework. Contract type, worker status and exceptions can change eligibility or calculation.',
  },
}

export function getTrustMetadata(calculatorId) {
  return trustMetadata[calculatorId] || null
}
