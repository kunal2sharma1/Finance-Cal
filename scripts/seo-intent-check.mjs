import { calculators } from '../src/calculatorCatalog.js'
import { seoIntentContent } from '../src/seoIntentContent.js'

const ids = new Set(calculators.map(({ config }) => config.id))
const failures = []

for (const [calculatorId, content] of Object.entries(seoIntentContent)) {
  if (!ids.has(calculatorId)) failures.push(`SEO intent content references unknown calculator: ${calculatorId}`)
  if (!content.intentLabel || !content.bestFor) failures.push(`Missing intent framing: ${calculatorId}`)
  if (!Array.isArray(content.questions) || content.questions.length < 3) failures.push(`Need at least 3 intent questions: ${calculatorId}`)
  if (!Array.isArray(content.guideLinks) || content.guideLinks.length < 1) failures.push(`Need at least 1 guide link: ${calculatorId}`)
  for (const [, href] of content.guideLinks || []) {
    if (!/^\/guides\/[a-z0-9-]+$/.test(href)) failures.push(`Invalid guide link format for ${calculatorId}: ${href}`)
  }
}

const priority = ['sip','ppf','fd','emi','home-loan','loan-prepayment','xirr','nps','retirement','emergency-fund','savings-goal','compound-interest','net-worth','salary-take-home','real-return','bond-return','auto-loan','sip-vs-lumpsum']
for (const id of priority) {
  if (!seoIntentContent[id]) failures.push(`Priority calculator missing search-intent content: ${id}`)
}

if (failures.length) {
  console.error('SEO intent validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`SEO intent validation passed for ${Object.keys(seoIntentContent).length} calculators.`)
