import { calculators } from '../src/calculatorCatalog.js'
import { getPrecisionPolicy, getResultDisplayPrecision } from '../src/precisionPolicy.js'

const failures = []
const validCertainty = new Set(['exact', 'estimate', 'projection', 'scenario', 'live-data'])

for (const calculator of calculators) {
  const { resultCertainty } = calculator.meta || {}
  if (!validCertainty.has(resultCertainty)) {
    failures.push(`Invalid certainty for ${calculator.config.id}: ${resultCertainty}`)
    continue
  }

  const policy = getPrecisionPolicy(resultCertainty)
  for (const key of ['currencyDecimals', 'percentDecimals', 'ratioDecimals']) {
    if (!Number.isInteger(policy[key]) || policy[key] < 0) {
      failures.push(`Invalid precision policy ${key} for ${calculator.config.id}`)
    }
  }

  for (const field of calculator.config.resultFields || []) {
    const precision = getResultDisplayPrecision(resultCertainty, field.unit)
    if (!Number.isInteger(precision) || precision < 0) {
      failures.push(`Invalid result precision for ${calculator.config.id}.${field.name}`)
    }
  }
}

const representativeExpectations = {
  xirr: 'exact',
  ppf: 'scenario',
  retirement: 'projection',
  'currency-exchange': 'live-data',
}

for (const [id, expected] of Object.entries(representativeExpectations)) {
  const calculator = calculators.find((item) => item.config.id === id)
  if (!calculator) continue
  if (calculator.meta.resultCertainty !== expected) {
    failures.push(`Unexpected certainty for ${id}: expected ${expected}, found ${calculator.meta.resultCertainty}`)
  }
}

if (failures.length) {
  console.error('Precision policy validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Precision policy validation passed for ${calculators.length} calculators.`)
