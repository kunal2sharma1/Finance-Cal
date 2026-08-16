function parseCashFlows(value) {
  if (Array.isArray(value)) {
    return value
      .map((flow) => {
        const amount = Math.abs(Number(flow.amount))
        if (!flow.date || !Number.isFinite(amount) || amount === 0) return null

        const signedAmount = flow.direction === 'received' ? amount : -amount
        return { date: flow.date, amount: signedAmount }
      })
      .filter(Boolean)
  }

  if (!value) return []

  return String(value)
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [date, amount] = line.split(',').map((part) => part.trim())
      return { date, amount: Number(amount) }
    })
    .filter((item) => item.date && Number.isFinite(item.amount) && item.amount !== 0)
}

function toMs(date) {
  const ms = new Date(date).getTime()
  if (!Number.isFinite(ms)) throw new Error(`Invalid date: ${date}`)
  return ms
}

function npv(rate, flows, firstMs) {
  return flows.reduce((sum, flow) => {
    const years = (toMs(flow.date) - firstMs) / (365 * 24 * 60 * 60 * 1000)
    return sum + flow.amount / Math.pow(1 + rate, years)
  }, 0)
}

function solveXIRR(flows) {
  let low = -0.9999
  let high = 10

  let fLow = npv(low, flows, toMs(flows[0].date))
  let fHigh = npv(high, flows, toMs(flows[0].date))

  for (let i = 0; i < 20 && fLow * fHigh > 0; i++) {
    high *= 2
    fHigh = npv(high, flows, toMs(flows[0].date))
  }

  if (!Number.isFinite(fLow) || !Number.isFinite(fHigh) || fLow * fHigh > 0) return null

  for (let i = 0; i < 200; i++) {
    const mid = (low + high) / 2
    const fMid = npv(mid, flows, toMs(flows[0].date))

    if (!Number.isFinite(fMid)) return null
    if (Math.abs(fMid) < 1e-7) return mid
    if (fLow * fMid <= 0) {
      high = mid
      fHigh = fMid
    } else {
      low = mid
      fLow = fMid
    }
  }

  const result = (low + high) / 2
  return Number.isFinite(result) ? result : null
}

function invalidResult(message, invested = 0, received = 0) {
  return {
    isValid: false,
    message,
    xirr: null,
    netCashFlow: Math.round(received - invested),
    totalInvested: Math.round(invested),
    totalReceived: Math.round(received),
  }
}

export function calculate(inputs) {
  let flows

  try {
    flows = parseCashFlows(inputs.cashFlows)
      .map((flow) => ({ ...flow, dateMs: toMs(flow.date) }))
      .sort((a, b) => a.dateMs - b.dateMs)
  } catch {
    return invalidResult('Enter valid dates for every cash flow.')
  }

  if (flows.length < 2) {
    return invalidResult('Add at least two valid cash flows to calculate XIRR.')
  }

  const hasPositive = flows.some((flow) => flow.amount > 0)
  const hasNegative = flows.some((flow) => flow.amount < 0)

  const invested = Math.abs(
    flows
      .filter((flow) => flow.amount < 0)
      .reduce((sum, flow) => sum + flow.amount, 0),
  )
  const received = flows
    .filter((flow) => flow.amount > 0)
    .reduce((sum, flow) => sum + flow.amount, 0)

  if (!hasPositive || !hasNegative) {
    return invalidResult(
      'XIRR needs at least one investment and one received cash flow.',
      invested,
      received,
    )
  }

  const rate = solveXIRR(flows)

  if (rate === null || !Number.isFinite(rate)) {
    return invalidResult(
      'A valid XIRR could not be found for these cash flows. Check the dates and amounts.',
      invested,
      received,
    )
  }

  return {
    isValid: true,
    message: null,
    xirr: Math.round(rate * 10000) / 100,
    netCashFlow: Math.round(received - invested),
    totalInvested: Math.round(invested),
    totalReceived: Math.round(received),
  }
}
