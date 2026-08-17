import { calculators } from '../src/calculatorCatalog.js'

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function hasNonFiniteNumber(value, path = 'result') {
  if (typeof value === 'number') return !Number.isFinite(value) ? path : null
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const issue = hasNonFiniteNumber(value[index], `${path}[${index}]`)
      if (issue) return issue
    }
    return null
  }
  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      const issue = hasNonFiniteNumber(nested, `${path}.${key}`)
      if (issue) return issue
    }
  }
  return null
}

function valueForBoundary(field, boundary) {
  if (boundary === 'min' && field.min !== undefined) return field.min
  if (boundary === 'max' && field.max !== undefined) return field.max
  if (Array.isArray(field.options) && field.options.length > 0) {
    const option = boundary === 'max' ? field.options[field.options.length - 1] : field.options[0]
    return typeof option === 'object' && option !== null && 'value' in option ? option.value : option
  }
  return field.defaultValue
}

function buildInputs(config, boundary, singleFieldName = null) {
  const inputs = {}
  for (const field of config.fields || []) {
    const isTarget = singleFieldName === null || singleFieldName === field.name
    inputs[field.name] = isTarget ? valueForBoundary(field, boundary) : field.defaultValue
  }
  return inputs
}

const failures = []
let scenarios = 0
let calculatorsChecked = 0

for (const calculator of calculators) {
  const { config, calculate } = calculator
  if (typeof calculate !== 'function') {
    failures.push(`${config.id}: missing calculate function`)
    continue
  }

  calculatorsChecked += 1

  const fields = Array.isArray(config.fields) ? config.fields : []
  const numericBoundaryFields = fields.filter(
    (field) => field && (typeof field.min === 'number' || typeof field.max === 'number')
  )

  const cases = []

  // Whole-form lower and upper bounds for all fields.
  cases.push({ name: 'all-min', inputs: buildInputs(config, 'min') })
  cases.push({ name: 'all-max', inputs: buildInputs(config, 'max') })

  // One-field-at-a-time boundary tests prevent interactions between unrelated
  // maximum/minimum values from hiding a field-specific failure.
  for (const field of numericBoundaryFields) {
    if (field.min !== undefined) {
      cases.push({ name: `${field.name}-min`, inputs: buildInputs(config, 'min', field.name) })
    }
    if (field.max !== undefined) {
      cases.push({ name: `${field.name}-max`, inputs: buildInputs(config, 'max', field.name) })
    }
  }

  for (const scenario of cases) {
    scenarios += 1
    let result
    try {
      result = calculate(scenario.inputs)
      if (result && typeof result.then === 'function') {
        failures.push(`${config.id}/${scenario.name}: asynchronous formulas are excluded from synchronous boundary checks`)
        continue
      }
    } catch (error) {
      failures.push(`${config.id}/${scenario.name}: formula threw ${error.message}`)
      continue
    }

    if (!result || typeof result !== 'object') {
      failures.push(`${config.id}/${scenario.name}: formula did not return an object`)
      continue
    }

    const nonFinitePath = hasNonFiniteNumber(result)
    if (nonFinitePath) {
      failures.push(`${config.id}/${scenario.name}: non-finite numeric output at ${nonFinitePath}`)
    }

    // If the formula explicitly reports invalid input, it must do so without
    // producing a non-finite numeric payload. This protects the result layer
    // from NaN/Infinity even when a boundary is intentionally rejected.
    if (result.isValid === false && typeof result.message !== 'string') {
      failures.push(`${config.id}/${scenario.name}: invalid result should include a user-facing message`)
    }
  }
}

if (failures.length > 0) {
  console.error(`Formula boundary validation failed with ${failures.length} issue(s) across ${scenarios} scenarios and ${calculatorsChecked} calculators:`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`Formula boundary validation passed: ${calculatorsChecked} calculators, ${scenarios} boundary scenarios.`)
