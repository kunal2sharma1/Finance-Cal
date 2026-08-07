function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0)
}

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits,
  }).format(value || 0)
}

function formatResultValue(value, field) {
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
  const primary = resultFields.find((field) => field.primary)
  const secondary = resultFields.filter((field) => !field.primary)

  // If a calculator exposes totalInvested + totalReturns, we can draw a
  // simple proportional bar. Calculators that don't just skip this part.
  const invested = results.totalInvested
  const returns = results.totalReturns
  const hasBreakdown =
    invested !== undefined && returns !== undefined && invested + returns > 0
  const investedPct = hasBreakdown ? (invested / (invested + returns)) * 100 : 0

  return (
    <div className="result-panel">
      {primary && (
        <div className="result-panel__primary">
          <span className="result-panel__primary-label">{primary.label}</span>
          <span className="result-panel__primary-value">
            {formatResultValue(results[primary.name], primary)}
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
            <dd>{formatResultValue(results[field.name], field)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
