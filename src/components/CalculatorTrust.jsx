import { getTrustMetadata } from '../trustMetadata.js'

function inferMethodology(config) {
  const hasRates = config.fields.some((field) => /rate|return|yield|interest/i.test(`${field.name} ${field.label}`))
  const hasDates = config.fields.some((field) => /date|time|tenure|years|months/i.test(`${field.name} ${field.label}`))

  if (hasRates && hasDates) return 'Uses the inputs shown above together with the calculator formula to estimate an outcome over the selected period.'
  if (hasRates) return 'Uses the values you enter and the calculator formula to estimate the financial outcome.'
  return 'Uses the values you enter and the calculator formula to produce a planning estimate.'
}

export default function CalculatorTrust({ config, explanation }) {
  const metadata = getTrustMetadata(config.id)

  return (
    <section className="calc-trust" aria-labelledby="calculator-trust">
      <div className="calc-trust__header">
        <span className="calc-view__eyebrow">TRUST & TRANSPARENCY</span>
        <h2 id="calculator-trust">How to interpret this result</h2>
      </div>

      <div className="calc-trust__grid">
        <section className="calc-trust__item">
          <h3>Methodology</h3>
          <p>{inferMethodology(config)}</p>
        </section>

        <section className="calc-trust__item">
          <h3>Assumptions</h3>
          <p>{explanation.disclaimer}</p>
        </section>

        <section className="calc-trust__item">
          <h3>What this is not</h3>
          <p>This is an estimate for planning and comparison. It is not an official quote, tax filing, lender decision, account statement or personalised financial advice.</p>
        </section>

        <section className="calc-trust__item">
          <h3>Review information</h3>
          {metadata ? (
            <>
              <p>Rule assumptions reviewed: {metadata.reviewed}.</p>
              <p>{metadata.scope}</p>
              <a href={metadata.sourceUrl} target="_blank" rel="noreferrer noopener">
                Source: {metadata.sourceLabel} ↗
              </a>
            </>
          ) : (
            <p>This calculator uses the methodology and assumptions described on this page. No official rule source is claimed unless one is listed here.</p>
          )}
        </section>
      </div>
    </section>
  )
}
