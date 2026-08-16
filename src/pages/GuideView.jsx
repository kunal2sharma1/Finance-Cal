import { useEffect } from 'react'
import { setSiteSEO } from '../seo.js'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import './guide.css'

export default function GuideView({ guide }) {
  useEffect(() => {
    setSiteSEO({
      title: guide.metaTitle,
      description: guide.metaDescription,
      pathname: `/guides/${guide.slug}`,
    })

    const schemaId = `fincalc-guide-${guide.slug}`
    let schema = document.getElementById(schemaId)
    if (!schema) {
      schema = document.createElement('script')
      schema.id = schemaId
      schema.type = 'application/ld+json'
      document.head.appendChild(schema)
    }

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.metaDescription,
      mainEntityOfPage: `https://finance-cal.kunal2sharma1.workers.dev/guides/${guide.slug}`,
      author: { '@type': 'Organization', name: 'FinCalc' },
      publisher: { '@type': 'Organization', name: 'FinCalc' },
    })

    return () => schema.remove()
  }, [guide])

  return (
    <article className="guide-page">
      <Breadcrumbs
        items={[
          { label: 'FinCalc', href: '/' },
          { label: 'Financial Guides', href: '/guides' },
          { label: guide.title },
        ]}
      />

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
