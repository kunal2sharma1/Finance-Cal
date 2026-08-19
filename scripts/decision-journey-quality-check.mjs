import assert from 'node:assert/strict'
import { decisionJourneys, JOURNEY_TYPES } from '../src/decisionJourneys.js'

const expected = {
  [JOURNEY_TYPES.wealth]: {
    slug: 'wealth-building',
    steps: ['savings-rate', 'monthly-savings', 'wealth-accumulation', 'investment-return'],
    guides: ['guide:savings-rate-and-wealth', 'guide:real-return-vs-inflation'],
  },
  [JOURNEY_TYPES.retirement]: {
    slug: 'retirement-planning',
    steps: ['retirement', 'retirement-gap', 'retirement-income'],
    guides: ['guide:how-much-retirement-corpus-do-i-need'],
  },
  [JOURNEY_TYPES.homeBuying]: {
    slug: 'home-buying',
    steps: ['home-loan-affordability', 'down-payment', 'emi', 'rent-vs-buy'],
    guides: ['guide:rent-vs-buy'],
  },
  [JOURNEY_TYPES.debt]: {
    slug: 'debt-management',
    steps: ['debt-to-income', 'personal-loan', 'loan-prepayment'],
    guides: ['guide:debt-to-income-ratio-explained', 'guide:how-emi-is-calculated'],
  },
  [JOURNEY_TYPES.jobComparison]: {
    slug: 'job-offer-comparison',
    steps: ['salary-take-home', 'ctc-to-in-hand', 'job-offer-comparison'],
    guides: ['guide:ctc-vs-in-hand-salary'],
  },
}

assert.equal(decisionJourneys.length, Object.keys(expected).length, 'Phase 39 must expose exactly five first decision journeys')

for (const [journeyId, contract] of Object.entries(expected)) {
  const journey = decisionJourneys.find(({ id }) => id === journeyId)
  assert.ok(journey, `missing first decision journey: ${journeyId}`)
  assert.equal(journey.slug, contract.slug, `journey slug changed: ${journeyId}`)

  const actualSteps = journey.steps.map(({ calculatorId }) => calculatorId)
  assert.deepEqual(actualSteps, contract.steps, `journey step order/content changed: ${journeyId}`)

  const actualGuides = journey.guides.map(({ id }) => id)
  assert.deepEqual(actualGuides, contract.guides, `journey guide coverage changed: ${journeyId}`)

  assert.ok(journey.question.endsWith('?'), `journey needs a decision question: ${journeyId}`)
  assert.ok(journey.summary.length >= 80, `journey summary is too thin: ${journeyId}`)

  for (const step of journey.steps) {
    assert.ok(step.explanation.length >= 40, `step explanation is too thin: ${journeyId}/${step.calculatorId}`)
    assert.ok(step.calculator, `unresolved journey calculator: ${journeyId}/${step.calculatorId}`)
  }

  for (const guide of journey.guides) {
    assert.ok(guide.title, `journey guide has no title: ${journeyId}`)
    assert.ok(guide.metaDescription, `journey guide has no SEO description: ${journeyId}/${guide.id}`)
  }
}

console.log('Decision journey quality validation passed: five first journeys are complete and contract-stable.')
