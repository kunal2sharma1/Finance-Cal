export const SITE_NAME = 'FinCalc'

// Single source of truth for public canonical URLs used by runtime SEO and
// generated crawl artifacts. Keep this stable across preview/production hosts.
export const CANONICAL_SITE_URL = 'https://finance-cal.kunal2sharma1.workers.dev'

export function getCanonicalUrl(pathname = '/') {
  const cleanPath = pathname || '/'
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  return `${CANONICAL_SITE_URL}${normalizedPath}`
}
