import { INVALID_RESULT_VALUE, isValidResultValue, normalizeCalculatorResult } from '../calculatorValidation.js'

function formatCurrency(value) {
  if (!isValidResultValue(value)) return INVALID_RESULT_VALUE
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value, maximumFractionDigits = 0) {
  if (!isValidResultValue(value)) return INVALID_RESULT_VALUE
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits,
  }).format(value)
}

function formatResultValue(value, field) {
  if (!isValidResultValue(value)) return INVALID_RESULT_VALUE

  if (field.unit === '%') {
    const formatted = formatNumber(value, 2)
    return field.label.includes('%') ? formatted : `${formatted}%`
  }

  if (field.unit && field.unit !== '₹') {
    return `${formatNumber(value)} ${field.unit}`
  }

  return formatCurrency(value)
}

export default function ResultPanel({ resultFields, results }) {
  const normalized = normalizeCalculatorResult(results)
  const data = normalized.data
  const primary = resultFields.find((field) => field.primary)
  const secondary = resultFields.filter((field) => !field.primary)

  const invested = data.totalInvested
  const returns = data.totalReturns
  const hasBreakdown =
    isValidResultValue(invested) &&
    isValidResultValue(returns) &&
    Number.isFinite(Number(invested)) &&
    Number.isFinite(Number(returns)) &&
    Number(invested) + Number(returns) > 0
  const investedPct = hasBreakdown
    ? Math.min(100, Math.max(0, (Number(invested) / (Number(invested) + Number(returns))) * 100))
    : 0

  return (
    <div className="result-panel">
      {!normalized.isValid && normalized.message ? (
        <div className="result-panel__error" role="alert">
          {normalized.message}
        </div>
      ) : null}

      {primary && (
        <div className="result-panel__primary">
          <span className="result-panel__primary-label">{primary.label}</span>
          <span className="result-panel__primary-value">
            {formatResultValue(data[primary.name], primary)}
          </span>
        </div>
      )}

      {hasBreakdown && (
        <div className="result-panel__bar" aria-hidden="true">
          <div
            className="result-panel__bar-segment result-panel__bar-segment--invested"
            style={{ width: `${investedPct}%` }}
          />
          <div
            className="result-panel__bar-segment result-panel__bar-segment--returns"
            style={{ width: `${100 - investedPct}%` }}
          />
        </div>
      )}

      <dl className="result-panel__list">
        {secondary.map((field) => (
          <div className="result-panel__row" key={field.name}>
            <dt>{field.label}</dt>
            <dd>{formatResultValue(data[field.name], field)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
