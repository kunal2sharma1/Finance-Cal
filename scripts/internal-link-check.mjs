import assert from 'node:assert/strict'
import { calculators } from '../src/calculators/registry.js'
import { guides } from '../src/guides.js'
import { topicHubs } from '../src/topicHubs.js'

const ids = calculators.map(({ config }) => config.id)
const idSet = new Set(ids)
const calculatorGuideCount = new Map(ids.map((id) => [id, 0]))
const calculatorHubCount = new Map(ids.map((id) => [id, 0]))

for (const guide of guides) {
  assert.ok(guide.topic in topicHubs, `Guide ${guide.slug} has no matching topic hub: ${guide.topic}`)
  assert.ok(Array.isArray(guide.calculatorLinks) && guide.calculatorLinks.length > 0, `Guide ${guide.slug} has no calculator links`)

  for (const [, href] of guide.calculatorLinks) {
    const match = href.match(/^\/calculators\/([^/?#]+)$/)
    assert.ok(match, `Guide ${guide.slug} has malformed calculator link: ${href}`)
    const id = decodeURIComponent(match[1]).toLowerCase()
    assert.ok(idSet.has(id), `Guide ${guide.slug} links to unknown calculator: ${href}`)
    calculatorGuideCount.set(id, calculatorGuideCount.get(id) + 1)
  }
}

for (const [slug, hub] of Object.entries(topicHubs)) {
  assert.ok(Array.isArray(hub.calculatorIds) && hub.calculatorIds.length > 0, `Topic hub ${slug} has no calculators`)
  for (const id of hub.calculatorIds) {
    assert.ok(idSet.has(id), `Topic hub ${slug} links to unknown calculator: ${id}`)
    calculatorHubCount.set(id, calculatorHubCount.get(id) + 1)
  }
}

const orphanCalculators = ids.filter((id) => calculatorHubCount.get(id) === 0)
assert.deepEqual(orphanCalculators, [], `Calculators missing from all topic hubs: ${orphanCalculators.join(', ')}`)

const guideLinkedCalculators = ids.filter((id) => calculatorGuideCount.get(id) > 0).length
const hubLinkedCalculators = ids.filter((id) => calculatorHubCount.get(id) > 0).length

assert.ok(hubLinkedCalculators === ids.length, 'Every calculator should belong to at least one topic hub')
assert.ok(guideLinkedCalculators >= 15, `Expected meaningful guide-to-calculator coverage, found ${guideLinkedCalculators}`)

console.log(`Internal linking checks passed: ${hubLinkedCalculators}/${ids.length} calculators in hubs, ${guideLinkedCalculators}/${ids.length} calculators linked from guides.`)
