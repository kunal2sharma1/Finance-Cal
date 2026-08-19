import { readFile } from 'node:fs/promises'
import { calculators } from '../src/calculatorCatalog.js'
import { isSupportedInputMode } from '../src/calculatorSchema.js'
import { resolveInputMode } from '../src/inputControlPolicy.js'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
let sliderCount = 0
let numericCount = 0
let nativeCount = 0

for (const calculator of calculators) {
  for (const field of calculator.config.fields) {
    const resolved = resolveInputMode(field)
    const type = field.type || 'number'
    assert(isSupportedInputMode(field.inputMode), `Invalid resolved inputMode: ${calculator.config.id}.${field.name}`)
    assert(field.inputMode === resolved, `Input policy drift: ${calculator.config.id}.${field.name}`)

    if (type === 'number') {
      assert(field.inputMode === 'numeric' || field.inputMode === 'slider', `Number field has invalid control: ${calculator.config.id}.${field.name}`)
      if (field.inputMode === 'slider') {
        sliderCount += 1
        assert(field.min !== undefined && field.max !== undefined, `Slider lacks bounds: ${calculator.config.id}.${field.name}`)
        assert(Number.isFinite(Number(field.min)) && Number.isFinite(Number(field.max)), `Slider bounds are invalid: ${calculator.config.id}.${field.name}`)
        assert(Number(field.min) <= Number(field.max), `Slider min exceeds max: ${calculator.config.id}.${field.name}`)
      } else {
        numericCount += 1
      }
    } else {
      nativeCount += 1
      assert(field.inputMode === 'native', `Non-number field is not native: ${calculator.config.id}.${field.name}`)
    }
  }
}

const formSource = await readFile('src/components/CalculatorForm.jsx', 'utf8')
const policySource = await readFile('src/inputControlPolicy.js', 'utf8')
const schemaSource = await readFile('src/calculatorSchema.js', 'utf8')
assert(formSource.includes("from '../inputControlPolicy.js'"), 'CalculatorForm does not consume the canonical input control policy.')
assert(!formSource.includes('range <= 200'), 'CalculatorForm still contains range-based slider heuristics.')
assert(!formSource.includes("unit === '%'"), 'CalculatorForm still contains unit-based slider heuristics.')
assert(policySource.includes('INPUT_CONTROL_MODES'), 'Input control policy does not define supported modes.')
assert(policySource.includes('resolveInputMode'), 'Input control policy resolver is missing.')
assert(schemaSource.includes('SUPPORTED_INPUT_MODES'), 'Calculator schema does not expose input control modes.')

const representativeChecks = [
  ['xirr', (calculator) => calculator.config.fields.some((field) => field.type === 'cashflows' && field.inputMode === 'native')],
  ['currency-exchange', (calculator) => calculator.config.fields.filter((field) => field.type === 'currency-select').every((field) => field.inputMode === 'native')],
]

for (const [id, check] of representativeChecks) {
  const calculator = calculators.find((item) => item.config.id === id)
  assert(Boolean(calculator), `Representative calculator missing: ${id}`)
  if (calculator) assert(check(calculator), `Representative control policy failed: ${id}`)
}

if (failures.length) {
  console.error('Input control policy validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Input control policy validation passed for ${calculators.length} calculators: ${numericCount} numeric fields, ${sliderCount} slider fields, ${nativeCount} native controls.`)
