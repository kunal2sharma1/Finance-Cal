import assert from 'node:assert/strict'
import { decisionJourneys, getNextCalculatorRecommendations } from '../src/decisionJourneys.js'

const seenEdges = new Set()

for (const journey of decisionJourneys) {
  journey.steps.forEach((step, index) => {
    const recommendations = getNextCalculatorRecommendations(step.calculatorId)
    const expectedNext = journey.steps[index + 1]?.calculatorId

    if (expectedNext) {
      assert.ok(
        recommendations.some(({ calculatorId, journeyId }) => calculatorId === expectedNext && journeyId === journey.id),
        `missing next-calculator edge: ${journey.id}/${step.calculatorId} -> ${expectedNext}`,
      )
      const edge = `${journey.id}:${step.calculatorId}->${expectedNext}`
      assert.equal(seenEdges.has(edge), false, `duplicate next-calculator edge: ${edge}`)
      seenEdges.add(edge)
    }

    assert.ok(!recommendations.some(({ calculatorId }) => calculatorId === step.calculatorId), `self recommendation: ${step.calculatorId}`)
    assert.ok(recommendations.length <= 3, `too many next recommendations: ${step.calculatorId}`)
  })

  const finalStep = journey.steps.at(-1)
  const finalRecommendations = getNextCalculatorRecommendations(finalStep.calculatorId)
  assert.ok(!finalRecommendations.some(({ journeyId }) => journeyId === journey.id), `terminal journey step has a next edge: ${journey.id}`)
}

console.log(`Next-calculator validation passed: ${seenEdges.size} journey edges are actionable and ordered.`)
