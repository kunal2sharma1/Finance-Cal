// Routing helpers keep calculator URL behavior in one place.
// Calculator IDs are the canonical identifiers; incoming URLs may use a
// different letter case, but the app always resolves them to the registered
// canonical ID.

export function findCalculatorByRouteId(calculators, rawId) {
  if (!rawId) return null

  const decodedId = decodeURIComponent(rawId)
  const exact = calculators.find((item) => item.config.id === decodedId)
  if (exact) return exact

  const normalized = decodedId.toLowerCase()
  return calculators.find((item) => item.config.id.toLowerCase() === normalized) || null
}

export function buildCalculatorPath(calculatorId) {
  return `/calculators/${encodeURIComponent(calculatorId)}`
}

export function isCanonicalCalculatorPath(pathname, calculatorId) {
  return pathname === buildCalculatorPath(calculatorId)
}
