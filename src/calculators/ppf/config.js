export const config = {
  id: 'ppf',
  title: 'PPF Calculator',
  shortDescription: 'Estimate how your yearly PPF deposits could grow over the PPF term.',
  category: 'Savings',
  fields: [
    { name: 'annualInvestment', label: 'How much will you put into PPF each year?', unit: '₹', defaultValue: 150000, min: 500, max: 150000, step: 500 },
    { name: 'annualInterestRate', label: 'PPF interest rate', unit: '%', defaultValue: 7.1, min: 4, max: 12, step: 0.1 },
    { name: 'years', label: 'How many years will you keep the PPF?', unit: 'years', defaultValue: 15, min: 15, max: 40, step: 5 },
  ],
  resultFields: [
    { name: 'maturityAmount', label: 'Estimated PPF balance', primary: true },
    { name: 'totalInvested', label: 'Total money you put in' },
    { name: 'totalReturns', label: 'Estimated interest earned' },
  ],
}
