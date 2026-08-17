import { calculators as coreCalculators } from './calculators/registry.js'
import { internationalCalculators } from './internationalCalculators.js'
import { phase3Calculators } from './phase3Calculators.js'
import { withCalculatorMeta } from './calculatorMeta.js'

/**
 * Single source of truth for calculator discovery across the app.
 * Registration remains explicit, while portfolio metadata is derived in one
 * place so every calculator has the same internal shape.
 */
export const calculators = Object.freeze([
  ...coreCalculators,
  ...internationalCalculators,
  ...phase3Calculators,
].map(withCalculatorMeta))

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

export function getCalculatorsByCategory(category) {
  return calculators.filter(({ config }) => config.category === category)
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
