const COMMERCIAL_ENABLED = import.meta.env.VITE_COMMERCIAL_ENABLED === 'true'

export function isCommercialEnabled() {
  return COMMERCIAL_ENABLED
}

export function getCommercialPlacement(placement) {
  if (!COMMERCIAL_ENABLED) return null

  const placements = {
    calculatorEnd: { id: 'calculator-end', type: 'affiliate-slot' },
    guideEnd: { id: 'guide-end', type: 'affiliate-slot' },
  }

  return placements[placement] || null
}
