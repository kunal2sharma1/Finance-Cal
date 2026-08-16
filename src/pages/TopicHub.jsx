import CalculatorCard from '../components/CalculatorCard.jsx'
import { topicHubs } from '../topicHubs.js'
import './topic-hub.css'

export default function TopicHub({ slug, calculators, onSelect }) {
  const hub = topicHubs[slug]

  if (!hub) return null

  const selected = hub.calculatorIds
    .map((id) => calculators.find((calculator) => calculator.config.id === id))
    .filter(Boolean)

  return (
    <section className="topic-hub">
      <div className="topic-hub__hero">
        <span className="topic-hub__eyebrow">FINANCIAL TOOLKIT</span>
        <h1>{hub.title}</h1>
        <p>{hub.intro}</p>
        <span className="topic-hub__count">{selected.length} calculators in this topic</span>
      </div>

      <div className="topic-hub__grid">
        {selected.map(({ config }) => (
          <CalculatorCard key={config.id} config={config} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}
