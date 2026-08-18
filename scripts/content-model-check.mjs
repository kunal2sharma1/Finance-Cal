import assert from 'node:assert/strict'
import {
  CONTENT_TYPES,
  canonicalCalculatorContent,
  canonicalContent,
  canonicalGuideContent,
  getContentById,
  getContentBySlug,
  getContentByType,
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
  assert.ok(Array.isArray(item.keywords), `keywords must be an array for ${item.id}`)
  assert.equal(getContentById(item.id), item, `id lookup failed for ${item.id}`)
  assert.equal(getContentBySlug(item.slug), item, `slug lookup failed for ${item.slug}`)
}

for (const guide of canonicalGuideContent) {
  for (const block of guide.body) {
    assert.ok(block.heading, `guide body block missing heading: ${guide.id}`)
    assert.ok(block.text, `guide body block missing text: ${guide.id}`)
  }
  for (const link of guide.links) {
    assert.ok(link.title, `guide link missing title: ${guide.id}`)
    assert.match(link.href, /^\/calculators\/[a-z0-9-]+$/, `invalid calculator link: ${link.href}`)
  }
}

assert.equal(getContentByType(CONTENT_TYPES.calculator).length, canonicalCalculatorContent.length)
assert.equal(getContentByType(CONTENT_TYPES.guide).length, canonicalGuideContent.length)

console.log(`Canonical content model validation passed: ${canonicalCalculatorContent.length} calculators + ${canonicalGuideContent.length} guides.`)
