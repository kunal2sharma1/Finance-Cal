import { readFile } from 'node:fs/promises'
import { calculators } from '../src/calculatorCatalog.js'
import { validateInputField } from '../src/inputValidation.js'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

for (const calculator of calculators) {
  for (const field of calculator.config.fields) {
    const emptyMessage = validateInputField({ ...field, required: true }, '')
    if (field.type === 'number' || !field.type) {
      assert(emptyMessage.includes('Enter '), `Missing contextual empty-value message: ${calculator.config.id}.${field.name}`)
      if (field.min !== undefined) {
        assert(validateInputField(field, Number(field.min) - 1).includes('Use '), `Missing min-range message: ${calculator.config.id}.${field.name}`)
      }
      if (field.max !== undefined) {
        assert(validateInputField(field, Number(field.max) + 1).includes('Use '), `Missing max-range message: ${calculator.config.id}.${field.name}`)
      }
    }
  }
}

const formSource = await readFile('src/components/CalculatorForm.jsx', 'utf8')
const viewSource = await readFile('src/pages/CalculatorView.jsx', 'utf8')
const cssSource = await readFile('src/components/calculator-form-groups.css', 'utf8')

assert(formSource.includes("from '../inputValidation.js'"), 'CalculatorForm does not consume contextual validation.')
assert(formSource.includes('onBlur'), 'CalculatorForm does not mark fields as touched.')
assert(formSource.includes('aria-invalid'), 'CalculatorForm does not expose invalid state to assistive technology.')
assert(formSource.includes('role="alert"'), 'CalculatorForm does not expose validation messages as alerts.')
assert(viewSource.includes("from '../inputValidation.js'"), 'CalculatorView does not validate calculator values.')
assert(viewSource.includes('validateInputValues'), 'CalculatorView does not block invalid calculations.')
assert(viewSource.includes('Fix the highlighted inputs'), 'CalculatorView lacks invalid-calculation guidance.')
assert(cssSource.includes('.calc-form__error'), 'Contextual validation styling is missing.')

if (failures.length) {
  console.error('Input validation validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Input validation gate passed for ${calculators.length} calculators.`)
