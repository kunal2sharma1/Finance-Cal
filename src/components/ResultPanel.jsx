function isValidNumeric(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function formatCurrency(value, currency = 'INR') {
  if (!isValidNumeric(value)) return '—'
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(value)
  } catch {
    return `${formatNumber(value, 2)} ${currency}`
  }
}

function formatNumber(value, maximumFractionDigits = 0) {
  if (!isValidNumeric(value)) return '—'
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits,
  }).format(value)
}

function formatResultValue(value, field, results) {
  if (field.type === 'date') return value || '—'
  if (!isValidNumeric(value)) return '—'

  if (field.type === 'dynamicCurrency') {
    return formatCurrency(value, results.targetCurrency || 'INR')
  }

  if (field.unit === '%') {
    const formatted = formatNumber(value, 2)
    return field.label.includes('%') ? formatted : `${formatted}%`
  }

  if (field.unit === 'rate') {
    return formatNumber(value, 6)
  }

  if (field.unit && field.unit !== '₹') {
    return `${formatNumber(value)} ${field.unit}`
  }

  return formatCurrency(value)
}

export default function ResultPanel({ resultFields, results = {} }) {
  const primary = resultFields.find((field) => field.primary)
  const secondary = resultFields.filter((field) => !field.primary)
  const isInvalid = results.isValid === false

  const invested = results.totalInvested
  const returns = results.totalReturns
  const hasBreakdown =
    isValidNumeric(invested) &&
    isValidNumeric(returns) &&
    invested + returns > 0
  const investedPct = hasBreakdown ? (invested / (invested + returns)) * 100 : 0

  return (
    <div className="result-panel">
      {isInvalid && results.message && (
        <div className="result-panel__message" role="alert">
          {results.message}
        </div>
      )}

      {results.loading && (
        <div className="result-panel__message" role="status">
          Fetching the latest available exchange rate…
        </div>
      )}

      {primary && (
        <div className="result-panel__primary">
          <span className="result-panel__primary-label">{primary.label}</span>
          <span className="result-panel__primary-value">
            {formatResultValue(results[primary.name], primary, results)}
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
            <dd>{formatResultValue(results[field.name], field, results)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
