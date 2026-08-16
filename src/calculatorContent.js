// Tier 1 is a hand-picked priority set for deeper custom content in this batch;
// it is a planning priority, not a claim about measured search volume.
const priorityTierOne = new Set([
  'sip',
  'step-up-sip',
  'sip-vs-lumpsum',
  'xirr',
  'cagr',
  'ppf',
  'fd',
  'emi',
  'home-loan',
  'personal-loan',
  'loan-prepayment',
  'salary-take-home',
  'ctc-to-in-hand',
  'retirement',
  'retirement-gap',
  'nps',
  'emergency-fund',
  'budget',
  'inflation',
  'net-worth',
])

export function getCalculatorPriorityTier(id) {
  if (priorityTierOne.has(id)) return 1
  return 2
}

export function buildFallbackCalculatorContent(config) {
  const title = config.title
  const description = config.shortDescription || `Use the ${title} to explore a financial scenario using the inputs you choose.`

  return {
    sections: [
      [
        `What does the ${title} do?`,
        description,
      ],
      [
        'How should you use it?',
        `Enter realistic assumptions for the ${title.toLowerCase()}, then test more than one scenario. Compare the result with your actual budget, goals and the terms that apply to your situation.`,
      ],
      [
        'What should you keep in mind?',
        'A calculator result is an estimate based on the assumptions you enter. Rates, taxes, fees, market returns and other real-world conditions can differ, so use the result for planning rather than as a guarantee.',
      ],
    ],
  }
}
