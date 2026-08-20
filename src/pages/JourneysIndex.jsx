import { useEffect } from 'react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getDecisionJourneys } from '../decisionJourneys.js'
import { setBreadcrumbSchema } from '../seo.js'
import './journeys-index.css'

export default function JourneysIndex() {
  const journeys = getDecisionJourneys()

  useEffect(() => {
    setBreadcrumbSchema([
      { label: 'FinCalc', href: '/' },
      { label: 'Decision journeys' },
    ])
  }, [])

  return (
    <section className="journeys-index">
      <Breadcrumbs items={[{ label: 'FinCalc', href: '/' }, { label: 'Decision journeys' }]} />
      <header className="journeys-index__hero">
        <span className="journeys-index__eyebrow">DECISION JOURNEYS</span>
        <h1>Start with the decision, not the formula.</h1>
        <p>Choose a financial decision and work through the calculators, assumptions and next steps that belong together.</p>
      </header>

      <div className="journeys-index__grid">
        {journeys.map((journey) => (
          <a className="journeys-index__card" href={`/journeys/${journey.slug}`} key={journey.id}>
            <span className="journeys-index__card-label">{journey.steps.length} steps</span>
            <h2>{journey.title}</h2>
            <p>{journey.summary}</p>
            <span className="journeys-index__action">Explore journey →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
