import { useEffect } from 'react'
import { setSiteSEO } from '../seo.js'
import './guide.css'

export default function GuideView({ guide }) {
  useEffect(() => {
    setSiteSEO({
      title: guide.metaTitle,
      description: guide.metaDescription,
      pathname: `/guides/${guide.slug}`,
    })
  }, [guide])

  return (
    <article className="guide-page">
      <header className="guide-page__header">
        <span className="guide-page__eyebrow">FINANCIAL GUIDE</span>
        <h1>{guide.title}</h1>
        <p className="guide-page__intro">{guide.intro}</p>
      </header>

      <div className="guide-page__body">
        <div className="guide-page__content">
          {guide.sections.map(([heading, body]) => (
            <section key={heading} className="guide-page__section">
              <h2>{heading}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>

        <aside className="guide-page__aside">
          <span className="guide-page__eyebrow">TRY THE TOOLS</span>
          <h2>Calculate it with FinCalc</h2>
          <div className="guide-page__links">
            {guide.calculatorLinks.map(([label, href]) => (
              <a key={href} href={href}>{label} →</a>
            ))}
          </div>
        </aside>
      </div>
    </article>
  )
}
