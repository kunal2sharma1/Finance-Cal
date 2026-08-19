import { useEffect } from 'react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { setBreadcrumbSchema } from '../seo.js'
import './decision-journey.css'

export default function DecisionJourney({ journey }) {
  useEffect(() => {
    if (!journey) return
    setBreadcrumbSchema([
      { label: 'FinCalc', href: '/' },
      { label: 'Decision journeys' },
      { label: journey.title },
    ])
  }, [journey])

  if (!journey) return null

  return (
    <section className="decision-journey">
      <Breadcrumbs
        items={[
          { label: 'FinCalc', href: '/' },
          { label: 'Decision journeys', href: '/journeys' },
          { label: journey.title },
        ]}
      />

      <header className="decision-journey__hero">
        <span className="decision-journey__eyebrow">DECISION JOURNEY</span>
        <h1>{journey.title}</h1>
        <p>{journey.summary}</p>
        <div className="decision-journey__question">
          <strong>The question</strong>
          <span>{journey.question}</span>
        </div>
      </header>

      <div className="decision-journey__steps" aria-label="Decision steps">
        {journey.steps.map((step, index) => (
          <article className="decision-journey__step" key={step.calculatorId}>
            <div className="decision-journey__number" aria-hidden="true">{index + 1}</div>
            <div className="decision-journey__step-content">
              <span className="decision-journey__step-label">CALCULATE</span>
              <h2>{step.calculator.title}</h2>
              <p>{step.explanation}</p>
              <a className="decision-journey__action" href={`/calculators/${encodeURIComponent(step.calculatorId)}`}>
                Open calculator →
              </a>
            </div>
          </article>
        ))}
      </div>

      {journey.guides.length > 0 && (
        <section className="decision-journey__guides" aria-labelledby="journey-guides">
          <span className="decision-journey__eyebrow">UNDERSTAND THE ASSUMPTIONS</span>
          <h2 id="journey-guides">Useful guides for this decision</h2>
          <div className="decision-journey__guide-grid">
            {journey.guides.map((guide) => (
              <a className="decision-journey__guide" key={guide.id} href={`/guides/${guide.slug.replace(/^guide:/, '')}`}>
                <strong>{guide.title}</strong>
                <span>{guide.summary}</span>
                <span>Read guide →</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
