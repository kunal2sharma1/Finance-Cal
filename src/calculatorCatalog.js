import { calculators as coreCalculators } from './calculators/registry.js'
import { internationalCalculators } from './internationalCalculators.js'

/**
 * Single source of truth for calculator discovery across the app.
 * Keep registration details inside the calculator registries; this module
 * provides read-only lookup helpers so pages do not rebuild catalog arrays.
 */
export const calculators = Object.freeze([
  ...coreCalculators,
  ...internationalCalculators,
])

const calculatorById = new Map(calculators.map((calculator) => [calculator.config.id, calculator]))

export function getCalculatorById(id) {
  return calculatorById.get(id) || null
}

export function getCalculatorsForCountry(countryCode) {
  return calculators.filter(({ config }) => {
    const countries = Array.isArray(config.countries) ? config.countries : []
    return countries.length === 0 || countries.includes(countryCode)
  })
}

export function getGlobalCalculators() {
  return calculators.filter(({ config }) => {
    const countries = Array.isArray(config.countries) ? config.countries : []
    return countries.length === 0
  })
}

export function getCalculatorIds() {
  return calculators.map(({ config }) => config.id)
}

export function hasCalculator(id) {
  return calculatorById.has(id)
}

export const calculatorCount = calculators.length
