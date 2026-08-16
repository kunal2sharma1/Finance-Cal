import { countries } from './country.js'

const countryHighlights = {
  IN: {
    slug: 'india', title: 'Financial Calculators for India', description: 'India-focused financial calculators for investing, savings, loans, salary, retirement and everyday money decisions.', intro: 'Use FinCalc with Indian rupee formatting and India-specific financial tools where applicable.', priorityCalculatorIds: ['sip', 'lumpsum', 'cagr', 'fd', 'rd', 'ppf', 'epf', 'nps', 'emi', 'home-loan', 'income-tax'],
  },
  US: {
    slug: 'usa', title: 'Financial Calculators for the United States', description: 'US-specific tools for retirement contributions and other financial decisions, alongside global calculators formatted in US dollars.', intro: 'Start with global finance tools and localized US retirement calculators such as 401(k) and Roth IRA.', priorityCalculatorIds: ['401k', 'roth-ira', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff'],
  },
  GB: {
    slug: 'uk', title: 'Financial Calculators for the United Kingdom', description: 'UK-specific tools for ISA and pension planning, alongside global calculators formatted in pounds sterling.', intro: 'Use global calculators in GBP plus localized UK ISA and pension allowance tools.', priorityCalculatorIds: ['uk-isa', 'uk-pension', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff'],
  },
  CA: {
    slug: 'canada', title: 'Financial Calculators for Canada', description: 'Canadian-specific tools for TFSA and RRSP planning, alongside global calculators formatted in Canadian dollars.', intro: 'Explore global tools in CAD plus localized TFSA and RRSP contribution-room estimates.', priorityCalculatorIds: ['canada-tfsa', 'canada-rrsp', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff'],
  },
  AU: {
    slug: 'australia', title: 'Financial Calculators for Australia', description: 'Financial calculators with Australian dollar formatting for investing, savings, debt, retirement and planning.', intro: 'Use global calculators in Australian dollars while localized Australian financial rules are added.', priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  AE: {
    slug: 'uae', title: 'Financial Calculators for the UAE', description: 'Financial calculators with UAE dirham formatting for investing, savings, loans, retirement and personal planning.', intro: 'Explore global calculators in UAE dirhams while UAE-specific financial tools are expanded.', priorityCalculatorIds: ['compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
  },
  SG: {
    slug: 'singapore', title: 'Financial Calculators for Singapore', description: 'Singapore-specific CPF planning alongside global finance tools formatted in Singapore dollars.', intro: 'Use global finance tools in SGD plus the localized Singapore CPF contribution calculator.', priorityCalculatorIds: ['singapore-cpf', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff', 'currency-exchange'],
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
  return countries.map((country) => getCountryPage(country.code)).find((page) => page?.slug === slug) || null
}

export const countryPages = countries.map((country) => getCountryPage(country.code)).filter(Boolean)
