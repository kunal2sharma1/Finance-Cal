const GROUP_RULES = [
  {
    id: 'amounts',
    label: 'Amounts & balances',
    description: 'Enter the money amounts that define the scenario.',
    pattern: /amount|balance|principal|investment|savings|salary|income|price|expense|payment|deposit|corpus|assets|liabilit|debt|premium|contribution|withdrawal|spending/i,
  },
  {
    id: 'rates',
    label: 'Rates & assumptions',
    description: 'Set the rates or assumptions used by the calculation.',
    pattern: /rate|interest|return|yield|inflation|tax|growth|step.?up|withdrawal.?rate|coupon/i,
  },
  {
    id: 'time',
    label: 'Time & dates',
    description: 'Choose the period, timing or dates used by the calculation.',
    pattern: /year|month|tenure|term|age|date|period|retirement|duration|timeline/i,
  },
  {
    id: 'options',
    label: 'Options & preferences',
    description: 'Choose the product, country, currency or other calculation options.',
    types: new Set(['select', 'currency-select', 'cashflows']),
  },
]

function inferGroup(field) {
  const explicit = typeof field?.group === 'string' ? field.group.trim() : ''
  if (explicit) {
    return {
      id: `custom:${explicit.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      label: explicit,
      description: field.groupDescription || '',
    }
  }

  const type = field?.type || 'number'
  for (const rule of GROUP_RULES) {
    if (rule.types?.has(type)) return { id: rule.id, label: rule.label, description: rule.description }
    const haystack = `${field?.name || ''} ${field?.label || ''} ${field?.unit || ''}`
    if (rule.pattern?.test(haystack)) return { id: rule.id, label: rule.label, description: rule.description }
  }

  return {
    id: 'general',
    label: 'Inputs',
    description: 'Set the assumptions used by this calculator.',
  }
}

export function getInputGroups(fields = []) {
  const groups = []
  const indexById = new Map()

  for (const field of fields) {
    const group = inferGroup(field)
    let bucket = indexById.get(group.id)
    if (!bucket) {
      bucket = { ...group, fields: [] }
      indexById.set(group.id, bucket)
      groups.push(bucket)
    }
    bucket.fields.push(field)
  }

  return groups
}

export function validateInputGroups(fields = []) {
  const groups = getInputGroups(fields)
  const groupedNames = groups.flatMap((group) => group.fields.map((field) => field.name))
  const sourceNames = fields.map((field) => field.name)
  return {
    valid:
      groups.length > 0 &&
      groupedNames.length === sourceNames.length &&
      new Set(groupedNames).size === sourceNames.length &&
      groupedNames.every((name, index) => name === sourceNames[index]),
    groups,
  }
}
