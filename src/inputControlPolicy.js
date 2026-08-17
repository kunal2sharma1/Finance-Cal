export const INPUT_CONTROL_MODES = Object.freeze(['numeric', 'slider', 'native'])

function legacySliderPolicy(field) {
  const type = field?.type || 'number'
  if (type !== 'number') return 'native'

  const unit = String(field.unit || '').toLowerCase()
  const min = Number(field.min)
  const max = Number(field.max)
  const range = Number.isFinite(min) && Number.isFinite(max) ? Math.abs(max - min) : Infinity

  // Preserve the existing UX behavior while moving the decision into one
  // canonical policy layer. Future calculators should set inputMode directly.
  if (unit === '%' || unit === 'rate' || /year|month/.test(unit) || range <= 200) return 'slider'
  return 'numeric'
}

export function resolveInputMode(field) {
  if (!field) return 'native'
  const type = field.type || 'number'
  if (type !== 'number') return 'native'

  const explicit = field.inputMode
  if (explicit !== undefined) {
    return INPUT_CONTROL_MODES.includes(explicit) && explicit !== 'native' ? explicit : 'numeric'
  }

  return legacySliderPolicy(field)
}

export function normalizeCalculatorFields(fields = []) {
  return fields.map((field) => ({
    ...field,
    type: field.type || 'number',
    inputMode: resolveInputMode(field),
  }))
}

export function isValidInputMode(mode) {
  return INPUT_CONTROL_MODES.includes(mode)
}
