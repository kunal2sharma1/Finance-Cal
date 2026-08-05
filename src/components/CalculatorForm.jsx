// This form doesn't know anything about SIPs specifically — it just reads
// whatever fields a calculator's config.js provides. That's what lets every
// calculator reuse the same component.

export default function CalculatorForm({ fields, values, onChange }) {
  return (
    <div className="calc-form">
      {fields.map((field) => (
        <div className="calc-form__row" key={field.name}>
          <label htmlFor={field.name} className="calc-form__label">
            {field.label}
            <span className="calc-form__unit">{field.unit}</span>
          </label>

          <input
            id={field.name}
            name={field.name}
            type="number"
            className="calc-form__input"
            value={values[field.name]}
            min={field.min}
            max={field.max}
            step={field.step}
            onChange={(event) => onChange(field.name, event.target.value)}
          />

          <input
            type="range"
            aria-label={`${field.label} slider`}
            className="calc-form__slider"
            min={field.min}
            max={field.max}
            step={field.step}
            value={values[field.name]}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
