export const config = {
  id: 'australia-mortgage',
  title: 'Australia Mortgage Calculator',
  shortDescription: 'Estimate monthly home-loan payments and total interest for an Australian-dollar mortgage using your assumptions.',
  category: 'Loans',
  countries: ['AU'],
  currency: 'AUD',
  fields: [
    { name: 'loanAmount', label: 'Home loan amount', unit: 'A$', defaultValue: 600000, min: 0, max: 5000000, step: 1000 },
    { name: 'annualRate', label: 'Annual interest rate', unit: '%', defaultValue: 6, min: 0, max: 30, step: 0.01 },
    { name: 'termYears', label: 'Loan term', unit: 'years', defaultValue: 30, min: 1, max: 50, step: 1 },
  ],
  resultFields: [
    { name: 'monthlyPayment', label: 'Estimated monthly payment', primary: true, unit: 'A$' },
    { name: 'totalInterest', label: 'Total interest', unit: 'A$' },
    { name: 'totalPaid', label: 'Total paid', unit: 'A$' },
  ],
}
