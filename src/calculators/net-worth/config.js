// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.
//
// This calculator has far more input categories than a typical one in this
// project (9 asset types + 6 liability types, instead of 3-4 fields), so —
// unlike the other calculators — the category list itself is exported here
// as `assetFields` and `liabilityFields`, and formula.js imports those two
// arrays directly instead of naming each category by hand. That's what
// keeps every category, default, limit, and classification in this one
// file: add, remove, or reclassify a category here and formula.js picks it
// up automatically, with no changes needed there.
//
// `config.fields` below is just `assetFields` and `liabilityFields`
// concatenated into the single flat list CalculatorForm.jsx (shared, not
// modified for this calculator) expects — it only ever renders one flat
// list of number+slider rows, so assets and liabilities appear as one
// continuous form, in that order, the same way every other calculator's
// fields do.
//
// `classification` on each asset field ('liquid' | 'investment' |
// 'nonLiquid') is what formula.js uses to compute Liquid Assets, Investment
// Assets, Non-Liquid Assets, and Investable Assets without hardcoding any
// category name. Liabilities intentionally don't get an equivalent
// sub-classification (e.g. secured/unsecured): that split is genuinely
// ambiguous for some categories (an education loan may or may not be
// secured, depending on the amount and lender), so formula.js instead
// reports a plain per-category liability breakdown, which every category
// always has an unambiguous answer for.

export const assetFields = [
  {
    name: 'cashAndBank',
    label: 'Cash / bank balance',
    unit: '₹',
    defaultValue: 150000,
    min: 0,
    max: 10000000,
    step: 1000,
    section: 'asset',
    classification: 'liquid',
  },
  {
    name: 'fixedDeposits',
    label: 'Fixed deposits',
    unit: '₹',
    defaultValue: 200000,
    min: 0,
    max: 10000000,
    step: 1000,
    section: 'asset',
    classification: 'liquid',
  },
  {
    name: 'stocksEquity',
    label: 'Stocks / equity investments',
    unit: '₹',
    defaultValue: 150000,
    min: 0,
    max: 50000000,
    step: 1000,
    section: 'asset',
    classification: 'investment',
  },
  {
    name: 'mutualFunds',
    label: 'Mutual funds',
    unit: '₹',
    defaultValue: 250000,
    min: 0,
    max: 50000000,
    step: 1000,
    section: 'asset',
    classification: 'investment',
  },
  {
    name: 'retirementInvestments',
    label: 'Retirement investments',
    unit: '₹',
    defaultValue: 400000,
    min: 0,
    max: 50000000,
    step: 1000,
    section: 'asset',
    classification: 'investment',
  },
  {
    name: 'goldPreciousMetals',
    label: 'Gold / precious metals',
    unit: '₹',
    defaultValue: 100000,
    min: 0,
    max: 10000000,
    step: 1000,
    section: 'asset',
    classification: 'investment',
  },
  {
    name: 'realEstate',
    label: 'Real estate',
    unit: '₹',
    defaultValue: 5000000,
    min: 0,
    max: 200000000,
    step: 50000,
    section: 'asset',
    classification: 'nonLiquid',
  },
  {
    name: 'vehicles',
    label: 'Vehicles',
    unit: '₹',
    defaultValue: 600000,
    min: 0,
    max: 20000000,
    step: 10000,
    section: 'asset',
    classification: 'nonLiquid',
  },
  {
    name: 'otherAssets',
    label: 'Other assets',
    unit: '₹',
    defaultValue: 0,
    min: 0,
    max: 10000000,
    step: 1000,
    section: 'asset',
    classification: 'nonLiquid',
  },
]

export const liabilityFields = [
  {
    name: 'homeLoan',
    label: 'Home loan',
    unit: '₹',
    defaultValue: 2500000,
    min: 0,
    max: 100000000,
    step: 10000,
    section: 'liability',
  },
  {
    name: 'carLoan',
    label: 'Car loan',
    unit: '₹',
    defaultValue: 0,
    min: 0,
    max: 5000000,
    step: 5000,
    section: 'liability',
  },
  {
    name: 'personalLoan',
    label: 'Personal loan',
    unit: '₹',
    defaultValue: 0,
    min: 0,
    max: 5000000,
    step: 5000,
    section: 'liability',
  },
  {
    name: 'educationLoan',
    label: 'Education loan',
    unit: '₹',
    defaultValue: 0,
    min: 0,
    max: 5000000,
    step: 5000,
    section: 'liability',
  },
  {
    name: 'creditCardDebt',
    label: 'Credit card debt',
    unit: '₹',
    defaultValue: 0,
    min: 0,
    max: 1000000,
    step: 1000,
    section: 'liability',
  },
  {
    name: 'otherLiabilities',
    label: 'Other liabilities',
    unit: '₹',
    defaultValue: 0,
    min: 0,
    max: 5000000,
    step: 1000,
    section: 'liability',
  },
]

export const config = {
  id: 'net-worth',
  title: 'Net Worth Calculator',
  shortDescription:
    'See your total net worth once every asset and debt is added up.',
  category: 'Planning',

  fields: [...assetFields, ...liabilityFields],

  resultFields: [
    { name: 'netWorth', label: 'Net worth', primary: true },
    { name: 'totalAssets', label: 'Total assets' },
    { name: 'totalLiabilities', label: 'Total liabilities' },
    { name: 'investableAssets', label: 'Investable assets' },
  ],
}