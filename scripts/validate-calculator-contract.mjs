import { calculators } from '../src/calculatorCatalog.js'
import { isSupportedInputMode } from '../src/calculatorSchema.js'

const SUPPORTED_FIELD_TYPES = new Set([
  'textarea',
  'cashflows',
  'select',
  'currency-select',
])

const SUPPORTED_RESULT_TYPES = new Set(['date', 'dynamicCurrency'])

function fail(errors, message) {
  errors.push(message)
}

function assertFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function validateCalculator(entry, index) {
  const errors = []
  const config = entry?.config

  if (!config || typeof config !== 'object') {
    fail(errors, `calculator[${index}] is missing config`)
    return errors
  }

  if (!config.id || typeof config.id !== 'string') fail(errors, 'missing string id')
  if (!config.title || typeof config.title !== 'string') fail(errors, 'missing string title')
  if (!config.shortDescription || typeof config.shortDescription !== 'string') fail(errors, 'missing shortDescription')
  if (!config.category || typeof config.category !== 'string') fail(errors, 'missing category')
  if (typeof entry.calculate !== 'function') fail(errors, 'missing calculate function')
  if (!entry.explanation || typeof entry.explanation !== 'object') fail(errors, 'missing explanation object')

  if (!Array.isArray(config.fields)) {
    fail(errors, 'fields must be an array')
  } else {
    const names = new Set()
    config.fields.forEach((field, fieldIndex) => {
      if (!field || typeof field !== 'object') {
        fail(errors, `fields[${fieldIndex}] must be an object`)
        return
      }
      if (!field.name || typeof field.name !== 'string') fail(errors, `fields[${fieldIndex}] missing name`)
      if (names.has(field.name)) fail(errors, `fields[${fieldIndex}] duplicate name: ${field.name}`)
      names.add(field.name)
      if (!field.label || typeof field.label !== 'string') fail(errors, `fields[${fieldIndex}] missing label`)

      const type = field.type || 'number'
      if (!['number', ...SUPPORTED_FIELD_TYPES].includes(type)) {
        fail(errors, `fields[${fieldIndex}] unsupported type: ${type}`)
      }

      if (!isSupportedInputMode(field.inputMode)) {
        fail(errors, `fields[${fieldIndex}] invalid inputMode: ${field.inputMode}`)
      }
      if (type === 'number' && field.inputMode === 'native') {
        fail(errors, `fields[${fieldIndex}] number field cannot use native inputMode`)
      }
      if (type !== 'number' && field.inputMode !== 'native') {
        fail(errors, `fields[${fieldIndex}] non-number field must use native inputMode`)
      }

      if (type === 'select') {
        if (!Array.isArray(field.options) || field.options.length === 0) {
          fail(errors, `fields[${fieldIndex}] select requires options`)
        } else {
          const optionValues = new Set()
          field.options.forEach((option, optionIndex) => {
            if (!option || typeof option !== 'object') {
              fail(errors, `fields[${fieldIndex}].options[${optionIndex}] must be an object`)
              return
            }
            if (option.value === undefined) fail(errors, `fields[${fieldIndex}].options[${optionIndex}] missing value`)
            if (!option.label) fail(errors, `fields[${fieldIndex}].options[${optionIndex}] missing label`)
            if (optionValues.has(option.value)) fail(errors, `fields[${fieldIndex}] duplicate option value: ${option.value}`)
            optionValues.add(option.value)
          })
        }
      }

      if (type === 'number' || type === 'currency-select' || type === 'select') {
        if (field.defaultValue === undefined) fail(errors, `fields[${fieldIndex}] missing defaultValue`)
      }

      if (type === 'number') {
        if (field.min !== undefined && !assertFiniteNumber(Number(field.min))) fail(errors, `fields[${fieldIndex}] invalid min`)
        if (field.max !== undefined && !assertFiniteNumber(Number(field.max))) fail(errors, `fields[${fieldIndex}] invalid max`)
        if (field.step !== undefined && (!assertFiniteNumber(Number(field.step)) || Number(field.step) <= 0)) fail(errors, `fields[${fieldIndex}] invalid step`)
        if (field.min !== undefined && field.max !== undefined && Number(field.min) > Number(field.max)) fail(errors, `fields[${fieldIndex}] min greater than max`)
        if (field.inputMode === 'slider' && (field.min === undefined || field.max === undefined)) {
          fail(errors, `fields[${fieldIndex}] slider requires min and max`)
        }
      }
    })
  }

  if (!Array.isArray(config.resultFields) || config.resultFields.length === 0) {
    fail(errors, 'resultFields must be a non-empty array')
  } else {
    const names = new Set()
    let primaryCount = 0
    config.resultFields.forEach((field, fieldIndex) => {
      if (!field || typeof field !== 'object') {
        fail(errors, `resultFields[${fieldIndex}] must be an object`)
        return
      }
      if (!field.name || typeof field.name !== 'string') fail(errors, `resultFields[${fieldIndex}] missing name`)
      if (names.has(field.name)) fail(errors, `resultFields[${fieldIndex}] duplicate name: ${field.name}`)
      names.add(field.name)
      if (!field.label || typeof field.label !== 'string') fail(errors, `resultFields[${fieldIndex}] missing label`)
      if (field.primary) primaryCount += 1
      if (field.type && !SUPPORTED_RESULT_TYPES.has(field.type)) fail(errors, `resultFields[${fieldIndex}] unsupported type: ${field.type}`)
    })
    if (primaryCount > 1) fail(errors, 'resultFields can contain at most one primary result')
  }

  if (config.countries !== undefined && !Array.isArray(config.countries)) {
    fail(errors, 'countries must be an array when provided')
  }

  if (config.currency !== undefined && typeof config.currency !== 'string') {
    fail(errors, 'currency must be a string when provided')
  }

  return errors
}

const ids = new Set()
const allErrors = []

calculators.forEach((calculator, index) => {
  const id = calculator?.config?.id
  if (id && ids.has(id)) allErrors.push(`duplicate calculator id: ${id}`)
  if (id) ids.add(id)

  const errors = validateCalculator(calculator, index)
  errors.forEach((error) => allErrors.push(`${id || `calculator[${index}]`}: ${error}`))
})

if (allErrors.length > 0) {
  console.error(`Calculator contract validation failed with ${allErrors.length} error(s):`)
  allErrors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`Calculator contract validation passed: ${calculators.length} calculators checked.`)
