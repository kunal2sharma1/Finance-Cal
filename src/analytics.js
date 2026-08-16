const STORAGE_KEY = 'fincalc-analytics-v1'
const SESSION_KEY = 'fincalc-analytics-session'
const ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT || ''

function getSessionId() {
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const next = typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    window.sessionStorage.setItem(SESSION_KEY, next)
    return next
  } catch {
    return 'session-unavailable'
  }
}

function readLocalStats() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeLocalStats(stats) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // Analytics must never interfere with calculator use.
  }
}

function sendRemoteEvent(event) {
  if (!ENDPOINT || typeof navigator === 'undefined') return
  try {
    const payload = JSON.stringify(event)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }))
      return
    }
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Network analytics are strictly best-effort.
  }
}

export function trackEvent(name, properties = {}) {
  if (typeof window === 'undefined') return

  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(([, value]) => {
      return ['string', 'number', 'boolean'].includes(typeof value)
    }),
  )

  const event = {
    name,
    properties: safeProperties,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    path: window.location.pathname,
  }

  // Keep a small local aggregate so the product can be inspected without
  // transmitting financial inputs, IP addresses or personal identifiers.
  const stats = readLocalStats()
  stats.events = Number(stats.events || 0) + 1
  stats.byName = stats.byName || {}
  stats.byName[name] = Number(stats.byName[name] || 0) + 1

  if (name === 'calculator_open' && safeProperties.calculatorId) {
    stats.calculators = stats.calculators || {}
    const id = safeProperties.calculatorId
    stats.calculators[id] = stats.calculators[id] || { opens: 0, completions: 0 }
    stats.calculators[id].opens += 1
  }

  if (name === 'calculator_complete' && safeProperties.calculatorId) {
    stats.calculators = stats.calculators || {}
    const id = safeProperties.calculatorId
    stats.calculators[id] = stats.calculators[id] || { opens: 0, completions: 0 }
    stats.calculators[id].completions += 1
  }

  if (name === 'country_change' && safeProperties.countryCode) {
    stats.countries = stats.countries || {}
    const code = safeProperties.countryCode
    stats.countries[code] = Number(stats.countries[code] || 0) + 1
  }

  writeLocalStats(stats)
  window.dispatchEvent(new CustomEvent('fincalc-analytics', { detail: event }))
  sendRemoteEvent(event)
}

export function getLocalAnalytics() {
  return readLocalStats()
}

export function clearLocalAnalytics() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage failures.
  }
}
