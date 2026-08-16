export const config = {
  id: 'loan-eligibility',
  title: 'Loan Eligibility Calculator',
  shortDescription: 'Estimate how much loan you may be able to afford based on your income and current commitments.',
  category: 'Loans',
  fields: [
    { name: 'monthlyIncome', label: 'How much money do you take home each month?', unit: '₹', defaultValue: 75000, min: 0, max: 2000000, step: 1000 },
    { name: 'existingEMI', label: 'How much do you already pay toward loans each month?', unit: '₹', defaultValue: 0, min: 0, max: 1000000, step: 500 },
    { name: 'otherObligations', label: 'Other fixed monthly commitments', unit: '₹', defaultValue: 0, min: 0, max: 500000, step: 500 },
    { name: 'annualInterestRate', label: 'Interest rate on the new loan', unit: '%', defaultValue: 9, min: 0, max: 25, step: 0.1 },
    { name: 'loanTenureYears', label: 'How many years would you repay the new loan?', unit: 'years', defaultValue: 20, min: 1, max: 30, step: 1 },
    { name: 'maxFOIR', label: 'Share of your monthly income used for loan payments', unit: '%', defaultValue: 50, min: 10, max: 90, step: 1 },
  ],
  resultFields: [
    { name: 'eligibleLoanAmount', label: 'Estimated maximum loan you could afford', primary: true },
    { name: 'maxAffordableEMI', label: 'Maximum monthly loan-payment budget' },
    { name: 'totalExistingObligations', label: 'Your current monthly commitments' },
    { name: 'maxNewEMI', label: 'Room left for a new loan payment' },
    { name: 'totalRepayment', label: 'Estimated total repayment on the new loan' },
    { name: 'totalInterest', label: 'Estimated interest on the new loan' },
    { name: 'emiToIncomeRatio', label: 'Loan-payment share of income', unit: '%' },
  ],
}
