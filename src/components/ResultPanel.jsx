function isValidNumeric(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function getNumberLocale(numberSystem = 'indian') {
  return numberSystem === 'international' ? 'en-US' : 'en-IN'
}

function formatCurrency(value, currency = 'INR', numberSystem = 'indian') {
  if (!isValidNumeric(value)) return '—'
  try {
    return new Intl.NumberFormat(getNumberLocale(numberSystem), {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(value)
  } catch {
    return `${formatNumber(value, 2, numberSystem)} ${currency}`
  }
}

function formatNumber(value, maximumFractionDigits = 0, numberSystem = 'indian') {
  if (!isValidNumeric(value)) return '—'
  return new Intl.NumberFormat(getNumberLocale(numberSystem), {
    maximumFractionDigits,
  }).format(value)
}

function formatResultValue(value, field, results, defaultCurrency, numberSystem) {
  if (field.type === 'date') return value || '—'
  if (!isValidNumeric(value)) return '—'

  if (field.type === 'dynamicCurrency') {
    return formatCurrency(value, results.targetCurrency || defaultCurrency || 'INR', numberSystem)
  }

  if (field.unit === '%') {
    const formatted = formatNumber(value, 2, numberSystem)
    return field.label.includes('%') ? formatted : `${formatted}%`
  }

  if (field.unit === 'rate') {
    return formatNumber(value, 6, numberSystem)
  }

  if (field.unit && field.unit !== '₹') {
    return `${formatNumber(value, 0, numberSystem)} ${field.unit}`
  }

  return formatCurrency(value, defaultCurrency || 'INR', numberSystem)
}

function buildInterpretation(primary, results) {
  if (typeof results.interpretation === 'string' && results.interpretation.trim()) return results.interpretation
  if (typeof results.keyInsight === 'string' && results.keyInsight.trim()) return results.keyInsight
  if (!primary) return 'This result is an estimate based on the assumptions you entered. Test another scenario before making an important financial decision.'
  return `This is an estimated ${primary.label.toLowerCase()} based on the assumptions you entered. Change the inputs to compare scenarios.`
}

export default function ResultPanel({ resultFields, results = {}, defaultCurrency = 'INR', numberSystem = 'indian' }) {
  const safeResultFields = Array.isArray(resultFields) ? resultFields.filter(Boolean) : []
  const primary = safeResultFields.find((field) => field.primary)
  const secondary = safeResultFields.filter((field) => !field.primary)
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

      {primary && !isInvalid && !results.loading && (
        <div className="result-panel__primary">
          <span className="result-panel__primary-label">{primary.label}</span>
          <span className="result-panel__primary-value">
            {formatResultValue(results[primary.name], primary, results, defaultCurrency, numberSystem)}
          </span>
        </div>
      )}

      {!isInvalid && !results.loading && (
        <div className="result-panel__message" role="status">
          {buildInterpretation(primary, results)}
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
            <dd>{formatResultValue(results[field.name], field, results, defaultCurrency, numberSystem)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
