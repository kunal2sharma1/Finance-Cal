import './cashflow-editor.css'

function updateCashFlowRows(rows, index, key, value) {
  return rows.map((row, rowIndex) =>
    rowIndex === index ? { ...row, [key]: value } : row,
  )
}

function CashFlowEditor({ field, value, onChange }) {
  const rows = Array.isArray(value) && value.length > 0
    ? value
    : [{ date: '', direction: 'invested', amount: '' }]

  function setRow(index, key, nextValue) {
    onChange(field.name, updateCashFlowRows(rows, index, key, nextValue))
  }

  function addRow() {
    onChange(field.name, [...rows, { date: '', direction: 'invested', amount: '' }])
  }

  function removeRow(index) {
    const nextRows = rows.filter((_, rowIndex) => rowIndex !== index)
    onChange(field.name, nextRows.length > 0 ? nextRows : [{ date: '', direction: 'invested', amount: '' }])
  }

  return (
    <div className="calc-form__cashflows">
      <div className="calc-form__cashflow-head">
        <span>Date</span>
        <span>What happened?</span>
        <span>Amount</span>
        <span aria-hidden="true" />
      </div>

      {rows.map((row, index) => (
        <div className="calc-form__cashflow-row" key={`${index}-${row.date}`}>
          <input
            type="date"
            className="calc-form__input calc-form__cashflow-date"
            value={row.date || ''}
            aria-label={`Cash flow ${index + 1} date`}
            onChange={(event) => setRow(index, 'date', event.target.value)}
          />

          <select
            className="calc-form__input calc-form__cashflow-direction"
            value={row.direction || 'invested'}
            aria-label={`Cash flow ${index + 1} type`}
            onChange={(event) => setRow(index, 'direction', event.target.value)}
          >
            <option value="invested">I invested money</option>
            <option value="received">I received money</option>
          </select>

          <div className="calc-form__cashflow-amount-wrap">
            <span className="calc-form__cashflow-sign">₹</span>
            <input
              type="number"
              className="calc-form__input calc-form__cashflow-amount"
              value={row.amount ?? ''}
              aria-label={`Cash flow ${index + 1} amount`}
              placeholder="e.g. 100000"
              min="0"
              step="1"
              onChange={(event) => setRow(index, 'amount', event.target.value)}
            />
          </div>

          <button
            type="button"
            className="calc-form__cashflow-remove"
            onClick={() => removeRow(index)}
            disabled={rows.length === 1}
            aria-label={`Remove cash flow ${index + 1}`}
          >
            ×
          </button>
        </div>
      ))}

      <button type="button" className="calc-form__cashflow-add" onClick={addRow}>
        + Add another cash flow
      </button>

      {field.help ? <small className="calc-form__help">{field.help}</small> : null}
    </div>
  )
}

export default function CalculatorForm({ fields, values, onChange }) {
  return (
    <div className="calc-form">
      {fields.map((field) => {
        const isTextarea = field.type === 'textarea'
        const isCashFlows = field.type === 'cashflows'
        const isSelect = field.type === 'select'
        const hasSlider = !isTextarea && !isCashFlows && !isSelect && Number.isFinite(Number(field.min)) && Number.isFinite(Number(field.max))
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

            {isCashFlows ? (
              <CashFlowEditor field={field} value={values[field.name]} onChange={onChange} />
            ) : isTextarea ? (
              <textarea
                id={field.name}
                name={field.name}
                className="calc-form__textarea"
                value={values[field.name] ?? ''}
                rows={field.rows || 6}
                placeholder={field.placeholder}
                onChange={(event) => onChange(field.name, event.target.value)}
              />
            ) : isSelect ? (
              <select
                id={field.name}
                name={field.name}
                className="calc-form__input calc-form__select"
                value={values[field.name] ?? field.defaultValue ?? ''}
                onChange={(event) => onChange(field.name, event.target.value)}
              >
                {(field.options || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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

            {!isCashFlows && field.help ? <small className="calc-form__help">{field.help}</small> : null}
          </div>
        )
      })}
    </div>
  )
}
