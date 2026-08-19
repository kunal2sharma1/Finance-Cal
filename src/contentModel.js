import { calculators } from './calculatorCatalog.js'
import { guides } from './guides.js'
import { getCalculatorSEO } from './calculatorSeo.js'

export const CONTENT_TYPES = Object.freeze({
  calculator: 'calculator',
  guide: 'guide',
})

export const RELATIONSHIP_TYPES = Object.freeze({
  guideExplainsCalculator: 'explains',
  calculatorExplainedByGuide: 'explained-by',
})

function cloneList(value) {
  return Array.isArray(value) ? [...value] : []
}

function normalizeText(value) {
  return String(value || '').trim()
}

function calculatorIdFromHref(href) {
  const match = normalizeText(href).match(/^\/calculators\/([a-z0-9-]+)$/)
  return match ? match[1] : null
}

function canonicalCalculator(calculator) {
  const config = calculator.config
  const seo = getCalculatorSEO(config.id) || {}

  return Object.freeze({
    type: CONTENT_TYPES.calculator,
    id: config.id,
    slug: `calculator:${config.id}`,
    title: normalizeText(config.title),
    summary: normalizeText(config.shortDescription),
    metaTitle: normalizeText(seo.title || config.title),
    metaDescription: normalizeText(seo.description || config.shortDescription),
    topic: normalizeText(config.category),
    body: [],
    links: [],
    relationships: [],
    keywords: cloneList(config.keywords),
  })
}

function canonicalGuide(guide) {
  return Object.freeze({
    type: CONTENT_TYPES.guide,
    id: `guide:${guide.slug}`,
    slug: `guide:${guide.slug}`,
    title: normalizeText(guide.title),
    summary: normalizeText(guide.intro),
    metaTitle: normalizeText(guide.metaTitle),
    metaDescription: normalizeText(guide.metaDescription),
    topic: normalizeText(guide.topic),
    body: cloneList(guide.sections).map(([heading, text]) => Object.freeze({
      heading: normalizeText(heading),
      text: normalizeText(text),
    })),
    links: cloneList(guide.calculatorLinks).map(([title, href]) => Object.freeze({
      title: normalizeText(title),
      href: normalizeText(href),
    })),
    relationships: [],
    keywords: [],
  })
}

const baseCalculatorContent = calculators.map(canonicalCalculator)
const baseGuideContent = guides.map(canonicalGuide)
const calculatorById = new Map(baseCalculatorContent.map((item) => [item.id, item]))

const guideRelationships = baseGuideContent.flatMap((guide) => guide.links.flatMap((link) => {
  const calculatorId = calculatorIdFromHref(link.href)
  if (!calculatorId) return []

  const calculator = calculatorById.get(calculatorId)
  if (!calculator) return []

  return [{
    sourceId: guide.id,
    targetId: calculator.id,
    type: RELATIONSHIP_TYPES.guideExplainsCalculator,
    label: link.title,
  }]
}))

const calculatorRelationships = guideRelationships.map((relationship) => ({
  sourceId: relationship.targetId,
  targetId: relationship.sourceId,
  type: RELATIONSHIP_TYPES.calculatorExplainedByGuide,
  label: relationship.label,
}))

const relationshipsBySource = new Map()
for (const relationship of [...guideRelationships, ...calculatorRelationships]) {
  const list = relationshipsBySource.get(relationship.sourceId) || []
  list.push(Object.freeze(relationship))
  relationshipsBySource.set(relationship.sourceId, list)
}

export const canonicalCalculatorContent = Object.freeze(baseCalculatorContent.map((item) => Object.freeze({
  ...item,
  relationships: Object.freeze(relationshipsBySource.get(item.id) || []),
})))

export const canonicalGuideContent = Object.freeze(baseGuideContent.map((item) => Object.freeze({
  ...item,
  relationships: Object.freeze(relationshipsBySource.get(item.id) || []),
})))

export const canonicalContent = Object.freeze([
  ...canonicalCalculatorContent,
  ...canonicalGuideContent,
])

const contentById = new Map(canonicalContent.map((item) => [item.id, item]))
const contentBySlug = new Map(canonicalContent.map((item) => [item.slug, item]))

export function getContentById(id) {
  return contentById.get(id) || null
}

export function getContentBySlug(slug) {
  return contentBySlug.get(slug) || null
}

export function getContentByType(type) {
  return canonicalContent.filter((item) => item.type === type)
}

export function getContentRelationships(contentId) {
  return canonicalContent.find((item) => item.id === contentId)?.relationships || []
}

export function getContentRelationshipGraph() {
  return [...guideRelationships, ...calculatorRelationships].map((relationship) => ({ ...relationship }))
}
