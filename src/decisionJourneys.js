import { getCalculatorById } from './calculatorCatalog.js'
import { getContentById, getContentBySlug, RELATIONSHIP_TYPES } from './contentModel.js'

export const JOURNEY_TYPES = Object.freeze({
  wealth: 'wealth',
  retirement: 'retirement',
  homeBuying: 'home-buying',
  debt: 'debt',
  jobComparison: 'job-comparison',
})

const journeyDefinitions = [
  {
    id: JOURNEY_TYPES.wealth,
    slug: 'wealth-building',
    title: 'Build wealth deliberately',
    summary: 'Turn income, spending, saving and investing decisions into a sequence instead of isolated calculations.',
    question: 'How can I understand whether my current saving and investing path is enough?',
    steps: [
      ['savings-rate', 'Start with how much of your income is available for goals and investing.'],
      ['monthly-savings', 'Translate that capacity into a realistic monthly contribution.'],
      ['wealth-accumulation', 'Project how contributions and assumptions could build wealth over time.'],
      ['investment-return', 'Stress-test the return assumption rather than treating it as a guarantee.'],
    ],
    guideIds: ['guide:savings-rate-and-wealth', 'guide:real-return-vs-inflation'],
  },
  {
    id: JOURNEY_TYPES.retirement,
    slug: 'retirement-planning',
    title: 'Plan for retirement',
    summary: 'Estimate what retirement may require, identify a gap and test the assumptions behind the plan.',
    question: 'Will my expected retirement savings support the spending I may need?',
    steps: [
      ['retirement', 'Estimate the retirement corpus using spending, inflation and time horizon.'],
      ['retirement-gap', 'Compare the estimated need with the resources you expect to have.'],
      ['retirement-income', 'Translate the corpus into a possible retirement-income scenario.'],
    ],
    guideIds: ['guide:how-much-retirement-corpus-do-i-need'],
  },
  {
    id: JOURNEY_TYPES.homeBuying,
    slug: 'home-buying',
    title: 'Evaluate a home purchase',
    summary: 'Move from affordability to financing and finally to the rent-versus-buy trade-off.',
    question: 'Can I afford this home, and does buying make sense for my situation?',
    steps: [
      ['home-loan-affordability', 'Check the financing level your income and assumptions can support.'],
      ['down-payment', 'Understand the upfront cash requirement and its effect on financing.'],
      ['emi', 'See the recurring payment and total financing cost.'],
      ['rent-vs-buy', 'Compare ownership with renting over the expected holding period.'],
    ],
    guideIds: ['guide:rent-vs-buy'],
  },
  {
    id: JOURNEY_TYPES.debt,
    slug: 'debt-management',
    title: 'Understand and manage debt',
    summary: 'Measure existing debt pressure, understand loan cost and test repayment choices.',
    question: 'How expensive is my debt, and what changes would improve the repayment picture?',
    steps: [
      ['debt-to-income', 'Measure how much recurring income is already committed to debt.'],
      ['personal-loan', 'Understand the payment and total cost of a representative loan.'],
      ['loan-prepayment', 'Test how additional payments could change the repayment path.'],
    ],
    guideIds: ['guide:debt-to-income-ratio-explained', 'guide:how-emi-is-calculated'],
  },
  {
    id: JOURNEY_TYPES.jobComparison,
    slug: 'job-offer-comparison',
    title: 'Compare job offers realistically',
    summary: 'Look beyond headline CTC and compare take-home pay, compensation structure and the financial trade-offs of an offer.',
    question: 'Which job offer is actually better after compensation and practical costs?',
    steps: [
      ['salary-take-home', 'Estimate the amount that may actually reach your bank account.'],
      ['ctc-to-in-hand', 'Translate headline CTC into a more comparable take-home view.'],
      ['job-offer-comparison', 'Compare the offers using the assumptions that matter to you.'],
    ],
    guideIds: ['guide:ctc-vs-in-hand-salary'],
  },
]

function resolveStep([calculatorId, explanation]) {
  const calculator = getCalculatorById(calculatorId)
  if (!calculator) return null
  return Object.freeze({ calculatorId, explanation, calculator: calculator.config })
}

function resolveGuide(id) {
  return getContentById(id) || getContentBySlug(id) || null
}

export const decisionJourneys = Object.freeze(journeyDefinitions.map((journey) => Object.freeze({
  ...journey,
  steps: Object.freeze(journey.steps.map(resolveStep).filter(Boolean)),
  guides: Object.freeze(journey.guideIds.map(resolveGuide).filter(Boolean)),
})))

const journeyBySlug = new Map(decisionJourneys.map((journey) => [journey.slug, journey]))
const journeyById = new Map(decisionJourneys.map((journey) => [journey.id, journey]))

export function getDecisionJourney(slugOrId) {
  return journeyBySlug.get(slugOrId) || journeyById.get(slugOrId) || null
}

export function getDecisionJourneys() {
  return decisionJourneys
}

export function getJourneyCalculatorIds(journey) {
  return journey?.steps.map(({ calculatorId }) => calculatorId) || []
}

export function getJourneyRelationships(journey) {
  if (!journey) return []
  return journey.steps.flatMap(({ calculatorId }) => {
    const calculator = getContentById(calculatorId)
    return calculator?.relationships?.filter(({ type }) => type === RELATIONSHIP_TYPES.calculatorExplainedByGuide) || []
  })
}
