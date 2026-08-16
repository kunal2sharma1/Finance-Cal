import { calculators } from '../src/calculatorCatalog.js'
import { getCalculatorSEO } from '../src/calculatorSeo.js'

const priority = [
  'sip', 'ppf', 'fd', 'rd', 'emi', 'home-loan', 'loan-prepayment', 'debt-payoff',
  'xirr', 'compound-interest', 'savings-goal', 'monthly-savings', 'emergency-fund',
  'nps', 'retirement', 'salary-take-home', 'net-worth', 'sip-vs-lumpsum',
]

const ids = new Set(calculators.map(({ config }) => config.id))
const failures = []
const warnings = []

for (const id of priority) {
  if (!ids.has(id)) failures.push(`Priority calculator is missing from catalog: ${id}`)
  const seo = getCalculatorSEO(id)
  if (!seo?.title || !seo?.description) {
    failures.push(`Missing SERP metadata: ${id}`)
    continue
  }
  if (seo.title.length > 70) warnings.push(`Long SERP title (${seo.title.length} chars): ${id}`)
  if (seo.title.split('|')[0].toLowerCase().includes('calculator calculator')) {
    failures.push(`Repeated calculator wording in title: ${id}`)
  }
  if (/\b(calculator|calculator)\b.*\b\1\b/i.test(seo.title)) {
    failures.push(`Repeated keyword in title: ${id}`)
  }
  if (seo.description.length < 100) warnings.push(`Short SERP description (${seo.description.length} chars): ${id}`)
  if (seo.description.length > 170) warnings.push(`Long SERP description (${seo.description.length} chars): ${id}`)
}

const titles = new Map()
for (const id of priority) {
  const seo = getCalculatorSEO(id)
  if (!seo) continue
  const previous = titles.get(seo.title)
  if (previous) failures.push(`Duplicate priority SERP title: ${previous} and ${id}`)
  else titles.set(seo.title, id)
}

if (warnings.length) {
  console.log('SERP quality warnings:')
  warnings.forEach((warning) => console.log(`- ${warning}`))
}

if (failures.length) {
  console.error('SERP quality validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`SERP quality validation passed for ${priority.length} priority calculators.`)
