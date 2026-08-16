import { countries } from './country.js'

const countryHighlights = {
  IN: {
    slug: 'india',
    title: 'Financial Calculators for India',
    description: 'India-focused financial calculators for investing, savings, loans, salary, retirement and everyday money decisions.',
    intro: 'Use FinCalc with Indian rupee formatting and India-specific financial tools where applicable.',
    priorityCalculatorIds: ['sip', 'lumpsum', 'cagr', 'fd', 'rd', 'ppf', 'epf', 'nps', 'emi', 'home-loan', 'income-tax'],
    seoSections: [
      ['Investing in India', 'Explore SIP, lump-sum, CAGR, PPF, EPF and NPS tools for long-term investing and retirement planning.'],
      ['Loans and salary planning', 'Use EMI, home-loan and salary tools to compare payments, affordability and take-home income using clear assumptions.'],
      ['Why local rules matter', 'Indian tax, pension and government-linked schemes can have country-specific rules. Use localized calculators only where FinCalc has explicit India assumptions.'],
    ],
  },
  US: {
    slug: 'usa',
    title: 'Financial Calculators for the United States',
    description: 'US-focused financial calculators covering retirement accounts, health savings, investing, debt and everyday money planning.',
    intro: 'Use US-specific retirement and HSA tools alongside global investment, savings and debt calculators.',
    priorityCalculatorIds: ['401k', 'roth-ira', 'hsa', 'us-mortgage', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff', 'loan-comparison', 'currency-exchange'],
    seoSections: [
      ['Retirement and health savings', 'Explore 401(k), Roth IRA and HSA calculators alongside general retirement and investment tools.'],
      ['Debt and household planning', 'Compare loan costs, debt payoff timelines, emergency funds and net worth using US-focused inputs where available.'],
      ['US rules vs global calculations', 'Retirement-account and tax rules can be specific to the United States. Global compound-growth tools do not automatically become US tax calculators.'],
    ],
  },
  GB: {
    slug: 'uk',
    title: 'Financial Calculators for the United Kingdom',
    description: 'UK-focused financial calculators covering ISA savings, pensions, Lifetime ISAs, investing and retirement planning.',
    intro: 'Use UK-specific savings and pension tools alongside global financial calculators in GBP.',
    priorityCalculatorIds: ['uk-isa', 'uk-lifetime-isa', 'uk-pension', 'uk-mortgage', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Saving and investing in the UK', 'Explore ISA, Lifetime ISA and pension tools alongside global return and savings calculators.'],
      ['Planning around household finances', 'Use emergency-fund, loan, debt and retirement tools to test different household scenarios in GBP.'],
      ['Country-specific assumptions', 'UK pensions, ISAs and tax rules require localized assumptions. Currency alone is not enough to label a calculator as UK-specific.'],
    ],
  },
  CA: {
    slug: 'canada',
    title: 'Financial Calculators for Canada',
    description: 'Canadian financial calculators covering TFSA, RRSP, FHSA, investing, savings, debt and retirement planning.',
    intro: 'Use Canadian registered-account tools alongside global calculators in Canadian dollars.',
    priorityCalculatorIds: ['canada-tfsa', 'canada-rrsp', 'canada-fhsa', 'canada-mortgage', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Canadian registered accounts', 'Explore TFSA, RRSP and FHSA tools alongside general investment and retirement calculators.'],
      ['Savings and debt planning', 'Compare monthly savings, emergency funds, loan costs and debt payoff using Canadian-dollar scenarios.'],
      ['Local rules matter', 'Registered-account contribution limits and tax treatment are Canada-specific. General investment calculators should not be treated as Canadian tax advice.'],
    ],
  },
  AU: {
    slug: 'australia',
    title: 'Financial Calculators for Australia',
    description: 'Australian financial calculators covering superannuation contributions, investing, savings, debt and retirement planning.',
    intro: 'Use Australian super contribution tools alongside global financial calculators in Australian dollars.',
    priorityCalculatorIds: ['australia-super', 'australia-concessional-super', 'australia-mortgage', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Australian superannuation', 'Use superannuation tools to explore contribution scenarios alongside broader retirement and investment planning.'],
      ['Household money planning', 'Combine savings, emergency-fund, loan and net-worth calculators for a broader financial picture in AUD.'],
      ['Local rules matter', 'Super contribution caps and tax treatment are jurisdiction-specific. Only the clearly localized tools should be treated as Australia-specific rule calculators.'],
    ],
  },
  AE: {
    slug: 'uae',
    title: 'Financial Calculators for the UAE',
    description: 'Financial calculators with UAE dirham formatting for investing, savings, loans, retirement and end-of-service planning.',
    intro: 'Explore global calculators in UAE dirhams and UAE-specific end-of-service planning where applicable.',
    priorityCalculatorIds: ['uae-end-of-service', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['UAE end-of-service planning', 'Use the UAE-specific gratuity calculator where the stated employment assumptions apply, and review the official rules for your circumstances.'],
      ['Savings and investing in AED', 'Use global growth, savings, debt and net-worth tools with UAE dirham presentation for planning scenarios.'],
      ['Local employment rules matter', 'End-of-service benefits and employment arrangements can depend on worker status and contract conditions. Do not treat a generic calculator as an official entitlement statement.'],
    ],
  },
  SG: {
    slug: 'singapore',
    title: 'Financial Calculators for Singapore',
    description: 'Singapore-focused calculators covering CPF contributions, investing, savings, debt, retirement and financial planning.',
    intro: 'Use Singapore CPF tools alongside global calculators in Singapore dollars.',
    priorityCalculatorIds: ['singapore-cpf', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Singapore CPF planning', 'Use the CPF calculator alongside long-term savings and retirement tools for Singapore-focused scenarios.'],
      ['Investing and household finances', 'Combine savings, debt, retirement and net-worth calculators with Singapore-dollar presentation.'],
      ['Local rules matter', 'CPF contribution and withdrawal rules are country-specific. General investment calculators should not be treated as Singapore tax or CPF advice.'],
    ],
  },
}

const countryMap = new Map(countries.map((country) => [country.code, country]))

export function getCountryPage(code) {
  const country = countryMap.get(code)
  const content = country ? countryHighlights[country.code] : null
  if (!country || !content) return null
  return { ...country, ...content }
}

export function getCountryPageBySlug(slug) {
  return countries
    .map((country) => getCountryPage(country.code))
    .find((page) => page?.slug === slug) || null
}

export const countryPages = countries
  .map((country) => getCountryPage(country.code))
  .filter(Boolean)