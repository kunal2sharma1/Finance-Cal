import { useEffect, useMemo, useRef, useState } from 'react'
import CalculatorForm from '../components/CalculatorForm.jsx'
import ResultPanel from '../components/ResultPanel.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import CalculatorSEOSections from '../components/CalculatorSEOSections.jsx'
import CalculatorTrust from '../components/CalculatorTrust.jsx'
import { calculators, getCalculatorsByCategory } from '../calculatorCatalog.js'
import { getCalculatorCurrency } from '../calculatorLocale.js'
import { trackEvent } from '../analytics.js'
import './calculator-view.css'

const categoryPaths = {
  Investing: '/investing', Loans: '/loans', Salary: '/salary', Retirement: '/retirement', Budgeting: '/budgeting',
  'Financial Planning': '/financial-planning', Savings: '/financial-planning', 'Savings & Investing': '/investing',
  'Salary & Employment': '/salary', 'Investing & Markets': '/investing', 'Loans & Debt': '/loans', Tax: '/financial-planning',
  Education: '/financial-planning', 'Major Financial Decisions': '/financial-planning', Other: '/financial-planning',
}

function buildDefaultValues(fields) {
  const values = {}
  fields.forEach((field) => { values[field.name] = field.defaultValue })
  return values
}

function getRelatedCalculators(currentConfig) {
  const categoryMatches = getCalculatorsByCategory(currentConfig.category)
  const sameCountry = calculators.filter((item) => {
    if (item.config.id === currentConfig.id) return false
    const currentCountries = Array.isArray(currentConfig.countries) ? currentConfig.countries : []
    if (currentCountries.length === 0) return true
    return (item.config.countries || []).some((code) => currentCountries.includes(code))
  })
  const fallback = calculators.filter((item) => item.config.id !== currentConfig.id)
  return [...categoryMatches, ...sameCountry, ...fallback]
    .filter((item, index, items) => items.findIndex((candidate) => candidate.config.id === item.config.id) === index)
    .slice(0, 6)
}

export default function CalculatorView({ calculator, onBack, country, numberSystem }) {
  const { config, calculate, explanation } = calculator
  const [values, setValues] = useState(() => buildDefaultValues(config.fields))
  const [results, setResults] = useState({})
  const completionTrackedRef = useRef(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    completionTrackedRef.current = false
    trackEvent('calculator_open', { calculatorId: config.id, category: config.category || 'Other' })

    const key = 'fincalc-recent-calculators'
    try {
      const previous = JSON.parse(window.localStorage.getItem(key) || '[]')
      const next = [config.id, ...previous.filter((id) => id !== config.id)].slice(0, 6)
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // Storage may be unavailable; calculator use should still work.
    }
  }, [config.id, config.category])

  useEffect(() => {
    let active = true
    setResults((previous) => ({ ...previous, loading: true }))
    Promise.resolve(calculate(values))
      .then((nextResults) => {
        if (!active) return
        setResults({ ...nextResults, loading: false })
        if (!completionTrackedRef.current && nextResults?.isValid !== false && nextResults?.isValid !== undefined) {
          completionTrackedRef.current = true
          trackEvent('calculator_complete', { calculatorId: config.id })
        }
      })
      .catch(() => {
        if (active) setResults({ isValid: false, loading: false, message: 'The calculation could not be completed. Please try again.' })
      })
    return () => { active = false }
  }, [values, calculate, config.id])

  const relatedCalculators = useMemo(() => getRelatedCalculators(config), [config])
  const displayCurrency = getCalculatorCurrency(config, country)

  function handleChange(name, rawValue) { setValues((prev) => ({ ...prev, [name]: rawValue })) }

  return (
    <section className="calc-view">
      <Breadcrumbs items={[{ label: 'FinCalc', href: '/' }, { label: config.category, href: categoryPaths[config.category] || '/financial-planning' }, { label: config.title }]} />
      <button className="calc-view__back" onClick={onBack} type="button">← Back to calculators</button>
      <div className="calc-view__header">
        <span className="calc-view__eyebrow">FINANCIAL CALCULATOR</span>
        <h1 className="calc-view__title">{config.title}</h1>
        <p className="calc-view__description">{config.shortDescription}</p>
      </div>
      <div className="calc-view__grid">
        <div className="calc-view__panel calc-view__panel--results">
          <div className="calc-view__panel-heading calc-view__panel-heading--light"><div><span className="calc-view__panel-kicker">ESTIMATED OUTCOME</span><h2>See what the numbers mean</h2></div></div>
          <ResultPanel resultFields={config.resultFields} results={results} defaultCurrency={displayCurrency} numberSystem={numberSystem} />
        </div>
        <div className="calc-view__panel calc-view__panel--inputs">
          <div className="calc-view__panel-heading"><div><span className="calc-view__panel-kicker">YOUR INPUTS</span><h2>Set your assumptions</h2></div><span className="calc-view__panel-hint">Updates instantly</span></div>
          <CalculatorForm fields={config.fields} values={values} onChange={handleChange} />
        </div>
      </div>
      <section className="calc-view__content" aria-labelledby="how-it-works">
        <span className="calc-view__eyebrow">PLAIN-ENGLISH GUIDE</span>
        <h2 id="how-it-works">How the {config.title.toLowerCase()} works</h2>
        {explanation.body.split('\n').filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <CalculatorSEOSections calculatorId={config.id} config={config} />
      <CalculatorTrust config={config} explanation={explanation} />
      <section className="calc-view__content calc-view__content--compact" aria-labelledby="calculator-overview">
        <span className="calc-view__eyebrow">QUICK OVERVIEW</span>
        <h2 id="calculator-overview">What you enter and what you get</h2>
        <div className="calc-view__overview-grid"><div><h3>What you enter</h3><ul>{config.fields.map((field) => <li key={field.name}>{field.label}</li>)}</ul></div><div><h3>What you get</h3><ul>{config.resultFields.map((field) => <li key={field.name}>{field.label}</li>)}</ul></div></div>
        <p className="calc-view__disclaimer"><strong>Important:</strong> {explanation.disclaimer}</p>
      </section>
      {relatedCalculators.length > 0 && (
        <nav className="calc-view__related" aria-labelledby="related-calculators">
          <div><span className="calc-view__eyebrow">KEEP EXPLORING</span><h2 id="related-calculators">Related financial calculators</h2></div>
          <div className="calc-view__related-grid">{relatedCalculators.map(({ config: related }) => <a key={related.id} href={`/calculators/${encodeURIComponent(related.id)}`} className="calc-view__related-link"><span>{related.title}</span><small>{related.shortDescription}</small></a>)}</div>
        </nav>
      )}
    </section>
  )
}
