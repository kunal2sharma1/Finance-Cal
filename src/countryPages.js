import { countries } from './country.js'

const countryHighlights = {
  IN: {
    slug: 'india',
    title: 'Financial Calculators for India',
    description: 'India-focused financial calculators for investing, savings, loans, salary, retirement and everyday money decisions.',
    intro: 'Use FinCalc with Indian rupee formatting and India-specific financial tools where applicable.',
    priorityCalculatorIds: ['sip', 'lumpsum', 'cagr', 'fd', 'rd', 'ppf', 'epf', 'nps', 'emi', 'home-loan', 'income-tax'],
    seoSections: [
      ['Investing in India', 'Use SIP, lump-sum, CAGR, PPF, EPF and NPS tools to compare contribution, growth and long-term planning scenarios.'],
      ['Loans and salary planning', 'Use EMI, home-loan, income-tax and salary calculators together when comparing a borrowing decision with the cash flow needed to support it.'],
      ['Use India-specific rules carefully', 'Where a calculator depends on a local tax, pension or government-program rule, FinCalc treats the result as a planning estimate and separates local assumptions from global math.'],
    ],
  },
  US: {
    slug: 'usa',
    title: 'Financial Calculators for the United States',
    description: 'US-focused financial calculators covering retirement accounts, health savings, investing, debt and everyday money planning.',
    intro: 'Use US-specific retirement and HSA tools alongside global investment, savings and debt calculators.',
    priorityCalculatorIds: ['401k', 'roth-ira', 'hsa', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'debt-payoff', 'loan-comparison', 'currency-exchange'],
    seoSections: [
      ['Retirement and tax-advantaged accounts', 'Use the 401(k), Roth IRA and HSA tools alongside broader retirement and investment calculators to compare contribution and growth scenarios.'],
      ['Debt and cash-flow planning', 'Combine loan comparison, debt payoff, emergency-fund and savings tools to evaluate how monthly obligations affect your wider financial plan.'],
      ['Country-specific assumptions', 'Account rules and tax treatment can change. Treat localized calculators as planning tools and verify current official rules before making an account or tax decision.'],
    ],
  },
  GB: {
    slug: 'uk',
    title: 'Financial Calculators for the United Kingdom',
    description: 'UK-focused financial calculators covering ISA savings, pensions, Lifetime ISAs, investing and retirement planning.',
    intro: 'Use UK-specific savings and pension tools alongside global financial calculators in GBP.',
    priorityCalculatorIds: ['uk-isa', 'uk-lifetime-isa', 'uk-pension', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Saving and investing in the UK', 'Use ISA, Lifetime ISA and pension tools alongside compound-growth and investment-return calculators to compare long-term scenarios.'],
      ['Planning around cash flow', 'Emergency-fund, monthly-savings and debt tools can help connect long-term goals with the amount you can realistically set aside each month.'],
      ['Check current rules', 'UK tax, pension and savings rules are time-sensitive. Localized calculators are estimates and should be checked against the latest official guidance.'],
    ],
  },
  CA: {
    slug: 'canada',
    title: 'Financial Calculators for Canada',
    description: 'Canadian financial calculators covering TFSA, RRSP, FHSA, investing, savings, debt and retirement planning.',
    intro: 'Use Canadian registered-account tools alongside global calculators in Canadian dollars.',
    priorityCalculatorIds: ['canada-tfsa', 'canada-rrsp', 'canada-fhsa', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Registered-account planning', 'Use TFSA, RRSP and FHSA calculators with broader investment and savings tools to compare contribution and growth scenarios.'],
      ['Balance goals and debt', 'Combine savings, emergency-fund, debt payoff and loan comparison tools when building a plan around monthly cash flow.'],
      ['Verify current Canadian rules', 'Contribution limits, tax treatment and account rules can change. Use the calculator as an estimate and confirm current requirements with official sources.'],
    ],
  },
  AU: {
    slug: 'australia',
    title: 'Financial Calculators for Australia',
    description: 'Australian financial calculators covering superannuation contributions, investing, savings, debt and retirement planning.',
    intro: 'Use Australian super contribution tools alongside global calculators in Australian dollars.',
    priorityCalculatorIds: ['australia-super', 'australia-concessional-super', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Superannuation and long-term planning', 'Use the Australian super calculators alongside investment-return and retirement tools to explore contribution and growth scenarios.'],
      ['Everyday cash-flow decisions', 'Savings, emergency-fund, loan comparison and debt payoff tools help connect long-term goals with the cash flow available today.'],
      ['Check current contribution rules', 'Superannuation rules and limits can change. Treat localized results as estimates and verify current requirements with official guidance.'],
    ],
  },
  AE: {
    slug: 'uae',
    title: 'Financial Calculators for the UAE',
    description: 'Financial calculators with UAE dirham formatting for investing, savings, loans, retirement and end-of-service planning.',
    intro: 'Explore global calculators in UAE dirhams and UAE-specific end-of-service planning where applicable.',
    priorityCalculatorIds: ['uae-end-of-service', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['Salary and end-of-service planning', 'Use the UAE end-of-service calculator together with savings, emergency-fund and investment tools to connect employment decisions with longer-term planning.'],
      ['Borrowing and savings', 'Loan comparison, debt payoff and monthly-savings tools can help you test how a financing decision changes your available cash flow.'],
      ['Local employment rules matter', 'End-of-service outcomes can depend on employment terms and applicable rules. Use the calculator as a planning estimate and verify the current rule for your situation.'],
    ],
  },
  SG: {
    slug: 'singapore',
    title: 'Financial Calculators for Singapore',
    description: 'Singapore-focused calculators covering CPF contributions, investing, savings, debt, retirement and financial planning.',
    intro: 'Use Singapore CPF tools alongside global calculators in Singapore dollars.',
    priorityCalculatorIds: ['singapore-cpf', 'compound-interest', 'cagr', 'investment-return', 'monthly-savings', 'emergency-fund', 'retirement', 'net-worth', 'loan-comparison', 'debt-payoff', 'currency-exchange'],
    seoSections: [
      ['CPF and retirement planning', 'Use the Singapore CPF calculator with broader retirement and investment tools to explore long-term contribution and growth scenarios.'],
      ['Plan around monthly cash flow', 'Savings, emergency-fund, debt payoff and loan comparison tools can help you compare immediate obligations with longer-term goals.'],
      ['Verify current CPF rules', 'Contribution rates, limits and other CPF rules can change. Use the calculator as an estimate and confirm current requirements with official guidance.'],
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
