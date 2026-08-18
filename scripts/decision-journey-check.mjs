import assert from 'node:assert/strict'
import { decisionJourneys, getDecisionJourney, JOURNEY_TYPES } from '../src/decisionJourneys.js'
import { getContentById, RELATIONSHIP_TYPES } from '../src/contentModel.js'

assert.equal(decisionJourneys.length, 5, 'Phase 38 must define the five planned journey domains')

const ids = new Set()
const slugs = new Set()

for (const journey of decisionJourneys) {
  assert.ok(Object.values(JOURNEY_TYPES).includes(journey.id), `unknown journey id: ${journey.id}`)
  assert.ok(journey.slug, `missing journey slug: ${journey.id}`)
  assert.equal(ids.has(journey.id), false, `duplicate journey id: ${journey.id}`)
  assert.equal(slugs.has(journey.slug), false, `duplicate journey slug: ${journey.slug}`)
  ids.add(journey.id)
  slugs.add(journey.slug)

  assert.ok(journey.title, `missing journey title: ${journey.id}`)
  assert.ok(journey.summary, `missing journey summary: ${journey.id}`)
  assert.ok(journey.question, `missing decision question: ${journey.id}`)
  assert.ok(journey.steps.length >= 2, `journey needs at least two steps: ${journey.id}`)

  const calculatorIds = new Set()
  for (const step of journey.steps) {
    assert.equal(calculatorIds.has(step.calculatorId), false, `duplicate calculator in journey: ${journey.id}/${step.calculatorId}`)
    calculatorIds.add(step.calculatorId)
    assert.ok(step.calculator, `unresolved calculator: ${journey.id}/${step.calculatorId}`)
    assert.ok(step.calculator.title, `calculator missing title: ${step.calculatorId}`)
    assert.ok(step.explanation, `missing step explanation: ${journey.id}/${step.calculatorId}`)

    const content = getContentById(step.calculatorId)
    assert.ok(content, `calculator missing canonical content: ${step.calculatorId}`)
    assert.equal(content.type, 'calculator')
  }

  for (const guide of journey.guides) {
    assert.ok(guide.title, `guide missing title: ${journey.id}`)
    const guideRelationships = guide.relationships.filter(({ type }) => type === RELATIONSHIP_TYPES.guideExplainsCalculator)
    assert.ok(guideRelationships.length > 0, `journey guide has no calculator relationship: ${guide.id}`)
  }

  assert.equal(getDecisionJourney(journey.slug), journey, `slug lookup failed: ${journey.slug}`)
  assert.equal(getDecisionJourney(journey.id), journey, `id lookup failed: ${journey.id}`)
}

console.log(`Decision journey model validation passed: ${decisionJourneys.length} journeys.`)
