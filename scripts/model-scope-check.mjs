import { calculators } from '../src/calculatorCatalog.js'
import { CALCULATOR_MODEL_SCOPES } from '../src/calculatorSchema.js'

const failures = []
const byId = new Map(calculators.map((calculator) => [calculator.config.id, calculator]))

function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(calculators.length > 0, 'No calculators found for model-scope validation')

for (const calculator of calculators) {
  const id = calculator.config.id
  const meta = calculator.meta || {}
  assert(CALCULATOR_MODEL_SCOPES.includes(meta.modelScope), `Invalid model scope: ${id}`)
  assert(typeof meta.modelingScopeNote === 'string' && meta.modelingScopeNote.trim(), `Missing modeling scope note: ${id}`)

  if (['simplified-model', 'rule-based-illustration', 'projection'].includes(meta.modelScope)) {
    assert(
      meta.modelingScopeNote.length >= 40,
      `Insufficient scope disclosure: ${id}`,
    )
  }
}

const expectedOverrides = {
  ppf: 'simplified-model',
  'bond-return': 'simplified-model',
  'income-tax': 'rule-based-illustration',
  retirement: 'projection',
}

for (const [id, expectedScope] of Object.entries(expectedOverrides)) {
  const calculator = byId.get(id)
  assert(calculator, `Required scope-reviewed calculator missing: ${id}`)
  if (calculator) {
    assert(
      calculator.meta.modelScope === expectedScope,
      `Unexpected model scope for ${id}: expected ${expectedScope}, found ${calculator.meta.modelScope}`,
    )
  }
}

if (failures.length) {
  console.error('Modeling scope validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const scopeCounts = Object.fromEntries(
  CALCULATOR_MODEL_SCOPES.map((scope) => [scope, calculators.filter(({ meta }) => meta.modelScope === scope).length]),
)
console.log(`Modeling scope validation passed for ${calculators.length} calculators.`)
console.log(scopeCounts)
