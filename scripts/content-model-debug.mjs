import { canonicalCalculatorContent, canonicalGuideContent } from '../src/contentModel.js'

const all = [...canonicalCalculatorContent, ...canonicalGuideContent]
const seen = new Map()
for (const item of all) {
  const existing = seen.get(item.slug)
  if (existing) {
    console.log(JSON.stringify({ slug: item.slug, first: existing, duplicate: item }, null, 2))
  } else {
    seen.set(item.slug, item)
  }
}
