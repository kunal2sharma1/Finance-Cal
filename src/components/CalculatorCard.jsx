export default function CalculatorCard({ config, onSelect }) {
  const href = `/calculators/${encodeURIComponent(config.id)}`

  function handleClick(event) {
    event.preventDefault()
    onSelect(config.id)
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
