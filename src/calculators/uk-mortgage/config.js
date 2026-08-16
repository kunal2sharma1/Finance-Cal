export const config = {
  id: 'uk-mortgage',
  title: 'UK Mortgage Calculator',
  shortDescription: 'Estimate monthly mortgage payments and total interest for a UK-pound home loan using your assumptions.',
  category: 'Loans',
  countries: ['GB'],
  currency: 'GBP',
  fields: [
    { name: 'loanAmount', label: 'Mortgage amount', unit: '£', defaultValue: 300000, min: 0, max: 5000000, step: 1000 },
    { name: 'annualRate', label: 'Annual interest rate', unit: '%', defaultValue: 5.5, min: 0, max: 30, step: 0.01 },
    { name: 'termYears', label: 'Mortgage term', unit: 'years', defaultValue: 25, min: 1, max: 50, step: 1 },
  ],
  resultFields: [
    { name: 'monthlyPayment', label: 'Estimated monthly payment', primary: true, unit: '£' },
    { name: 'totalInterest', label: 'Total interest', unit: '£' },
    { name: 'totalPaid', label: 'Total paid', unit: '£' },
  ],
}
