import { calculators } from './calculatorCatalog.js'
import { guides } from './guides.js'

const normalize = (value) => String(value || '').trim().toLowerCase()

const buildCalculatorEntry = ({ config }) => ({
  type: 'calculator',
  id: config.id,
  title: config.title,
  description: config.shortDescription,
  category: config.category,
  keywords: Array.isArray(config.keywords) ? [...config.keywords] : [],
  countries: Array.isArray(config.countries) ? [...config.countries] : [],
  href: `/calculators/${encodeURIComponent(config.id)}`,
  searchText: normalize([
    config.title,
    config.shortDescription,
    config.category,
    ...(config.keywords || []),
  ].filter(Boolean).join(' ')),
})

const buildGuideEntry = (guide) => ({
  type: 'guide',
  slug: guide.slug,
  title: guide.title,
  description: guide.metaDescription || guide.intro,
  topic: guide.topic,
  href: `/guides/${guide.slug}`,
  searchText: normalize([
    guide.title,
    guide.intro,
    guide.topic,
    ...guide.sections.flat(),
  ].filter(Boolean).join(' ')),
})

export const searchIndex = Object.freeze([
  ...calculators.map(buildCalculatorEntry),
  ...guides.map(buildGuideEntry),
])

export const calculatorSearchIndex = Object.freeze(searchIndex.filter((entry) => entry.type === 'calculator'))
export const guideSearchIndex = Object.freeze(searchIndex.filter((entry) => entry.type === 'guide'))
