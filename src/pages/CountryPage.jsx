import { getCalculatorCountries } from '../calculatorLocale.js'
import './country-page.css'

export default function CountryPage({ page, calculators, onSelect }) {
  const visible = page.priorityCalculatorIds
    .map((id) => calculators.find((item) => item.config.id === id))
    .filter(Boolean)
    .filter(({ config }) => {
      const supported = getCalculatorCountries(config)
      return !supported || supported.includes(page.code)
    })

  return (
    <section className="country-page">
      <nav className="country-page__crumbs" aria-label="Breadcrumb">
        <a href="/">FinCalc</a>
        <span aria-hidden="true">/</span>
        <span>{page.name}</span>
      </nav>

      <header className="country-page__hero">
        <span className="country-page__flag" aria-hidden="true">{page.flag}</span>
        <span className="country-page__kicker">{page.name.toUpperCase()} · {page.currency}</span>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </header>

      <section className="country-page__section" aria-labelledby="country-calculators">
        <div className="country-page__section-head">
          <div>
            <span className="country-page__kicker">START HERE</span>
            <h2 id="country-calculators">Popular calculators</h2>
          </div>
          <p>Tools shown here use the selected country’s currency where the calculation supports it.</p>
        </div>

        <div className="country-page__grid">
          {visible.map(({ config }) => (
            <button
              className="country-page__card"
              type="button"
              key={config.id}
              onClick={() => onSelect(config.id)}
            >
              <strong>{config.title}</strong>
              <span>{config.shortDescription}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="country-page__section country-page__section--note">
        <span className="country-page__kicker">LOCALIZATION POLICY</span>
        <h2>Global math vs local financial rules</h2>
        <p>{page.description}</p>
        <p>
          FinCalc will only label a calculator as country-specific when its assumptions and rules are actually localized. A currency change alone does not make a tax, pension or government-program calculator correct for another country.
        </p>
      </section>
    </section>
  )
}
