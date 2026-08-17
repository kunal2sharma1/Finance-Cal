import { readFile } from 'node:fs/promises'

const formSource = await readFile('src/components/CalculatorForm.jsx', 'utf8')
const cssSource = await readFile('src/components/cashflow-editor.css', 'utf8')
const configSource = await readFile('src/calculators/xirr/config.js', 'utf8')

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

assert(formSource.includes('aria-label="XIRR cash flow entries"'), 'XIRR editor needs an explicit accessible container label.')
assert(formSource.includes('Cash flow ${index + 1} date'), 'Each XIRR row needs an accessible date label.')
assert(formSource.includes('Cash flow ${index + 1} transaction type'), 'Each XIRR row needs an accessible transaction-type label.')
assert(formSource.includes('Cash flow ${index + 1} amount'), 'Each XIRR row needs an accessible amount label.')
assert(formSource.includes('Remove ${rowLabel}'), 'Each XIRR row needs an accessible remove action.')
assert(formSource.includes('>Remove</button>'), 'Remove actions must use text labels rather than icon-only controls.')
assert(cssSource.includes('@media (max-width: 560px)'), 'XIRR editor must define a mobile layout.')
assert(cssSource.includes('.calc-form__cashflow-field > span'), 'Mobile XIRR rows must expose field labels.')
assert(cssSource.includes('grid-template-columns: minmax(0, 1fr) auto'), 'Mobile XIRR rows must collapse to a single readable column plus action.')
assert(cssSource.includes('width: 100%'), 'Mobile add-row action must be full-width.')
assert(configSource.includes("type: 'cashflows'"), 'XIRR must continue using the structured cash-flow field.')
assert(configSource.includes('You do not need to type negative numbers'), 'XIRR transaction direction must remain explicit.')

if (failures.length) {
  console.error('XIRR UI validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('XIRR mobile UI validation passed.')
