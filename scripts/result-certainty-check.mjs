import { calculators } from '../src/calculatorCatalog.js'
import { CALCULATOR_CERTAINTY_LEVELS } from '../src/calculatorSchema.js'
import { getResultCertainty } from '../src/calculatorCertainty.js'

const failures = []
const byId = new Map(calculators.map((calculator) => [calculator.config.id, calculator]))

function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(calculators.length > 0, 'No calculators found for result-certainty validation')

for (const calculator of calculators) {
  const { id } = calculator.config
  const { modelScope, resultCertainty, resultCertaintyNote } = calculator.meta || {}
  const expected = getResultCertainty(modelScope)

  assert(CALCULATOR_CERTAINTY_LEVELS.includes(resultCertainty), `Invalid result certainty: ${id}`)
  assert(resultCertainty === expected.level, `Certainty mismatch: ${id}`)
  assert(typeof resultCertaintyNote === 'string' && resultCertaintyNote.trim(), `Missing certainty note: ${id}`)
  assert(resultCertaintyNote === expected.note, `Certainty note mismatch: ${id}`)
}

const expectedByScope = {
  exact: 'exact',
  'standard-model': 'estimate',
  'simplified-model': 'scenario',
  'rule-based-illustration': 'scenario',
  projection: 'projection',
  'live-data': 'live-data',
}

for (const [scope, expectedCertainty] of Object.entries(expectedByScope)) {
  const scoped = calculators.filter(({ meta }) => meta.modelScope === scope)
  if (scoped.length === 0) continue
  for (const calculator of scoped) {
    assert(
      calculator.meta.resultCertainty === expectedCertainty,
      `Unexpected certainty for ${calculator.config.id}: expected ${expectedCertainty}, found ${calculator.meta.resultCertainty}`,
    )
  }
}

const requiredExamples = {
  ppf: 'scenario',
  retirement: 'projection',
  xirr: 'exact',
}

for (const [id, expectedCertainty] of Object.entries(requiredExamples)) {
  const calculator = byId.get(id)
  assert(calculator, `Required certainty-reviewed calculator missing: ${id}`)
  if (calculator) {
    assert(
      calculator.meta.resultCertainty === expectedCertainty,
      `Unexpected certainty for ${id}: expected ${expectedCertainty}, found ${calculator.meta.resultCertainty}`,
    )
  }
}

if (failures.length) {
  console.error('Result certainty validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const counts = Object.fromEntries(
  CALCULATOR_CERTAINTY_LEVELS.map((level) => [
    level,
    calculators.filter(({ meta }) => meta.resultCertainty === level).length,
  ]),
)

console.log(`Result certainty validation passed for ${calculators.length} calculators.`)
console.log(counts)
