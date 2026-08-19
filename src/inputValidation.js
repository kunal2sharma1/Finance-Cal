function numberFromValue(value) {
  if (value === '' || value === null || value === undefined) return null
  const number = Number(value)
  return Number.isFinite(number) ? number : NaN
}

function baseEmptyMessage(field) {
  if (field.required) return `Enter ${String(field.label || 'a value').replace(/[.:]+$/, '').toLowerCase()}.`
  return ''
}

export function validateInputField(field, rawValue) {
  const type = field?.type || 'number'

  if (type === 'number') {
    const number = numberFromValue(rawValue)
    if (number === null) return baseEmptyMessage(field)
    if (Number.isNaN(number)) return `Enter a valid ${String(field.label || 'number').toLowerCase()}.`
    if (field.min !== undefined && number < Number(field.min)) return `Use ${field.min} or more.`
    if (field.max !== undefined && number > Number(field.max)) return `Use ${field.max} or less.`
    return ''
  }

  if (type === 'select') {
    if (rawValue === '' || rawValue === null || rawValue === undefined) return baseEmptyMessage(field)
    const optionValues = new Set((field.options || []).map((option) => String(option.value)))
    if (!optionValues.has(String(rawValue))) return 'Choose one of the available options.'
    return ''
  }

  if (type === 'currency-select') {
    if (rawValue === '' || rawValue === null || rawValue === undefined) return baseEmptyMessage(field)
    return /^[A-Z]{3}$/.test(String(rawValue)) ? '' : 'Choose a valid currency.'
  }

  if (type === 'textarea') {
    if (!String(rawValue || '').trim()) return baseEmptyMessage(field)
    return ''
  }

  if (type === 'cashflows') {
    const rows = Array.isArray(rawValue) ? rawValue : []
    const populatedRows = rows.filter((row) => row && (row.date || row.amount !== ''))
    if (populatedRows.length === 0) return baseEmptyMessage(field)
    const incomplete = populatedRows.some((row) => !row.date || row.amount === '' || !Number.isFinite(Number(row.amount)))
    if (incomplete) return 'Complete the date, type and amount for each cash flow.'
    return ''
  }

  return ''
}

export function getInputError(field, rawValue, touched = false) {
  if (!touched) return ''
  return validateInputField(field, rawValue)
}

export function validateInputValues(fields = [], values = {}) {
  const errors = {}
  fields.forEach((field) => {
    const message = validateInputField(field, values[field.name])
    if (message) errors[field.name] = message
  })
  return errors
}
