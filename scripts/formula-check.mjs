import { calculators } from '../src/calculatorCatalog.js'

const skippedLiveCalculators = new Set(['currency-exchange'])
const failures = []

function buildDefaultValues(fields) {
  const values = {}
  for (const field of fields) {
    if (field.defaultValue !== undefined) values[field.name] = field.defaultValue
    else if (field.type === 'cashflows') values[field.name] = [{ date: '', direction: 'invested', amount: '' }]
    else if (field.type === 'textarea') values[field.name] = ''
    else if (field.type === 'select') values[field.name] = field.options?.[0]?.value ?? ''
    else values[field.name] = 0
  }
  return values
}

for (const calculator of calculators) {
  const { config, calculate } = calculator
  if (skippedLiveCalculators.has(config.id)) continue
  try {
    const results = await Promise.resolve(calculate(buildDefaultValues(config.fields)))
    if (!results || typeof results !== 'object') throw new Error('Formula did not return a result object.')
    for (const field of config.resultFields) {
      const value = results[field.name]
      if (value !== undefined && typeof value === 'number' && !Number.isFinite(value)) throw new Error(`Result ${field.name} is not finite.`)
    }
  } catch (error) {
    failures.push(`${config.id}: ${error.message}`)
  }
}

if (failures.length) {
  console.error('Formula regression tests failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Formula regression checks passed for ${calculators.length - skippedLiveCalculators.size} calculators. Live-data calculators skipped: ${[...skippedLiveCalculators].join(', ')}.`)
