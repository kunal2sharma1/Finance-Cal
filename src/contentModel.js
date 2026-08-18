import { calculators } from './calculatorCatalog.js'
import { guides } from './guides.js'
import { getCalculatorSEO } from './calculatorSeo.js'

export const CONTENT_TYPES = Object.freeze({
  calculator: 'calculator',
  guide: 'guide',
})

function cloneList(value) {
  return Array.isArray(value) ? [...value] : []
}

function normalizeText(value) {
  return String(value || '').trim()
}

function canonicalCalculator(calculator) {
  const config = calculator.config
  const seo = getCalculatorSEO(config.id) || {}

  return Object.freeze({
    type: CONTENT_TYPES.calculator,
    id: config.id,
    slug: config.id,
    title: normalizeText(config.title),
    summary: normalizeText(config.shortDescription),
    metaTitle: normalizeText(seo.title),
    metaDescription: normalizeText(seo.description),
    topic: normalizeText(config.category),
    body: [],
    links: [],
    keywords: cloneList(config.keywords),
  })
}

function canonicalGuide(guide) {
  return Object.freeze({
    type: CONTENT_TYPES.guide,
    id: `guide:${guide.slug}`,
    slug: normalizeText(guide.slug),
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
    keywords: [],
  })
}

export const canonicalCalculatorContent = Object.freeze(calculators.map(canonicalCalculator))
export const canonicalGuideContent = Object.freeze(guides.map(canonicalGuide))
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
