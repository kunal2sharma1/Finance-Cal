import { trackEvent } from '../analytics.js'
import './next-calculator-section.css'

export default function NextCalculatorSection({ currentCalculatorId, recommendations }) {
  if (!recommendations.length) return null

  return (
    <nav className="next-calculator" aria-labelledby="what-next">
      <div className="next-calculator__heading">
        <span className="calc-view__eyebrow">NEXT DECISION</span>
        <h2 id="what-next">What should I calculate next?</h2>
        <p>Follow the next useful step instead of starting over with a disconnected calculator.</p>
      </div>
      <div className="next-calculator__grid">
        {recommendations.map((item) => (
          <a
            key={`${item.journeyId}:${item.calculatorId}`}
            className="next-calculator__link"
            href={`/calculators/${encodeURIComponent(item.calculatorId)}`}
            onClick={() => trackEvent('next_calculator_select', {
              calculatorId: currentCalculatorId,
              nextCalculatorId: item.calculatorId,
              journeyId: item.journeyId,
            })}
          >
            <span className="next-calculator__journey">{item.journeyTitle}</span>
            <strong>{item.calculator.title}</strong>
            <small>{item.explanation}</small>
            <span className="next-calculator__cta">Calculate next →</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
