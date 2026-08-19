export const NUMBER_SYSTEMS = Object.freeze(['indian', 'international'])
export const DEFAULT_NUMBER_SYSTEM = 'indian'
export const NUMBER_SYSTEM_STORAGE_KEY = 'fincalc-number-system'

export function isNumberSystem(value) {
  return NUMBER_SYSTEMS.includes(value)
}

export function getInitialNumberSystem(countryCode = 'IN') {
  if (typeof window === 'undefined') return countryCode === 'IN' ? DEFAULT_NUMBER_SYSTEM : 'international'

  const stored = window.localStorage.getItem(NUMBER_SYSTEM_STORAGE_KEY)
  if (isNumberSystem(stored)) return stored

  return countryCode === 'IN' ? DEFAULT_NUMBER_SYSTEM : 'international'
}

export function saveNumberSystem(system) {
  const next = isNumberSystem(system) ? system : DEFAULT_NUMBER_SYSTEM
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(NUMBER_SYSTEM_STORAGE_KEY, next)
    window.dispatchEvent(new CustomEvent('fincalc-number-system-change', { detail: next }))
  }
  return next
}

export function getNumberFormatLocale(numberSystem = DEFAULT_NUMBER_SYSTEM) {
  return numberSystem === 'international' ? 'en-US' : 'en-IN'
}
