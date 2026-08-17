const SIGNALS = [
  { pattern: /compare|vs\b|versus|comparison|better than/, intent: 'compare' },
  { pattern: /can i afford|afford|eligible|eligibility|qualify|can i/, intent: 'check' },
  { pattern: /should i.*(?:save|invest|repay|pay)|plan|planning|goal|target|how much should|how much do i need|save for|retire|retirement/, intent: 'plan' },
  { pattern: /future|projection|projected|growth|value later|corpus/, intent: 'project' },
  { pattern: /rate|ratio|percentage|cagr|xirr|irr|interest|yield|return rate/, intent: 'measure' },
  { pattern: /calculate|calculator|compute|how much|what is|emi|payment/, intent: 'calculate' },
]

const DOMAIN_SIGNALS = [
  { pattern: /loan|mortgage|emi|borrow|home loan|housing|house|property/, domain: 'borrowing', priority: 100 },
  { pattern: /debt|credit card|credit score|debt-to-income/, domain: 'debt', priority: 95 },
  { pattern: /net worth|savings rate|financial health/, domain: 'financial-health', priority: 90 },
  { pattern: /retire|retirement|nps|epf|401\(k\)|pension/, domain: 'retirement', priority: 85 },
  { pattern: /xirr|irr|cagr|return rate|invest|stock|sip|mutual fund|bond|portfolio|dividend/, domain: 'investing', priority: 80 },
  { pattern: /salary|ctc|bonus|gratuity|job|income/, domain: 'salary', priority: 75 },
  { pattern: /tax|capital gain|capital gains/, domain: 'tax', priority: 70 },
  { pattern: /education|college|tuition|school/, domain: 'education', priority: 65 },
  { pattern: /insurance|life cover|health cover/, domain: 'insurance', priority: 60 },
  { pattern: /save|saving|fd|fixed deposit|rd|ppf/, domain: 'saving', priority: 40 },
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
  const domainMatches = DOMAIN_SIGNALS.filter(({ pattern }) => pattern.test(text))
  const domainMatch = domainMatches.sort((a, b) => b.priority - a.priority)[0]
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
