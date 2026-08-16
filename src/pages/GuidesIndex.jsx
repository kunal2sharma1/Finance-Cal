import { useEffect } from 'react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { guides } from '../guides.js'
import { setSiteSEO } from '../seo.js'
import './guides-index.css'

export default function GuidesIndex() {
  useEffect(() => {
    setSiteSEO({
      title: 'Financial Guides | Practical Money Explanations | FinCalc',
      description: 'Plain-English financial guides covering investing, loans, salary, budgeting, retirement and major money decisions.',
      pathname: '/guides',
    })
  }, [])

  return (
    <section className="guides-index">
      <Breadcrumbs items={[{ label: 'FinCalc', href: '/' }, { label: 'Financial Guides' }]} />

      <header className="guides-index__header">
        <span className="guides-index__eyebrow">FINANCIAL GUIDES</span>
        <h1>Understand the decision before you calculate</h1>
        <p>Plain-English explanations for common financial questions, with calculators to help you put the numbers into practice.</p>
      </header>

      <div className="guides-index__grid">
        {guides.map((guide) => (
          <a key={guide.slug} href={`/guides/${guide.slug}`} className="guides-index__card">
            <span className="guides-index__card-topic">{guide.topic}</span>
            <h2>{guide.title}</h2>
            <p>{guide.intro}</p>
            <span className="guides-index__card-link">Read guide →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
