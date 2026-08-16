import { calculatorSEOContent } from '../seoCalculatorContent.js'

export default function CalculatorSEOSections({ calculatorId }) {
  const content = calculatorSEOContent[calculatorId]
  if (!content) return null

  return (
    <section className="calc-view__seo-content" aria-labelledby="calculator-guide">
      <span className="calc-view__eyebrow">USEFUL TO KNOW</span>
      <h2 id="calculator-guide">Understand the calculation before you use it</h2>
      <div className="calc-view__seo-sections">
        {content.sections.map(([heading, body]) => (
          <section key={heading} className="calc-view__seo-section">
            <h3>{heading}</h3>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </section>
  )
}
