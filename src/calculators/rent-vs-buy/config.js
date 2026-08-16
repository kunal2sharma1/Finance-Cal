export const config = {
  id: 'rent-vs-buy',
  title: 'Rent vs Buy Calculator',
  shortDescription:
    'Compare the estimated long-term cost of renting with buying a home.',
  category: 'Major Financial Decisions',

  fields: [
    { name: 'homePrice', label: 'What is the home price?', unit: '₹', defaultValue: 5000000, min: 0, max: 500000000, step: 10000 },
    { name: 'downPayment', label: 'How much would you pay upfront?', unit: '₹', defaultValue: 1000000, min: 0, max: 500000000, step: 10000 },
    { name: 'loanRate', label: 'Home-loan interest rate', unit: '%', defaultValue: 8.5, min: 0, max: 20, step: 0.1 },
    { name: 'loanYears', label: 'How many years would you repay the loan?', unit: 'years', defaultValue: 20, min: 1, max: 40, step: 1 },
    { name: 'monthlyRent', label: 'Monthly rent for a similar home', unit: '₹', defaultValue: 25000, min: 0, max: 1000000, step: 500 },
    { name: 'annualRentIncrease', label: 'Expected yearly increase in rent', unit: '%', defaultValue: 5, min: 0, max: 30, step: 0.5 },
    { name: 'annualPropertyGrowth', label: 'Expected yearly home-price growth', unit: '%', defaultValue: 5, min: 0, max: 30, step: 0.5 },
    { name: 'yearsCompare', label: 'How many years should we compare?', unit: 'years', defaultValue: 10, min: 1, max: 40, step: 1 },
    { name: 'annualMaintenanceRate', label: 'Yearly maintenance as a percentage of home price', unit: '%', defaultValue: 1, min: 0, max: 10, step: 0.1 },
  ],

  resultFields: [
    { name: 'buyingCost', label: 'Estimated cost of buying over the comparison period', primary: true },
    { name: 'rentingCost', label: 'Estimated cost of renting over the comparison period' },
    { name: 'difference', label: 'Difference between the two options' },
    { name: 'estimatedHomeValue', label: 'Estimated home value at the end' },
  ],
}
