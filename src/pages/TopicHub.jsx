import { useEffect } from 'react'
import CalculatorCard from '../components/CalculatorCard.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { topicHubs } from '../topicHubs.js'
import { getGuidesByTopic } from '../guides.js'
import { setBreadcrumbSchema } from '../seo.js'
import './topic-hub.css'

export default function TopicHub({ slug, calculators, onSelect }) {
  const hub = topicHubs[slug]

  useEffect(() => {
    if (!hub) return
    setBreadcrumbSchema([
      { label: 'FinCalc', href: '/' },
      { label: hub.title },
    ])
  }, [hub])

  if (!hub) return null

  const selected = hub.calculatorIds
    .map((id) => calculators.find((calculator) => calculator.config.id === id))
    .filter(Boolean)
  const guides = getGuidesByTopic(slug)

  return (
    <section className="topic-hub">
      <Breadcrumbs
        items={[
          { label: 'FinCalc', href: '/' },
          { label: hub.title },
        ]}
      />

      <div className="topic-hub__hero">
        <span className="topic-hub__eyebrow">FINANCIAL TOOLKIT</span>
        <h1>{hub.title}</h1>
        <p>{hub.intro}</p>
        <span className="topic-hub__count">{selected.length} calculators in this topic</span>
      </div>

      {guides.length > 0 && (
        <section className="topic-hub__guides" aria-labelledby="topic-guides">
          <div className="topic-hub__guides-heading">
            <span className="topic-hub__eyebrow">PLAIN-ENGLISH GUIDES</span>
            <h2 id="topic-guides">Understand the decision before you calculate</h2>
          </div>
          <div className="topic-hub__guide-grid">
            {guides.map((guide) => (
              <a className="topic-hub__guide-card" key={guide.slug} href={`/guides/${guide.slug}`}>
                <strong>{guide.title}</strong>
                <span>{guide.intro}</span>
                <span>Read guide →</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="topic-hub__grid">
        {selected.map(({ config }) => (
          <CalculatorCard key={config.id} config={config} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}
