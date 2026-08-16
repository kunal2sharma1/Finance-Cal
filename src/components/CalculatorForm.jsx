// This form doesn't know anything about individual calculators — it just reads
// whatever fields a calculator's config.js provides. Each field can choose
// the appropriate control type.

export default function CalculatorForm({ fields, values, onChange }) {
  return (
    <div className="calc-form">
      {fields.map((field) => {
        const isTextarea = field.type === 'textarea'
        const hasSlider = !isTextarea && Number.isFinite(Number(field.min)) && Number.isFinite(Number(field.max))
        const numericValue = Number(values[field.name])
        const percent =
          hasSlider && Number.isFinite(numericValue)
            ? Math.min(100, Math.max(0, ((numericValue - field.min) / (field.max - field.min)) * 100))
            : 0

        return (
          <div className="calc-form__row" key={field.name}>
            <label htmlFor={field.name} className="calc-form__label">
              {field.label}
              {field.unit ? <span className="calc-form__unit">{field.unit}</span> : null}
            </label>

            {isTextarea ? (
              <textarea
                id={field.name}
                name={field.name}
                className="calc-form__textarea"
                value={values[field.name] ?? ''}
                rows={field.rows || 6}
                placeholder={field.placeholder}
                onChange={(event) => onChange(field.name, event.target.value)}
              />
            ) : (
              <>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  className="calc-form__input"
                  value={values[field.name] ?? ''}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  onChange={(event) => onChange(field.name, event.target.value)}
                />

                {hasSlider ? (
                  <input
                    type="range"
                    aria-label={`${field.label} slider`}
                    className="calc-form__slider"
                    style={{ '--fill': `${percent}%` }}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={numericValue}
                    onChange={(event) => onChange(field.name, event.target.value)}
                  />
                ) : null}
              </>
            )}

            {field.help ? <small className="calc-form__help">{field.help}</small> : null}
          </div>
        )
      })}
    </div>
  )
}
