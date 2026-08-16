import { countryPages } from '../countryPages.js'
import './country-page.css'

export default function CountriesIndex() {
  return (
    <section className="country-page">
      <header className="country-page__hero">
        <span className="country-page__kicker">GLOBAL FINANCE</span>
        <h1>Choose your country or region.</h1>
        <p>Use the calculators that fit your local currency and, where available, your local financial rules.</p>
      </header>

      <section className="country-page__section" aria-labelledby="countries-list">
        <div className="country-page__section-head">
          <div>
            <span className="country-page__kicker">SUPPORTED REGIONS</span>
            <h2 id="countries-list">FinCalc by country</h2>
          </div>
        </div>

        <div className="country-page__grid">
          {countryPages.map((page) => (
            <a key={page.code} className="country-page__card" href={`/countries/${page.slug}`}>
              <strong>{page.flag} {page.name}</strong>
              <span>{page.description}</span>
            </a>
          ))}
        </div>
      </section>
    </section>
  )
}
