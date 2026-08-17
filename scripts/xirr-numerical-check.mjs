import { calculate } from '../src/calculators/xirr/formula.js'

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function assertClose(actual, expected, tolerance, label) {
  if (typeof actual !== 'number' || !Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
    failures.push(`${label}: expected ${expected}, got ${actual}`)
  }
}

const cases = [
  {
    name: 'one-year-10-percent-return',
    inputs: {
      cashFlows: [
        { date: '2020-01-01', direction: 'invested', amount: '100000' },
        { date: '2021-01-01', direction: 'received', amount: '110000' },
      ],
    },
    expectedXirr: 10,
  },
  {
    name: 'two-year-10-percent-return',
    inputs: {
      cashFlows: [
        { date: '2020-01-01', direction: 'invested', amount: '100000' },
        { date: '2022-01-01', direction: 'received', amount: '121000' },
      ],
    },
    expectedXirr: 10,
  },
  {
    name: 'irregular-dates',
    inputs: {
      cashFlows: [
        { date: '2020-01-01', direction: 'invested', amount: '100000' },
        { date: '2020-07-01', direction: 'invested', amount: '50000' },
        { date: '2022-01-01', direction: 'received', amount: '171000' },
      ],
    },
    expectedXirr: 4.88,
    tolerance: 0.02,
  },
]

for (const test of cases) {
  const result = calculate(test.inputs)
  assert(result.isValid === true, `${test.name}: expected valid result`)
  assertClose(result.xirr, test.expectedXirr, test.tolerance ?? 0.01, `${test.name}/xirr`)
}

const invalidCases = [
  {
    name: 'too-few-cashflows',
    inputs: { cashFlows: [{ date: '2020-01-01', direction: 'invested', amount: '100000' }] },
    message: 'Add at least two valid cash flows to calculate XIRR.',
  },
  {
    name: 'only-investments',
    inputs: {
      cashFlows: [
        { date: '2020-01-01', direction: 'invested', amount: '100000' },
        { date: '2021-01-01', direction: 'invested', amount: '10000' },
      ],
    },
    message: 'XIRR needs at least one investment and one received cash flow.',
  },
  {
    name: 'only-receipts',
    inputs: {
      cashFlows: [
        { date: '2020-01-01', direction: 'received', amount: '100000' },
        { date: '2021-01-01', direction: 'received', amount: '10000' },
      ],
    },
    message: 'XIRR needs at least one investment and one received cash flow.',
  },
  {
    name: 'invalid-date',
    inputs: {
      cashFlows: [
        { date: 'not-a-date', direction: 'invested', amount: '100000' },
        { date: '2021-01-01', direction: 'received', amount: '110000' },
      ],
    },
    message: 'Enter valid dates for every cash flow.',
  },
]

for (const test of invalidCases) {
  const result = calculate(test.inputs)
  assert(result.isValid === false, `${test.name}: expected invalid result`)
  assert(result.message === test.message, `${test.name}: unexpected message '${result.message}'`)
  assert(result.xirr === null, `${test.name}: invalid result must not expose an XIRR value`)
  assert(Number.isFinite(result.netCashFlow), `${test.name}: netCashFlow must remain finite`)
  assert(Number.isFinite(result.totalInvested), `${test.name}: totalInvested must remain finite`)
  assert(Number.isFinite(result.totalReceived), `${test.name}: totalReceived must remain finite`)
}

if (failures.length > 0) {
  console.error(`XIRR numerical validation failed with ${failures.length} issue(s):`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`XIRR numerical validation passed: ${cases.length} valid convergence cases and ${invalidCases.length} invalid-input cases.`)
