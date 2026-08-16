import { countries } from './country.js'

const countryHighlights = {
  IN: {
    slug: 'india',
    title: 'Financial Calculators for India',
    description: 'India-focused financial calculators for investing, savings, loans, salary, retirement and everyday money decisions.',
    intro: 'Use FinCalc with Indian rupee formatting and India-specific financial tools where applicable.',
    priorityCalculatorIds: ['sip', 'lumpsum', 'cagr', 'fd', 'rd', 'ppf', 'epf', 'nps', 'emi', 'home-loan', 'income-tax'],
  },
  US: {
    slug: 'usa',
    title: 'Financial Calculators for the United States',
    description: 'US-focused financial calculators covering retirement accounts, health savings, investing, debt and everyday money planning.',
    intro: 'Use US-specific retirement and HSA tools alongside global investment, savings and debt calculators.',
    priorityCalculatorIds: ['401k', 'roth-ira', 'hsa', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff', 'loan-comparison', 'currency-exchange'],
  },
  GB: {
    slug: 'uk',
    title: 'Financial Calculators for the United Kingdom',
    description: 'UK-focused financial calculators covering ISA savings, pensions, Lifetime ISAs, investing and retirement planning.',
    intro: 'Use UK-specific savings and pension tools alongside global financial calculators in GBP.',
    priorityCalculatorIds: ['uk-isa', 'uk-lifetime-isa', 'uk-pension', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  CA: {
    slug: 'canada',
    title: 'Financial Calculators for Canada',
    description: 'Canadian financial calculators covering TFSA, RRSP, FHSA, investing, savings, debt and retirement planning.',
    intro: 'Use Canadian registered-account tools alongside global calculators in Canadian dollars.',
    priorityCalculatorIds: ['canada-tfsa', 'canada-rrsp', 'canada-fhsa', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  AU: {
    slug: 'australia',
    title: 'Financial Calculators for Australia',
    description: 'Australian financial calculators covering superannuation contributions, investing, savings, debt and retirement planning.',
    intro: 'Use Australian super contribution tools alongside global calculators in Australian dollars.',
    priorityCalculatorIds: ['australia-super', 'australia-concessional-super', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  AE: {
    slug: 'uae',
    title: 'Financial Calculators for the UAE',
    description: 'Financial calculators with UAE dirham formatting for investing, savings, loans, retirement and end-of-service planning.',
    intro: 'Explore global calculators in UAE dirhams and UAE-specific end-of-service planning where applicable.',
    priorityCalculatorIds: ['uae-end-of-service', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  SG: {
    slug: 'singapore',
    title: 'Financial Calculators for Singapore',
    description: 'Singapore-focused calculators covering CPF contributions, investing, savings, debt, retirement and financial planning.',
    intro: 'Use Singapore CPF tools alongside global calculators in Singapore dollars.',
    priorityCalculatorIds: ['singapore-cpf', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
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
