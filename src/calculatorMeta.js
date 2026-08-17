import { getCalculatorScope } from './calculatorScope.js'
import { getResultCertainty } from './calculatorCertainty.js'

const DOMAIN_MAP = [
  ['invest', 'investing'],
  ['stock', 'investing'],
  ['mutual fund', 'investing'],
  ['sip', 'investing'],
  ['bond', 'investing'],
  ['dividend', 'investing'],
  ['save', 'saving'],
  ['fd', 'saving'],
  ['rd', 'saving'],
  ['ppf', 'saving'],
  ['loan', 'borrowing'],
  ['mortgage', 'housing'],
  ['emi', 'borrowing'],
  ['debt', 'debt'],
  ['credit', 'debt'],
  ['salary', 'salary'],
  ['ctc', 'salary'],
  ['gratuity', 'salary'],
  ['bonus', 'salary'],
  ['retirement', 'retirement'],
  ['nps', 'retirement'],
  ['epf', 'retirement'],
  ['401(k)', 'retirement'],
  ['pension', 'retirement'],
  ['tax', 'tax'],
  ['capital gain', 'tax'],
  ['education', 'education'],
  ['college', 'education'],
  ['insurance', 'insurance'],
  ['net worth', 'financial-health'],
  ['savings rate', 'financial-health'],
  ['dt i', 'financial-health'],
  ['debt-to-income', 'financial-health'],
]

function textFor(config) {
  return `${config?.title || ''} ${config?.shortDescription || ''} ${config?.category || ''}`.toLowerCase()
}

function inferDomain(config) {
  const text = textFor(config)
  const match = DOMAIN_MAP.find(([keyword]) => text.includes(keyword))
  if (match) return match[1]

  const category = String(config?.category || '').toLowerCase()
  if (category.includes('salary')) return 'salary'
  if (category.includes('loan')) return 'borrowing'
  if (category.includes('retirement')) return 'retirement'
  if (category.includes('saving')) return 'saving'
  if (category.includes('invest')) return 'investing'
  return 'financial-planning'
}

function inferIntent(config) {
  const text = textFor(config)
  if (/compare|vs\b|versus|comparison/.test(text)) return 'compare'
  if (/eligibility|eligible|afford|can i/.test(text)) return 'check'
  if (/goal|required|need|target|how much.*(save|invest)/.test(text)) return 'plan'
  if (/return|growth|future|value|projection|corpus/.test(text)) return 'project'
  if (/rate|ratio|percentage|cagr|xirr|interest/.test(text)) return 'measure'
  return 'calculate'
}

function inferModelType(config) {
  const types = new Set((config?.fields || []).map((field) => field.type || 'number'))
  const title = String(config?.title || '').toLowerCase()
  if (types.has('cashflows') || /xirr|irr/.test(title)) return 'numerical-solver'
  if (/tax|ppf|epf|nps|401\(k\)|isa|cpf|super|pension|end-of-service/.test(title)) return 'rule-based'
  if (/exchange|currency/.test(title)) return 'live-data'
  return 'standard-formula'
}

function inferCalculatorClass(config) {
  const types = new Set((config?.fields || []).map((field) => field.type || 'number'))
  if (types.has('cashflows')) return 'dynamic-input'
  if (types.has('currency-select')) return 'live-data'
  if (types.has('select')) return 'select-based'
  if (types.has('textarea')) return 'text-input'
  return 'standard'
}

function inferRisk(config, modelType) {
  if (modelType === 'live-data') return 'external-data'
  if (modelType === 'numerical-solver') return 'high'
  if (modelType === 'rule-based') return 'very-high'
  const title = String(config?.title || '').toLowerCase()
  if (/retirement|loan|mortgage|salary|investment|portfolio|net worth/.test(title)) return 'medium'
  return 'low'
}

function inferJourney(domain) {
  const journeys = {
    investing: 'wealth-building',
    saving: 'saving',
    borrowing: 'home-and-borrowing',
    housing: 'home-buying',
    debt: 'debt-free',
    salary: 'career-finance',
    retirement: 'retirement',
    tax: 'tax-planning',
    education: 'education-planning',
    insurance: 'risk-protection',
    'financial-health': 'financial-health',
    'financial-planning': 'financial-planning',
  }
  return journeys[domain] || 'financial-planning'
}

export function getCalculatorMeta(config) {
  const domain = inferDomain(config)
  const intent = inferIntent(config)
  const modelType = inferModelType(config)
  const { modelScope, note: modelingScopeNote } = getCalculatorScope(config, modelType)
  const { level: resultCertainty, note: resultCertaintyNote } = getResultCertainty(modelScope)

  return {
    domain,
    intent,
    modelType,
    modelScope,
    modelingScopeNote,
    resultCertainty,
    resultCertaintyNote,
    calculatorClass: inferCalculatorClass(config),
    riskLevel: inferRisk(config, modelType),
    primaryJourney: inferJourney(domain),
    financialQuestion: config?.shortDescription || `Use the ${config?.title || 'calculator'} to estimate the result.`,
  }
}

export function withCalculatorMeta(calculator) {
  return {
    ...calculator,
    meta: getCalculatorMeta(calculator.config),
  }
}
