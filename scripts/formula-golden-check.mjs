import { getCalculatorById } from '../src/calculatorCatalog.js'

const cases = [
  {
    calculatorId: 'sip',
    name: 'SIP 10k/month at 12% for 10 years',
    inputs: { monthlyInvestment: 10000, annualReturnRate: 12, years: 10 },
    expected: { totalValue: 2323391, totalInvested: 1200000, totalReturns: 1123391 },
    tolerance: 1,
  },
  {
    calculatorId: 'emi',
    name: 'EMI 10 lakh at 10% for 5 years',
    inputs: { loanAmount: 1000000, annualInterestRate: 10, loanTenureYears: 5 },
    expected: { monthlyEMI: 21247, totalAmountPayable: 1274823, totalInterestPayable: 274823 },
    tolerance: 1,
  },
  {
    calculatorId: 'real-return',
    name: 'Real return 8% nominal and 5% inflation',
    inputs: { nominalReturnRate: 8, inflationRate: 5 },
    expected: { realReturnRate: 2.857142857142869 },
    tolerance: 0.000001,
  },
  {
    calculatorId: 'savings-rate',
    name: 'Savings rate 20000 of 100000',
    inputs: { savingsAmount: 20000, incomeAmount: 100000 },
    expected: { savingsRate: 20 },
    tolerance: 0.000001,
  },
]

const failures = []

for (const test of cases) {
  const calculator = getCalculatorById(test.calculatorId)
  if (!calculator) {
    failures.push(`${test.name}: calculator '${test.calculatorId}' not found`)
    continue
  }

  let result
  try {
    result = calculator.calculate(test.inputs)
  } catch (error) {
    failures.push(`${test.name}: formula threw ${error.message}`)
    continue
  }

  for (const [key, expected] of Object.entries(test.expected)) {
    const actual = result?.[key]
    if (typeof actual !== 'number' || !Number.isFinite(actual) || Math.abs(actual - expected) > test.tolerance) {
      failures.push(`${test.name}: ${key} expected ${expected}, got ${actual}`)
    }
  }
}

if (failures.length) {
  console.error(`Golden formula check failed with ${failures.length} issue(s):`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Golden formula check passed: ${cases.length} representative cases.`)
