import { useEffect, useState } from 'react'
import { getInputGroups } from '../calculatorInputGroups.js'
import { resolveInputMode } from '../inputControlPolicy.js'
import { getInputError } from '../inputValidation.js'
import './cashflow-editor.css'
import './calculator-form-groups.css'

const CURRENCY_API = 'https://api.frankfurter.dev/v2/currencies'
const FALLBACK_CURRENCIES = [
  { value: 'INR', label: 'Indian Rupee (INR)' },
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'AED', label: 'UAE Dirham (AED)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'SGD', label: 'Singapore Dollar (SGD)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)' },
]

const PRIORITY_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'CAD', 'AUD', 'SGD', 'JPY', 'CNY']
let currencyPromise

function loadCurrencies() {
  if (!currencyPromise) {
    currencyPromise = fetch(CURRENCY_API)
      .then((response) => {
        if (!response.ok) throw new Error(`Currency list request failed: ${response.status}`)
        return response.json()
      })
      .then((data) => {
        const currencies = Object.values(data || {})
          .map((currency) => ({
            value: currency.iso_code,
            label: `${currency.name} (${currency.iso_code})${currency.symbol ? ` — ${currency.symbol}` : ''}`,
          }))
          .filter((currency) => /^[A-Z]{3}$/.test(currency.value))

        const byCode = new Map(currencies.map((currency) => [currency.value, currency]))
        const priority = PRIORITY_CURRENCIES.filter((code) => byCode.has(code)).map((code) => byCode.get(code))
        const rest = currencies
          .filter((currency) => !PRIORITY_CURRENCIES.includes(currency.value))
          .sort((a, b) => a.label.localeCompare(b.label))

        return [...priority, ...rest]
      })
      .catch(() => FALLBACK_CURRENCIES)
  }
  return currencyPromise
}

function updateCashFlowRows(rows, index, key, value) {
  return rows.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row)
}

function FieldError({ id, message }) {
  if (!message) return null
  return <div id={id} className="calc-form__error" role="alert">{message}</div>
}

function CashFlowEditor({ field, value, onChange, onBlur, errorId, error }) {
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
          <input type="date" className="calc-form__input calc-form__cashflow-date" value={row.date || ''} aria-label={`Cash flow ${index + 1} date`} onChange={(event) => setRow(index, 'date', event.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
          <select className="calc-form__input calc-form__cashflow-direction" value={row.direction || 'invested'} aria-label={`Cash flow ${index + 1} type`} onChange={(event) => setRow(index, 'direction', event.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}>
            <option value="invested">I invested money</option>
            <option value="received">I received money</option>
          </select>
          <div className="calc-form__cashflow-amount-wrap">
            <span className="calc-form__cashflow-sign">₹</span>
            <input type="number" inputMode="decimal" className="calc-form__input calc-form__cashflow-amount" value={row.amount ?? ''} aria-label={`Cash flow ${index + 1} amount`} placeholder="e.g. 100000" min="0" step="1" onChange={(event) => setRow(index, 'amount', event.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
          </div>
          <button type="button" className="calc-form__cashflow-remove" onClick={() => removeRow(index)} disabled={rows.length === 1} aria-label={`Remove cash flow ${index + 1}`}>×</button>
        </div>
      ))}
      <button type="button" className="calc-form__cashflow-add" onClick={addRow}>+ Add another cash flow</button>
      {field.help ? <small className="calc-form__help">{field.help}</small> : null}
      <FieldError id={errorId} message={error} />
    </div>
  )
}

function CurrencySelect({ field, value, onChange, onBlur, errorId, error }) {
  const [currencies, setCurrencies] = useState(FALLBACK_CURRENCIES)

  useEffect(() => {
    let active = true
    loadCurrencies().then((nextCurrencies) => {
      if (active) setCurrencies(nextCurrencies)
    })
    return () => { active = false }
  }, [])

  return (
    <>
      <select id={field.name} name={field.name} className="calc-form__input calc-form__select" value={value ?? field.defaultValue ?? ''} onChange={(event) => onChange(field.name, event.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}>
        {currencies.map((currency) => <option key={currency.value} value={currency.value}>{currency.label}</option>)}
      </select>
      <FieldError id={errorId} message={error} />
    </>
  )
}

function CalculatorField({ field, values, onChange, onBlur, error }) {
  const isTextarea = field.type === 'textarea'
  const isCashFlows = field.type === 'cashflows'
  const isSelect = field.type === 'select'
  const isCurrencySelect = field.type === 'currency-select'
  const inputMode = resolveInputMode(field)
  const canUseSlider = field.type === 'number' && Number.isFinite(Number(field.min)) && Number.isFinite(Number(field.max))
  const hasSlider = canUseSlider && inputMode === 'slider'
  const numericValue = Number(values[field.name])
  const rangeValue = Number.isFinite(numericValue) ? numericValue : Number(field.defaultValue) || Number(field.min) || 0
  const percent = canUseSlider && field.max !== field.min
    ? Math.min(100, Math.max(0, ((rangeValue - field.min) / (field.max - field.min)) * 100))
    : 0
  const errorId = `${field.name}-input-error`
  const describedBy = error ? errorId : undefined

  const blur = () => onBlur(field.name)

  return (
    <div className={`calc-form__row${error ? ' calc-form__row--error' : ''}`}>
      <label htmlFor={field.name} className="calc-form__label">
        {field.label}
        {field.unit ? <span className="calc-form__unit">{field.unit}</span> : null}
      </label>
      {isCashFlows ? (
        <CashFlowEditor field={field} value={values[field.name]} onChange={onChange} onBlur={blur} errorId={errorId} error={error} />
      ) : isCurrencySelect ? (
        <CurrencySelect field={field} value={values[field.name]} onChange={onChange} onBlur={blur} errorId={errorId} error={error} />
      ) : isTextarea ? (
        <>
          <textarea id={field.name} name={field.name} className="calc-form__textarea" value={values[field.name] ?? ''} rows={field.rows || 6} placeholder={field.placeholder} onChange={(event) => onChange(field.name, event.target.value)} onBlur={blur} aria-invalid={Boolean(error)} aria-describedby={describedBy} />
          <FieldError id={errorId} message={error} />
        </>
      ) : isSelect ? (
        <>
          <select id={field.name} name={field.name} className="calc-form__input calc-form__select" value={values[field.name] ?? field.defaultValue ?? ''} onChange={(event) => onChange(field.name, event.target.value)} onBlur={blur} aria-invalid={Boolean(error)} aria-describedby={describedBy}>
            {(field.options || []).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <FieldError id={errorId} message={error} />
        </>
      ) : (
        <>
          <input id={field.name} name={field.name} type="number" inputMode="decimal" className="calc-form__input" value={values[field.name] ?? ''} min={field.min} max={field.max} step={field.step} onChange={(event) => onChange(field.name, event.target.value)} onBlur={blur} aria-invalid={Boolean(error)} aria-describedby={describedBy} />
          {hasSlider ? (
            <input type="range" aria-label={`${field.label} slider`} className="calc-form__slider" style={{ '--fill': `${percent}%` }} min={field.min} max={field.max} step={field.step} value={rangeValue} onChange={(event) => onChange(field.name, event.target.value)} onBlur={blur} aria-invalid={Boolean(error)} aria-describedby={describedBy} />
          ) : null}
          <FieldError id={errorId} message={error} />
        </>
      )}
      {!isCashFlows && !isTextarea && !isSelect && !isCurrencySelect && field.help ? <small className="calc-form__help">{field.help}</small> : null}
    </div>
  )
}

export default function CalculatorForm({ calculatorId, fields, values, errors = {}, touched = {}, onChange, onBlur }) {
  const groups = getInputGroups(fields)
  const showGroupHeadings = groups.length > 1

  return (
    <div className="calc-form">
      {groups.map((group) => {
        const groupId = `${calculatorId || 'calculator'}-input-group-${group.id}`
        return (
          <section className="calc-form__group" key={group.id} aria-labelledby={showGroupHeadings ? groupId : undefined}>
            {showGroupHeadings ? (
              <header className="calc-form__group-header">
                <h3 id={groupId} className="calc-form__group-title">{group.label}</h3>
                {group.description ? <p className="calc-form__group-description">{group.description}</p> : null}
              </header>
            ) : null}
            <div className="calc-form__group-fields">
              {group.fields.map((field) => {
                const error = touched[field.name] ? getInputError(field, values[field.name], true) || errors[field.name] || '' : ''
                return <CalculatorField key={field.name} field={field} values={values} onChange={onChange} onBlur={onBlur} error={error} />
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
