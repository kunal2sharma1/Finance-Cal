export const config = {
  id: 'loan-prepayment',
  title: 'Loan Prepayment Calculator',
  shortDescription:
    'See how extra payments could reduce your loan tenure and interest.',
  category: 'Loans & Debt',

  fields: [
    { name: 'outstandingLoan', label: 'How much do you still owe?', unit: '₹', defaultValue: 3000000, min: 0, max: 200000000, step: 10000 },
    { name: 'annualInterestRate', label: 'Current loan interest rate', unit: '%', defaultValue: 9, min: 0, max: 30, step: 0.1 },
    { name: 'remainingYears', label: 'How many years are left?', unit: 'years', defaultValue: 15, min: 1, max: 40, step: 1 },
    { name: 'extraMonthlyPayment', label: 'How much extra could you pay every month?', unit: '₹', defaultValue: 5000, min: 0, max: 500000, step: 500 },
    { name: 'annualLumpSum', label: 'How much extra could you pay once each year?', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 5000 },
  ],

  resultFields: [
    { name: 'interestWithoutPrepayment', label: 'Interest without extra payments', primary: true },
    { name: 'interestWithPrepayment', label: 'Estimated interest with extra payments' },
    { name: 'interestSaved', label: 'Estimated interest saved' },
    { name: 'monthsSaved', label: 'Months of loan time saved', unit: 'months' },
  ],
}
