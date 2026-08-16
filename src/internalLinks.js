import { guides } from './guides.js'
import { topicHubs } from './topicHubs.js'

export function getGuidesForCalculator(calculatorId, limit = 3) {
  return guides
    .filter((guide) => guide.calculatorLinks.some(([, href]) => href === `/calculators/${calculatorId}`))
    .slice(0, limit)
}

export function getCalculatorsForTopic(slug, calculators) {
  const hub = topicHubs[slug]
  if (!hub) return []
  return hub.calculatorIds
    .map((id) => calculators.find((calculator) => calculator.config.id === id))
    .filter(Boolean)
}
