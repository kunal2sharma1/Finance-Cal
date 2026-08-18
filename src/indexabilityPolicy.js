const INDEXABLE_ROUTE_TYPES = new Set([
  'home',
  'calculator',
  'guide',
  'guides',
  'country',
  'countries',
  'hub',
  'info',
  'journey',
])

const NOINDEX_ROUTE_TYPES = new Set(['not-found', 'unknown'])

export function getIndexability({ routeType, exists = true } = {}) {
  if (!exists || NOINDEX_ROUTE_TYPES.has(routeType) || !INDEXABLE_ROUTE_TYPES.has(routeType)) {
    return { index: false, follow: true, reason: 'non-public-or-unresolved-route' }
  }

  return { index: true, follow: true, reason: 'public-canonical-route' }
}

export function getRobotsContent(policy) {
  return policy.index
    ? policy.follow ? 'index, follow' : 'index, nofollow'
    : policy.follow ? 'noindex, follow' : 'noindex, nofollow'
}

export const INDEXABLE_ROUTE_TYPES_LIST = [...INDEXABLE_ROUTE_TYPES]
