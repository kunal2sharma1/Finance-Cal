import assert from 'node:assert/strict'
import {
  CONTENT_TYPES,
  RELATIONSHIP_TYPES,
  canonicalCalculatorContent,
  canonicalContent,
  canonicalGuideContent,
  getContentById,
  getContentBySlug,
  getContentByType,
  getContentRelationshipGraph,
} from '../src/contentModel.js'

assert.ok(canonicalCalculatorContent.length > 0, 'calculator content model must not be empty')
assert.ok(canonicalGuideContent.length > 0, 'guide content model must not be empty')
assert.equal(canonicalContent.length, canonicalCalculatorContent.length + canonicalGuideContent.length)

const ids = canonicalContent.map((item) => item.id)
const slugs = canonicalContent.map((item) => item.slug)
assert.equal(new Set(ids).size, ids.length, 'content ids must be unique')
assert.equal(new Set(slugs).size, slugs.length, 'content slugs must be unique')

for (const item of canonicalContent) {
  assert.ok(Object.values(CONTENT_TYPES).includes(item.type), `unsupported content type: ${item.type}`)
  assert.ok(item.id, `missing content id for ${item.slug}`)
  assert.ok(item.slug, `missing content slug for ${item.id}`)
  assert.ok(item.title, `missing title for ${item.id}`)
  assert.ok(item.summary, `missing summary for ${item.id}`)
  assert.ok(item.topic, `missing topic for ${item.id}`)
  assert.ok(item.metaDescription, `missing meta description for ${item.id}`)
  assert.ok(Array.isArray(item.body), `body must be an array for ${item.id}`)
  assert.ok(Array.isArray(item.links), `links must be an array for ${item.id}`)
  assert.ok(Array.isArray(item.relationships), `relationships must be an array for ${item.id}`)
  assert.ok(Array.isArray(item.keywords), `keywords must be an array for ${item.id}`)
  assert.equal(getContentById(item.id), item, `id lookup failed for ${item.id}`)
  assert.equal(getContentBySlug(item.slug), item, `slug lookup failed for ${item.id}`)
}

const relationshipGraph = getContentRelationshipGraph()
assert.ok(relationshipGraph.length > 0, 'content relationship graph must not be empty')

const relationshipKeys = new Set()
for (const relationship of relationshipGraph) {
  assert.ok(relationship.sourceId, 'relationship source is required')
  assert.ok(relationship.targetId, 'relationship target is required')
  assert.ok(relationship.type, 'relationship type is required')
  assert.notEqual(relationship.sourceId, relationship.targetId, 'self-referential content relationship is not allowed')
  assert.ok(getContentById(relationship.sourceId), `relationship source does not exist: ${relationship.sourceId}`)
  assert.ok(getContentById(relationship.targetId), `relationship target does not exist: ${relationship.targetId}`)

  const key = `${relationship.sourceId}|${relationship.type}|${relationship.targetId}`
  assert.equal(relationshipKeys.has(key), false, `duplicate content relationship: ${key}`)
  relationshipKeys.add(key)
}

for (const guide of canonicalGuideContent) {
  for (const block of guide.body) {
    assert.ok(block.heading, `guide body block missing heading: ${guide.id}`)
    assert.ok(block.text, `guide body block missing text: ${guide.id}`)
  }

  for (const link of guide.links) {
    assert.ok(link.title, `guide link missing title: ${guide.id}`)
    assert.match(link.href, /^\/calculators\/[a-z0-9-]+$/, `invalid calculator link: ${link.href}`)

    const calculatorId = link.href.replace('/calculators/', '')
    const calculator = canonicalCalculatorContent.find((item) => item.id === calculatorId)
    assert.ok(calculator, `guide link points to unknown calculator: ${link.href}`)

    const forward = guide.relationships.find((relationship) => (
      relationship.targetId === calculator.id
      && relationship.type === RELATIONSHIP_TYPES.guideExplainsCalculator
    ))
    assert.ok(forward, `missing guide-to-calculator relationship: ${guide.id} -> ${calculator.id}`)

    const reverse = calculator.relationships.find((relationship) => (
      relationship.targetId === guide.id
      && relationship.type === RELATIONSHIP_TYPES.calculatorExplainedByGuide
    ))
    assert.ok(reverse, `missing calculator-to-guide relationship: ${calculator.id} -> ${guide.id}`)
  }
}

for (const calculator of canonicalCalculatorContent) {
  for (const relationship of calculator.relationships) {
    assert.equal(relationship.type, RELATIONSHIP_TYPES.calculatorExplainedByGuide)
    assert.equal(getContentById(relationship.targetId)?.type, CONTENT_TYPES.guide)
  }
}

assert.equal(getContentByType(CONTENT_TYPES.calculator).length, canonicalCalculatorContent.length)
assert.equal(getContentByType(CONTENT_TYPES.guide).length, canonicalGuideContent.length)

console.log(`Canonical content relationship validation passed: ${relationshipGraph.length} directed relationships across ${canonicalCalculatorContent.length} calculators + ${canonicalGuideContent.length} guides.`)
