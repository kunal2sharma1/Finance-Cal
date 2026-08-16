import { useEffect } from 'react'
import { setSiteSEO } from '../seo.js'
import './not-found.css'

export default function NotFound() {
  useEffect(() => {
    setSiteSEO({
      title: 'Page Not Found | FinCalc',
      description: 'The FinCalc page you requested could not be found.',
      pathname: window.location.pathname,
      noindex: true,
    })
  }, [])

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <span className="not-found__eyebrow">404</span>
      <h1 id="not-found-title">We could not find that page</h1>
      <p>The address may be incorrect or the page may have moved.</p>
      <a href="/">Go back to FinCalc</a>
    </section>
  )
}
