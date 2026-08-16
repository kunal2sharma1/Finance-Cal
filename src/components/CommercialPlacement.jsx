import { getCommercialPlacement } from '../commercial.js'

export default function CommercialPlacement({ placement, label = 'Partner placement' }) {
  const slot = getCommercialPlacement(placement)
  if (!slot) return null

  return (
    <div
      className="commercial-placement"
      data-commercial-placement={slot.id}
      data-commercial-type="affiliate-slot"
    >
      <span className="commercial-placement__label">{label}</span>
      <p>Affiliate placement slot reserved for a verified partner offer. Commercial content will be clearly labeled and will not affect organic calculator results.</p>
    </div>
  )
}
