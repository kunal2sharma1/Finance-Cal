export const assetFields = [
  { name: 'cashAndBank', label: 'Money in cash and bank accounts', unit: '₹', defaultValue: 150000, min: 0, max: 10000000, step: 1000, section: 'asset', classification: 'liquid' },
  { name: 'fixedDeposits', label: 'Fixed deposits', unit: '₹', defaultValue: 200000, min: 0, max: 10000000, step: 1000, section: 'asset', classification: 'liquid' },
  { name: 'stocksEquity', label: 'Stocks', unit: '₹', defaultValue: 150000, min: 0, max: 50000000, step: 1000, section: 'asset', classification: 'investment' },
  { name: 'mutualFunds', label: 'Mutual funds', unit: '₹', defaultValue: 250000, min: 0, max: 50000000, step: 1000, section: 'asset', classification: 'investment' },
  { name: 'retirementInvestments', label: 'Retirement savings and investments', unit: '₹', defaultValue: 400000, min: 0, max: 50000000, step: 1000, section: 'asset', classification: 'investment' },
  { name: 'goldPreciousMetals', label: 'Gold and precious metals', unit: '₹', defaultValue: 100000, min: 0, max: 10000000, step: 1000, section: 'asset', classification: 'investment' },
  { name: 'realEstate', label: 'Property and real estate', unit: '₹', defaultValue: 5000000, min: 0, max: 200000000, step: 50000, section: 'asset', classification: 'nonLiquid' },
  { name: 'vehicles', label: 'Vehicles', unit: '₹', defaultValue: 600000, min: 0, max: 20000000, step: 10000, section: 'asset', classification: 'nonLiquid' },
  { name: 'otherAssets', label: 'Other things you own', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 1000, section: 'asset', classification: 'nonLiquid' },
]

export const liabilityFields = [
  { name: 'homeLoan', label: 'Home loan still to repay', unit: '₹', defaultValue: 2500000, min: 0, max: 100000000, step: 10000, section: 'liability' },
  { name: 'carLoan', label: 'Car loan still to repay', unit: '₹', defaultValue: 0, min: 0, max: 5000000, step: 5000, section: 'liability' },
  { name: 'personalLoan', label: 'Personal loan still to repay', unit: '₹', defaultValue: 0, min: 0, max: 5000000, step: 5000, section: 'liability' },
  { name: 'educationLoan', label: 'Education loan still to repay', unit: '₹', defaultValue: 0, min: 0, max: 5000000, step: 5000, section: 'liability' },
  { name: 'creditCardDebt', label: 'Credit card debt', unit: '₹', defaultValue: 0, min: 0, max: 1000000, step: 1000, section: 'liability' },
  { name: 'otherLiabilities', label: 'Other money you owe', unit: '₹', defaultValue: 0, min: 0, max: 5000000, step: 1000, section: 'liability' },
]

export const config = {
  id: 'net-worth',
  title: 'Net Worth Calculator',
  shortDescription: 'See how much you own, how much you owe, and what is left after debts.',
  category: 'Planning',
  fields: [...assetFields, ...liabilityFields],
  resultFields: [
    { name: 'netWorth', label: 'What you are worth after debts', primary: true },
    { name: 'totalAssets', label: 'Everything you own' },
    { name: 'totalLiabilities', label: 'Everything you owe' },
    { name: 'investableAssets', label: 'Money and investments that could be used or reinvested' },
  ],
}
