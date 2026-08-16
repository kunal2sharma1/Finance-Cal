export const config = {
  id: 'home-loan',
  title: 'Home Loan Calculator',
  shortDescription: 'Find your monthly home-loan payment and see how extra payments could reduce interest.',
  category: 'Loans',
  fields: [
    { name: 'loanAmount', label: 'How much do you want to borrow for the home?', unit: '₹', defaultValue: 5000000, min: 500000, max: 50000000, step: 50000 },
    { name: 'annualInterestRate', label: 'Interest rate on the home loan', unit: '%', defaultValue: 8.5, min: 0, max: 20, step: 0.05 },
    { name: 'loanTenureYears', label: 'How many years will you repay the loan?', unit: 'years', defaultValue: 20, min: 1, max: 30, step: 1 },
    { name: 'monthlyPrepayment', label: 'Extra amount you could pay every month', unit: '₹', defaultValue: 0, min: 0, max: 200000, step: 1000 },
    { name: 'annualPrepayment', label: 'Extra one-time payment you could make each year', unit: '₹', defaultValue: 0, min: 0, max: 2000000, step: 5000 },
  ],
  resultFields: [
    { name: 'monthlyEMI', label: 'Your monthly home-loan payment', primary: true },
    { name: 'totalInterestPayable', label: 'Total interest you could pay' },
    { name: 'interestSaved', label: 'Interest you could save with extra payments' },
  ],
}
export const assumptions = { MONTHS_PER_YEAR: 12, ANNUAL_PREPAYMENT_INTERVAL_MONTHS: 12, EMI_RECALC_INTERVAL_MONTHS: 12, MAX_AMORTIZATION_MONTHS: 1200 }
