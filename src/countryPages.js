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
    description: 'US financial calculators including retirement account tools alongside global investing, savings, debt and planning calculators.',
    intro: 'Start with 401(k) and Roth IRA tools alongside global calculators presented in US dollars.',
    priorityCalculatorIds: ['401k', 'roth-ira', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'currency-exchange'],
  },
  GB: {
    slug: 'uk',
    title: 'Financial Calculators for the United Kingdom',
    description: 'UK-focused calculators including ISA and pension tools, alongside global financial calculators in pounds.',
    intro: 'Use ISA and pension allowance tools alongside global investing, savings, debt and retirement calculators.',
    priorityCalculatorIds: ['uk-isa', 'uk-pension', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'currency-exchange'],
  },
  CA: {
    slug: 'canada',
    title: 'Financial Calculators for Canada',
    description: 'Canada-focused calculators including TFSA and RRSP contribution-room tools, alongside global financial calculators in Canadian dollars.',
    intro: 'Use TFSA and RRSP tools alongside global investing, savings, debt and retirement calculators.',
    priorityCalculatorIds: ['canada-tfsa', 'canada-rrsp', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'currency-exchange'],
  },
  AU: {
    slug: 'australia',
    title: 'Financial Calculators for Australia',
    description: 'Australian financial calculators including superannuation contribution planning, alongside global tools in Australian dollars.',
    intro: 'Use the Australian superannuation calculator alongside global investing, savings, debt and retirement tools.',
    priorityCalculatorIds: ['australia-super', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'currency-exchange'],
  },
  AE: {
    slug: 'uae',
    title: 'Financial Calculators for the UAE',
    description: 'UAE financial calculators including private-sector expatriate end-of-service gratuity, alongside global tools in AED.',
    intro: 'Use the UAE end-of-service gratuity calculator alongside global savings, debt, investing and planning tools.',
    priorityCalculatorIds: ['uae-end-of-service', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'currency-exchange'],
  },
  SG: {
    slug: 'singapore',
    title: 'Financial Calculators for Singapore',
    description: 'Singapore financial calculators including CPF contribution planning, alongside global financial calculators in Singapore dollars.',
    intro: 'Use the Singapore CPF calculator alongside global investing, savings, debt and retirement tools.',
    priorityCalculatorIds: ['singapore-cpf', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'currency-exchange'],
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
