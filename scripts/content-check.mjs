import assert from 'node:assert/strict'
import { calculators } from '../src/calculators/registry.js'
import { calculatorSEOContent } from '../src/seoCalculatorContent.js'
import { getCalculatorPriorityTier } from '../src/calculatorContent.js'
import { guides } from '../src/guides.js'

const customContentIds = new Set(Object.keys(calculatorSEOContent))
const missingCustomContent = calculators.filter(({ config }) => !customContentIds.has(config.id))

assert.equal(calculators.length, 78, `Expected 78 calculators, found ${calculators.length}`)

for (const { config } of calculators) {
  const tier = getCalculatorPriorityTier(config.id)
  assert.ok(tier === 1 || tier === 2, `Unknown content tier for ${config.id}`)

  if (tier === 1) {
    assert.ok(customContentIds.has(config.id), `Tier 1 calculator needs custom content: ${config.id}`)
    assert.ok(calculatorSEOContent[config.id].sections.length >= 3, `Tier 1 calculator needs at least 3 content sections: ${config.id}`)
  }
}

for (const guide of guides) {
  for (const [, href] of guide.calculatorLinks) {
    const match = href.match(/^\/calculators\/([^/?#]+)$/)
    if (!match) continue
    const id = decodeURIComponent(match[1])
    assert.ok(calculators.some(({ config }) => config.id === id), `Guide ${guide.slug} references missing calculator: ${id}`)
  }
}

console.log(`Content checks passed for ${calculators.length} calculators. Tier 1 custom content: ${calculators.length - missingCustomContent.length}. Tier 2 fallback content: ${missingCustomContent.length}.`)
