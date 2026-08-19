import { readFile } from 'node:fs/promises'
import { calculators } from '../src/calculatorCatalog.js'
import { validateInputGroups } from '../src/calculatorInputGroups.js'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }

for (const calculator of calculators) {
  const { config } = calculator
  const result = validateInputGroups(config.fields)
  assert(result.valid, `Input grouping is invalid: ${config.id}`)
  assert(result.groups.length > 0, `Calculator has no input group: ${config.id}`)

  const sourceNames = config.fields.map((field) => field.name)
  const groupedNames = result.groups.flatMap((group) => group.fields.map((field) => field.name))
  assert(groupedNames.length === sourceNames.length, `Input count changed by grouping: ${config.id}`)
  assert(new Set(groupedNames).size === sourceNames.length, `Input duplicated or dropped during grouping: ${config.id}`)
  assert(
    [...groupedNames].sort().join('\u0000') === [...sourceNames].sort().join('\u0000'),
    `Grouped inputs do not match source inputs: ${config.id}`,
  )

  const sourceIndex = new Map(sourceNames.map((name, index) => [name, index]))
  for (const group of result.groups) {
    assert(group.id && group.label, `Unnamed input group in ${config.id}`)
    assert(Array.isArray(group.fields) && group.fields.length > 0, `Empty input group in ${config.id}: ${group.id}`)

    const indices = group.fields.map((field) => sourceIndex.get(field.name))
    assert(indices.every(Number.isInteger), `Unknown input in grouped fields: ${config.id}:${group.id}`)
    assert(
      indices.every((value, index) => index === 0 || value > indices[index - 1]),
      `Input order changed inside group: ${config.id}:${group.id}`,
    )
  }
}

const representatives = ['sip', 'emi', 'retirement', 'xirr', 'currency-exchange']
for (const id of representatives) {
  const calculator = calculators.find((item) => item.config.id === id)
  assert(Boolean(calculator), `Representative calculator missing: ${id}`)
  if (!calculator) continue

  const result = validateInputGroups(calculator.config.fields)
  assert(result.valid, `Representative grouping failed: ${id}`)
}

const formSource = await readFile('src/components/CalculatorForm.jsx', 'utf8')
const viewSource = await readFile('src/pages/CalculatorView.jsx', 'utf8')
const stylesSource = await readFile('src/components/calculator-form-groups.css', 'utf8')
assert(formSource.includes("from '../calculatorInputGroups.js'"), 'CalculatorForm does not consume the grouping system.')
assert(formSource.includes('calc-form__group'), 'CalculatorForm does not render grouped input sections.')
assert(formSource.includes('calc-form__group-header'), 'CalculatorForm does not render group headings when needed.')
assert(viewSource.includes('calculatorId={config.id}'), 'CalculatorView does not provide a stable calculator identity for grouped input headings.')
assert(stylesSource.includes('.calc-form__group'), 'Grouped input styles are missing.')

if (failures.length) {
  console.error('Input grouping validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const groupedCalculators = calculators.filter((calculator) => validateInputGroups(calculator.config.fields).groups.length > 1).length
console.log(`Input grouping validation passed for ${calculators.length} calculators; ${groupedCalculators} use multiple visible groups.`)
