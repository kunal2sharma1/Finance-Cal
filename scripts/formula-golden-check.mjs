import { getCalculatorById } from '../src/calculatorCatalog.js'
import { formulaGoldenCases } from './formula-golden-cases.mjs'

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function assertCaseShape(test) {
  const errors = []
  if (!test?.calculatorId || typeof test.calculatorId !== 'string') errors.push('missing calculatorId')
  if (!test?.name || typeof test.name !== 'string') errors.push('missing name')
  if (!test?.class || typeof test.class !== 'string') errors.push('missing class')
  if (!test?.inputs || typeof test.inputs !== 'object') errors.push('missing inputs')
  if (!test?.expected || typeof test.expected !== 'object') errors.push('missing expected outputs')
  if (!isFiniteNumber(test?.tolerance) || test.tolerance < 0) errors.push('tolerance must be a non-negative finite number')
  return errors
}

const failures = []
const seenNames = new Set()

for (const test of formulaGoldenCases) {
  const shapeErrors = assertCaseShape(test)
  shapeErrors.forEach((error) => failures.push(`${test?.name || test?.calculatorId || 'unnamed case'}: ${error}`))

  if (seenNames.has(test?.name)) failures.push(`duplicate golden case name: ${test.name}`)
  if (test?.name) seenNames.add(test.name)
}

for (const test of formulaGoldenCases) {
  const calculator = getCalculatorById(test.calculatorId)
  if (!calculator) {
    failures.push(`${test.name}: calculator '${test.calculatorId}' not found`)
    continue
  }

  let result
  try {
    result = calculator.calculate(test.inputs)
    if (result && typeof result.then === 'function') {
      failures.push(`${test.name}: golden cases must use synchronous formulas`)
      continue
    }
  } catch (error) {
    failures.push(`${test.name}: formula threw ${error.message}`)
    continue
  }

  if (!result || typeof result !== 'object') {
    failures.push(`${test.name}: formula did not return an object`)
    continue
  }

  for (const [key, expected] of Object.entries(test.expected)) {
    const actual = result[key]
    const validActual = isFiniteNumber(actual)
    const validExpected = isFiniteNumber(expected)

    if (!validExpected) {
      failures.push(`${test.name}: expected output '${key}' must be a finite number`)
      continue
    }

    if (!validActual || Math.abs(actual - expected) > test.tolerance) {
      failures.push(`${test.name}: ${key} expected ${expected}, got ${actual} (tolerance ${test.tolerance})`)
    }
  }
}

if (failures.length > 0) {
  console.error(`Golden formula framework failed with ${failures.length} issue(s):`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const classes = [...new Set(formulaGoldenCases.map((test) => test.class))].sort().join(', ')
console.log(`Golden formula framework passed: ${formulaGoldenCases.length} cases across classes: ${classes || 'none'}.`)
