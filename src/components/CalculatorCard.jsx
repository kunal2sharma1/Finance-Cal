export default function CalculatorCard({ config, onSelect }) {
  const href = `/calculators/${encodeURIComponent(config.id)}`

  function handleClick(event) {
    // Keep the React navigation path for SPA transitions, but never block
    // the native link. If client-side navigation is unavailable or errors,
    // the browser can still open the calculator URL normally.
    if (event.defaultPrevented) return
    try {
      onSelect?.(config.id)
    } catch {
      // Native <a href> navigation remains the fallback.
    }
  }

  return (
    <a
      className="calc-card"
      href={href}
      onClick={handleClick}
      aria-label={`Open ${config.title}`}
    >
      <span className="calc-card__category">{config.category}</span>
      <h3 className="calc-card__title">{config.title}</h3>
      <p className="calc-card__desc">{config.shortDescription}</p>
      <span className="calc-card__cta">Open calculator →</span>
    </a>
  )
}
