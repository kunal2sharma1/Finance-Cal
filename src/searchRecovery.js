const normalize = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ')

const SYNONYMS = Object.freeze({
  mortgage: ['mortgage', 'home loan', 'housing loan', 'loan'],
  'home loan': ['home loan', 'mortgage', 'housing loan', 'loan'],
  'housing loan': ['housing loan', 'home loan', 'mortgage', 'loan'],
  'car loan': ['car loan', 'auto loan', 'vehicle loan', 'loan'],
  'auto loan': ['auto loan', 'car loan', 'vehicle loan', 'loan'],
  emi: ['emi', 'loan payment', 'equated monthly installment', 'loan'],
  savings: ['savings', 'saving'],
  pension: ['pension', 'retirement', 'nps'],
  retirement: ['retirement', 'pension', 'nps'],
  sip: ['sip', 'systematic investment plan', 'mutual fund'],
  'mutual fund': ['mutual fund', 'sip', 'investment'],
  ctc: ['ctc', 'cost to company', 'salary'],
  'cost to company': ['cost to company', 'ctc', 'salary'],
  fd: ['fd', 'fixed deposit'],
  'fixed deposit': ['fixed deposit', 'fd'],
  rd: ['rd', 'recurring deposit'],
  'recurring deposit': ['recurring deposit', 'rd'],
})

function levenshtein(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)
  let current = new Array(b.length + 1)

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      )
    }
    ;[previous, current] = [current, previous]
  }

  return previous[b.length]
}

export function buildSearchVocabulary(entries) {
  const vocabulary = new Set()
  for (const entry of entries) {
    for (const token of String(entry.searchText || '').split(/[^a-z0-9]+/)) {
      if (token.length >= 4) vocabulary.add(token)
    }
  }
  return Object.freeze([...vocabulary])
}

export function recoverToken(token, vocabulary) {
  const value = normalize(token)
  if (!value || value.length < 4 || vocabulary.includes(value)) return value

  const maxDistance = value.length >= 8 ? 2 : 1
  let best = null
  let bestDistance = Infinity

  for (const candidate of vocabulary) {
    if (Math.abs(candidate.length - value.length) > maxDistance) continue
    const distance = levenshtein(value, candidate)
    if (distance < bestDistance) {
      best = candidate
      bestDistance = distance
      if (distance === 1) break
    }
  }

  return best && bestDistance <= maxDistance ? best : value
}

export function recoverQuery(query, vocabulary) {
  const text = normalize(query)
  if (!text) return { query: '', corrected: false, corrections: [] }

  const corrections = []
  const tokens = text.split(' ')
  const recovered = tokens.map((token) => {
    const value = recoverToken(token, vocabulary)
    if (value !== token) corrections.push({ from: token, to: value })
    return value
  }).join(' ')

  return {
    query: recovered,
    corrected: corrections.length > 0,
    corrections,
  }
}

function expandSynonymPhrase(query) {
  const variants = new Set([normalize(query)])
  const normalized = normalize(query)

  for (const [source, replacements] of Object.entries(SYNONYMS)) {
    if (!normalized.includes(source)) continue
    for (const replacement of replacements) {
      variants.add(normalized.replace(source, replacement))
    }
  }

  return [...variants].filter(Boolean)
}

export function getSearchTerms(query, vocabulary) {
  const normalized = normalize(query)
  if (!normalized) return []

  const recovered = recoverQuery(normalized, vocabulary)
  const variants = new Set([
    ...expandSynonymPhrase(normalized),
    ...expandSynonymPhrase(recovered.query),
  ])

  return [...variants].slice(0, 16)
}
