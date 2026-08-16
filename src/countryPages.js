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
    description: 'Global financial calculators presented with US dollar formatting, plus a growing set of US-specific financial tools.',
    intro: 'Start with global investing, savings, debt and retirement tools while the US-specific calculator set is expanded.',
    priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff', 'loan-comparison', 'currency-exchange'],
  },
  GB: {
    slug: 'uk',
    title: 'Financial Calculators for the United Kingdom',
    description: 'Global financial calculators with UK pound formatting and a growing library of UK-specific financial tools.',
    intro: 'Use global calculators in GBP today; UK-specific calculators will be added as localized financial rules are implemented.',
    priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  CA: {
    slug: 'canada',
    title: 'Financial Calculators for Canada',
    description: 'Financial calculators with Canadian dollar formatting, covering investing, savings, debt and retirement planning.',
    intro: 'Explore global finance tools in Canadian dollars while Canada-specific calculators are developed.',
    priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  AU: {
    slug: 'australia',
    title: 'Financial Calculators for Australia',
    description: 'Financial calculators with Australian dollar formatting for investing, savings, debt, retirement and planning.',
    intro: 'Use global calculators in Australian dollars while localized Australian financial rules are added.',
    priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  AE: {
    slug: 'uae',
    title: 'Financial Calculators for the UAE',
    description: 'Financial calculators with UAE dirham formatting for investing, savings, loans, retirement and personal planning.',
    intro: 'Explore global calculators in UAE dirhams while UAE-specific financial tools are expanded.',
    priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  SG: {
    slug: 'singapore',
    title: 'Financial Calculators for Singapore',
    description: 'Financial calculators with Singapore dollar formatting for investing, savings, debt, retirement and financial planning.',
    intro: 'Use global calculators in Singapore dollars while Singapore-specific financial rules are added.',
    priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
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
