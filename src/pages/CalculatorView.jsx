import { useEffect, useMemo, useRef, useState } from 'react'
import CalculatorForm from '../components/CalculatorForm.jsx'
import ResultPanel from '../components/ResultPanel.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import CalculatorSEOSections from '../components/CalculatorSEOSections.jsx'
import CalculatorTrust from '../components/CalculatorTrust.jsx'
import CommercialDisclosure from '../components/CommercialDisclosure.jsx'
import CommercialPlacement from '../components/CommercialPlacement.jsx'
import { calculators } from '../calculatorCatalog.js'
import { guides } from '../guides.js'
import { getCalculatorCurrency } from '../calculatorLocale.js'
import { validateInputValues } from '../inputValidation.js'
import { setBreadcrumbSchema } from '../seo.js'
import { trackEvent } from '../analytics.js'
import './calculator-view.css'
import './calculator-toolbar.css'

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

function scoreRelatedCalculator(current, candidate) {
  if (current.config.id === candidate.config.id) return -Infinity
  const currentMeta = current.meta || {}
  const candidateMeta = candidate.meta || {}
  let score = 0

  if (currentMeta.primaryJourney && currentMeta.primaryJourney === candidateMeta.primaryJourney) score += 70
  if (currentMeta.domain && currentMeta.domain === candidateMeta.domain) score += 30
  if (currentMeta.intent && currentMeta.intent === candidateMeta.intent) score += 20
  if (currentMeta.modelType && currentMeta.modelType === candidateMeta.modelType) score += 5
  if (current.config.category && current.config.category === candidate.config.category) score += 10

  const currentCountries = Array.isArray(current.config.countries) ? current.config.countries : []
  const candidateCountries = Array.isArray(candidate.config.countries) ? candidate.config.countries : []
  if (currentCountries.length === 0 || candidateCountries.length === 0) score += 4
  else if (candidateCountries.some((code) => currentCountries.includes(code))) score += 20

  const currentText = `${current.config.title} ${current.config.shortDescription}`.toLowerCase()
  const candidateText = `${candidate.config.title} ${candidate.config.shortDescription}`.toLowerCase()
  const importantTerms = ['sip', 'retirement', 'loan', 'emi', 'debt', 'salary', 'tax', 'investment', 'return', 'savings', 'mortgage', 'education']
  importantTerms.forEach((term) => {
    if (currentText.includes(term) && candidateText.includes(term)) score += 4
  })

  return score
}

function getRelatedCalculators(currentCalculator) {
  return calculators
    .map((candidate) => ({ candidate, score: scoreRelatedCalculator(currentCalculator, candidate) }))
    .filter(({ score }) => Number.isFinite(score) && score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.config.title.localeCompare(b.candidate.config.title))
    .slice(0, 6)
    .map(({ candidate }) => candidate)
}

function getSupportingGuides(calculatorId) {
  return guides
    .filter((guide) => guide.calculatorLinks.some(([, href]) => href === `/calculators/${calculatorId}`))
    .slice(0, 4)
}

export default function CalculatorView({ calculator, onBack, country, numberSystem }) {
  const { config, calculate, explanation, meta = {} } = calculator
  const [values, setValues] = useState(() => buildDefaultValues(config.fields))
  const [results, setResults] = useState({})
  const [touched, setTouched] = useState({})
  const completionTrackedRef = useRef(false)
  const inputErrors = useMemo(() => validateInputValues(config.fields, values), [config.fields, values])
  const hasInputErrors = Object.keys(inputErrors).length > 0

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    completionTrackedRef.current = false
    setTouched({})
    trackEvent('calculator_open', { calculatorId: config.id, category: config.category || 'Other' })

    setBreadcrumbSchema([
      { label: 'FinCalc', href: '/' },
      { label: config.category, href: categoryPaths[config.category] || '/financial-planning' },
      { label: config.title },
    ])

    const key = 'fincalc-recent-calculators'
    try {
      const previous = JSON.parse(window.localStorage.getItem(key) || '[]')
      const next = [config.id, ...previous.filter((id) => id !== config.id)].slice(0, 6)
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // Storage may be unavailable; calculator use should still work.
    }
  }, [config.id, config.category, config.title])

  useEffect(() => {
    let active = true

    if (hasInputErrors) {
      setResults({
        isValid: false,
        loading: false,
        message: 'Fix the highlighted inputs to see an updated result.',
      })
      return () => { active = false }
    }

    setResults((previous) => ({ ...previous, loading: true }))
    Promise.resolve()
      .then(() => calculate(values))
      .then((nextResults) => {
        if (!active) return
        setResults({ ...nextResults, loading: false })
        if (!completionTrackedRef.current && nextResults?.isValid !== false && nextResults?.isValid !== undefined) {
          completionTrackedRef.current = true
          trackEvent('calculator_complete', { calculatorId: config.id })
        }
      })
      .catch((error) => {
        console.error(`Calculator ${config.id} failed:`, error)
        if (active) setResults({ isValid: false, loading: false, message: 'The calculation could not be completed. Please check your inputs and try again.' })
      })
    return () => { active = false }
  }, [values, calculate, config.id, hasInputErrors])

  const relatedCalculators = useMemo(() => getRelatedCalculators(calculator), [calculator])
  const supportingGuides = useMemo(() => getSupportingGuides(config.id), [config.id])
  const displayCurrency = getCalculatorCurrency(config, country)

  function handleChange(name, rawValue) {
    setValues((prev) => ({ ...prev, [name]: rawValue }))
  }

  function handleBlur(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  return (
    <section className="calc-view">
      <div className="calc-view__topbar">
        <Breadcrumbs items={[{ label: 'FinCalc', href: '/' }, { label: config.category, href: categoryPaths[config.category] || '/financial-planning' }]} />
        <button className="calc-view__back" onClick={onBack} type="button">← Back to calculators</button>
      </div>
      <div className="calc-view__header">
        <span className="calc-view__eyebrow">FINANCIAL CALCULATOR</span>
        <h1 className="calc-view__title">{config.title}</h1>
        <p className="calc-view__description">{config.shortDescription}</p>
      </div>
      <div className="calc-view__grid">
        <div className="calc-view__panel calc-view__panel--results">
          <div className="calc-view__panel-heading calc-view__panel-heading--light"><div><span className="calc-view__panel-kicker">ESTIMATED OUTCOME</span><h2>See what the numbers mean</h2></div></div>
          <ResultPanel
            resultFields={config.resultFields}
            results={results}
            defaultCurrency={displayCurrency}
            numberSystem={numberSystem}
            resultCertainty={meta.resultCertainty}
            resultCertaintyNote={meta.resultCertaintyNote}
          />
        </div>
        <div className="calc-view__panel calc-view__panel--inputs">
          <div className="calc-view__panel-heading"><div><span className="calc-view__panel-kicker">YOUR INPUTS</span><h2>Set your assumptions</h2></div><span className="calc-view__panel-hint">Updates instantly</span></div>
          <CalculatorForm calculatorId={config.id} fields={config.fields} values={values} errors={inputErrors} touched={touched} onChange={handleChange} onBlur={handleBlur} />
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
      {supportingGuides.length > 0 && (
        <nav className="calc-view__related" aria-labelledby="supporting-guides">
          <div><span className="calc-view__eyebrow">LEARN MORE</span><h2 id="supporting-guides">Guides related to this calculator</h2></div>
          <div className="calc-view__related-grid">{supportingGuides.map((guide) => <a key={guide.slug} href={`/guides/${guide.slug}`} className="calc-view__related-link"><span>{guide.title}</span><small>{guide.metaDescription}</small></a>)}</div>
        </nav>
      )}
      <CommercialDisclosure />
      <CommercialPlacement placement="calculatorEnd" label="Optional partner placement" />
      {relatedCalculators.length > 0 && (
        <nav className="calc-view__related" aria-labelledby="related-calculators">
          <div><span className="calc-view__eyebrow">KEEP EXPLORING</span><h2 id="related-calculators">Related financial calculators</h2></div>
          <div className="calc-view__related-grid">{relatedCalculators.map(({ config: related }) => <a key={related.id} href={`/calculators/${encodeURIComponent(related.id)}`} className="calc-view__related-link"><span>{related.title}</span><small>{related.shortDescription}</small></a>)}</div>
        </nav>
      )}
    </section>
  )
}
