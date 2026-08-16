import { topicHubs } from '../topicHubs.js'
import './topic-hub-links.css'

export default function TopicHubLinks() {
  return (
    <section className="topic-hub-links" aria-labelledby="explore-topics">
      <div className="topic-hub-links__heading">
        <span>EXPLORE BY GOAL</span>
        <h2 id="explore-topics">Find calculators by financial topic</h2>
        <p>Start with the money decision you are trying to make, then choose a calculator.</p>
      </div>

      <div className="topic-hub-links__grid">
        {Object.values(topicHubs).map((hub) => (
          <a key={hub.slug} href={`/${hub.slug}`} className="topic-hub-links__card">
            <strong>{hub.title}</strong>
            <span>{hub.intro}</span>
            <small>Explore topic →</small>
          </a>
        ))}
      </div>
    </section>
  )
}
