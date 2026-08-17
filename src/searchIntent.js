const SIGNALS = [
  { pattern: /compare|vs\b|versus|comparison|better than/, intent: 'compare' },
  { pattern: /can i afford|afford|eligible|eligibility|qualify|can i/, intent: 'check' },
  { pattern: /plan|planning|goal|target|how much should|how much do i need|save for/, intent: 'plan' },
  { pattern: /future|projection|projected|growth|value later|corpus|return/, intent: 'project' },
  { pattern: /rate|ratio|percentage|cagr|xirr|irr|interest|yield/, intent: 'measure' },
  { pattern: /calculate|calculator|compute|how much|what is|emi|payment/, intent: 'calculate' },
]

const DOMAIN_SIGNALS = [
  { pattern: /invest|stock|sip|mutual fund|bond|portfolio|dividend/, domain: 'investing' },
  { pattern: /save|saving|fd|fixed deposit|rd|ppf/, domain: 'saving' },
  { pattern: /loan|mortgage|emi|borrow|home loan/, domain: 'borrowing' },
  { pattern: /debt|credit card|credit score|debt-to-income/, domain: 'debt' },
  { pattern: /salary|ctc|bonus|gratuity|job|income/, domain: 'salary' },
  { pattern: /retire|retirement|nps|epf|401\(k\)|pension/, domain: 'retirement' },
  { pattern: /tax|capital gain|capital gains/, domain: 'tax' },
  { pattern: /education|college|tuition|school/, domain: 'education' },
  { pattern: /insurance|life cover|health cover/, domain: 'insurance' },
  { pattern: /net worth|savings rate|financial health/, domain: 'financial-health' },
]

const JOURNEY_BY_DOMAIN = {
  investing: 'wealth-building',
  saving: 'saving',
  borrowing: 'home-and-borrowing',
  debt: 'debt-free',
  salary: 'career-finance',
  retirement: 'retirement',
  tax: 'tax-planning',
  education: 'education-planning',
  insurance: 'risk-protection',
  'financial-health': 'financial-health',
}

export function inferSearchIntent(query) {
  const text = String(query || '').trim().toLowerCase()
  if (!text) return { intent: 'calculate', domain: null, journey: null }

  const intentMatch = SIGNALS.find(({ pattern }) => pattern.test(text))
  const domainMatch = DOMAIN_SIGNALS.find(({ pattern }) => pattern.test(text))
  const domain = domainMatch?.domain || null

  return {
    intent: intentMatch?.intent || 'calculate',
    domain,
    journey: domain ? JOURNEY_BY_DOMAIN[domain] || 'financial-planning' : null,
  }
}

export function scoreSearchResult(entry, queryMeta) {
  let score = 0
  const title = String(entry.title || '').toLowerCase()
  const text = String(entry.searchText || '')

  if (title === String(queryMeta.term || '')) score += 160
  else if (title.startsWith(String(queryMeta.term || ''))) score += 120
  else if (title.includes(String(queryMeta.term || ''))) score += 100
  else if (text.includes(String(queryMeta.term || ''))) score += 60

  if (entry.type === 'calculator') {
    if (queryMeta.intent && entry.intent === queryMeta.intent) score += 30
    if (queryMeta.domain && entry.domain === queryMeta.domain) score += 25
    if (queryMeta.journey && entry.primaryJourney === queryMeta.journey) score += 15
  }

  return score
}
