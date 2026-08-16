import { useMemo, useState } from 'react'
import CalculatorForm from '../components/CalculatorForm.jsx'
import ResultPanel from '../components/ResultPanel.jsx'
import './calculator-view.css'

function buildDefaultValues(fields) {
  const values = {}
  fields.forEach((field) => {
    values[field.name] = field.defaultValue
  })
  return values
}

export default function CalculatorView({ calculator, onBack }) {
  const { config, calculate, explanation } = calculator
  const [values, setValues] = useState(() => buildDefaultValues(config.fields))

  const results = useMemo(() => calculate(values), [values, calculate])

  function handleChange(name, rawValue) {
    setValues((prev) => ({ ...prev, [name]: rawValue }))
  }

  return (
    <section className="calc-view">
      <button className="calc-view__back" onClick={onBack} type="button">
        ← Back to calculators
      </button>

      <div className="calc-view__header">
        <span className="calc-view__eyebrow">FINANCIAL CALCULATOR</span>
        <h1 className="calc-view__title">{config.title}</h1>
        <p className="calc-view__description">{config.shortDescription}</p>
      </div>

      <div className="calc-view__grid">
        <div className="calc-view__panel calc-view__panel--results">
          <div className="calc-view__panel-heading calc-view__panel-heading--light">
            <div>
              <span className="calc-view__panel-kicker">ESTIMATED OUTCOME</span>
              <h2>See what the numbers mean</h2>
            </div>
          </div>

          <ResultPanel resultFields={config.resultFields} results={results} />
        </div>

        <div className="calc-view__panel calc-view__panel--inputs">
          <div className="calc-view__panel-heading">
            <div>
              <span className="calc-view__panel-kicker">YOUR INPUTS</span>
              <h2>Set your assumptions</h2>
            </div>
            <span className="calc-view__panel-hint">Updates instantly</span>
          </div>

          <CalculatorForm
            fields={config.fields}
            values={values}
            onChange={handleChange}
          />
        </div>
      </div>

      <details className="calc-view__explanation">
        <summary>{explanation.heading}</summary>
        <p>{explanation.body}</p>
        <p className="calc-view__disclaimer">{explanation.disclaimer}</p>
      </details>
    </section>
  )
}
