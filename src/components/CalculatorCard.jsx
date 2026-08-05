export default function CalculatorCard({ config, onSelect }) {
  return (
    <button className="calc-card" onClick={() => onSelect(config.id)}>
      <span className="calc-card__category">{config.category}</span>
      <h3 className="calc-card__title">{config.title}</h3>
      <p className="calc-card__desc">{config.shortDescription}</p>
      <span className="calc-card__cta">Open calculator →</span>
    </button>
  )
}
