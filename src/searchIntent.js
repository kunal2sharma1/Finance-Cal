const SIGNALS = [
  { intent: 'compare', pattern: /compare|vs\b|versus|comparison|better than/ },
  { intent: 'plan', pattern: /home buying|buying a home|buy a home|home purchase|house buying|buying a house|should i.*(?:save|invest|repay|pay)|plan|planning|goal|target|how much should|how much do i need|save for|retire|retirement/ },
  { intent: 'check', pattern: /can i afford|afford|eligible|eligibility|qualify|can i/ },
  { intent: 'project', pattern: /future|projection|projected|growth|value later|corpus/ },
  { intent: 'measure', pattern: /rate|ratio|percentage|cagr|xirr|irr|interest|yield|return rate/ },
  { intent: 'calculate', pattern: /calculate|calculator|compute|how much|what is|emi|payment/ },
]

const DOMAIN_SIGNALS = [
  { pattern: /loan|mortgage|emi|borrow|home loan|housing|house|property|home buying|buying a home|buy a home|home purchase|house buying|buying a house/, domain: 'borrowing', priority: 100 },
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

const INTENT_PRIORITY = new Map([
  ['compare', 100],
  ['plan', 90],
  ['check', 80],
  ['project', 70],
  ['measure', 60],
  ['calculate', 50],
])

function normalizeQuery(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ')
}

export function detectSearchIntent(query) {
  const text = normalizeQuery(query)
  if (!text) {
    return {
      intent: 'calculate',
      domain: null,
      journey: null,
      confidence: 0,
      evidence: [],
      matchedIntents: [],
      matchedDomains: [],
      recognized: false,
    }
  }

  const matchedIntents = SIGNALS
    .filter(({ pattern }) => pattern.test(text))
    .map(({ intent }) => intent)

  const intent = matchedIntents
    .slice()
    .sort((a, b) => INTENT_PRIORITY.get(b) - INTENT_PRIORITY.get(a))[0] || 'calculate'

  const domainMatches = DOMAIN_SIGNALS
    .filter(({ pattern }) => pattern.test(text))
    .sort((a, b) => b.priority - a.priority)

  const domain = domainMatches[0]?.domain || null
  const journey = domain ? JOURNEY_BY_DOMAIN[domain] || 'financial-planning' : null

  const evidence = [
    ...matchedIntents.map((value) => ({ type: 'intent', value })),
    ...domainMatches.map(({ domain: value, priority }) => ({ type: 'domain', value, priority })),
  ]

  const topIntentMatch = matchedIntents.length > 0
  const domainMatch = Boolean(domain)
  const confidence = Math.min(
    1,
    (topIntentMatch ? 0.55 : 0) + (domainMatch ? 0.35 : 0) + (evidence.length >= 2 ? 0.10 : 0),
  )

  return {
    intent,
    domain,
    journey,
    confidence,
    evidence,
    matchedIntents,
    matchedDomains: domainMatches.map(({ domain: value, priority }) => ({ value, priority })),
    recognized: topIntentMatch || domainMatch,
  }
}

export function inferSearchIntent(query) {
  const { intent, domain, journey } = detectSearchIntent(query)
  return { intent, domain, journey }
}

export function scoreSearchResult(entry, queryMeta) {
  let score = 0
  const title = String(entry.title || '').toLowerCase()
  const text = String(entry.searchText || '')
  const terms = Array.isArray(queryMeta.terms) && queryMeta.terms.length ? queryMeta.terms : [queryMeta.term]
  let bestLexicalScore = 0

  for (const rawTerm of terms) {
    const term = String(rawTerm || '').trim().toLowerCase()
    if (!term) continue

    if (title === term) bestLexicalScore = Math.max(bestLexicalScore, 160)
    else if (title.startsWith(term)) bestLexicalScore = Math.max(bestLexicalScore, 120)
    else if (title.includes(term)) bestLexicalScore = Math.max(bestLexicalScore, 100)
    else if (text.includes(term)) bestLexicalScore = Math.max(bestLexicalScore, 60)
  }

  score += bestLexicalScore

  if (queryMeta.corrected) score -= 2

  if (entry.type === 'calculator') {
    if (queryMeta.intent && entry.intent === queryMeta.intent) score += 30
    if (queryMeta.domain && entry.domain === queryMeta.domain) score += 25
    if (queryMeta.journey && entry.primaryJourney === queryMeta.journey) score += 15
  }

  return score
}
