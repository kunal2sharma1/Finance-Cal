export const config = {
  id: 'us-mortgage',
  title: 'US Mortgage Calculator',
  shortDescription: 'Estimate monthly mortgage payments and total interest for a US-dollar home loan using your loan assumptions.',
  category: 'Loans',
  countries: ['US'],
  currency: 'USD',
  fields: [
    { name: 'loanAmount', label: 'Loan amount', unit: '$', defaultValue: 400000, min: 0, max: 5000000, step: 1000 },
    { name: 'annualRate', label: 'Annual interest rate', unit: '%', defaultValue: 6.5, min: 0, max: 30, step: 0.01 },
    { name: 'termYears', label: 'Loan term', unit: 'years', defaultValue: 30, min: 1, max: 50, step: 1 },
  ],
  resultFields: [
    { name: 'monthlyPayment', label: 'Estimated monthly payment', primary: true, unit: '$' },
    { name: 'totalInterest', label: 'Total interest', unit: '$' },
    { name: 'totalPaid', label: 'Total paid', unit: '$' },
  ],
}
