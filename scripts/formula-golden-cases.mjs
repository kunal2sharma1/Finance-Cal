export const formulaGoldenCases = [
  {
    calculatorId: 'sip',
    name: 'SIP 10k/month at 12% for 10 years',
    class: 'standard',
    inputs: { monthlyInvestment: 10000, annualReturnRate: 12, years: 10 },
    expected: { totalValue: 2323391, totalInvested: 1200000, totalReturns: 1123391 },
    tolerance: 1,
  },
  {
    calculatorId: 'emi',
    name: 'EMI 10 lakh at 10% for 5 years',
    class: 'standard',
    inputs: { loanAmount: 1000000, annualInterestRate: 10, loanTenureYears: 5 },
    expected: { monthlyEMI: 21247, totalAmountPayable: 1274823, totalInterestPayable: 274823 },
    tolerance: 1,
  },
  {
    calculatorId: 'real-return',
    name: 'Real return 8% nominal and 5% inflation',
    class: 'standard',
    inputs: { nominalReturn: 8, inflationRate: 5 },
    expected: { realReturn: 2.857142857142869 },
    tolerance: 0.000001,
  },
  {
    calculatorId: 'savings-rate',
    name: 'Savings rate 20000 of 100000',
    class: 'standard',
    inputs: { monthlyIncome: 100000, monthlySavings: 20000 },
    expected: { savingsRate: 20, monthlySpending: 80000, annualSavings: 240000 },
    tolerance: 0.000001,
  },
]
