import { useMemo, useState } from 'react'
import CalculatorForm from '../components/CalculatorForm.jsx'
import ResultPanel from '../components/ResultPanel.jsx'

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

  // Recalculates automatically whenever any input changes — this is what
  // makes results feel "instant" with no submit button.
  const results = useMemo(() => calculate(values), [values, calculate])

  function handleChange(name, rawValue) {
    setValues((prev) => ({ ...prev, [name]: rawValue }))
  }

  return (
    <section className="calc-view">
      <button className="calc-view__back" onClick={onBack}>
        ← All calculators
      </button>

      <h1 className="calc-view__title">{config.title}</h1>

      <div className="calc-view__grid">
        <CalculatorForm
          fields={config.fields}
          values={values}
          onChange={handleChange}
        />
        <ResultPanel resultFields={config.resultFields} results={results} />
      </div>

      <details className="calc-view__explanation">
        <summary>{explanation.heading}</summary>
        <p>{explanation.body}</p>
        <p className="calc-view__disclaimer">{explanation.disclaimer}</p>
      </details>
    </section>
  )
}
