import { getCommercialPlacement } from '../commercial.js'

export default function CommercialPlacement({ placement, label = 'Partner placement' }) {
  const slot = getCommercialPlacement(placement)
  if (!slot) return null

  return (
    <div className="commercial-placement" data-commercial-placement={slot.id}>
      <span className="commercial-placement__label">{label}</span>
      <p>Commercial placements are disabled until a verified partner offer is configured.</p>
    </div>
  )
}
