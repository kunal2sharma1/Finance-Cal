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
    .filter((item) => item.date && Number.isFinite(item.amount))
}

function toMs(date) {
  const ms = new Date(date).getTime()
  if (!Number.isFinite(ms)) throw new Error(`Invalid date: ${date}`)
  return ms
}

function npv(rate, flows, firstMs) {
  return flows.reduce((sum, flow) => {
    const years = (toMs(flow.date) - firstMs) / (365 * 24 * 60 * 60 * 1000)
    const denominator = Math.pow(1 + rate, years)
    if (!Number.isFinite(denominator) || denominator === 0) return Number.NaN
    return sum + flow.amount / denominator
  }, 0)
}

function solveXIRR(flows) {
  let low = -0.9999
  let high = 10

  let fLow = npv(low, flows, toMs(flows[0].date))
  let fHigh = npv(high, flows, toMs(flows[0].date))

  if (!Number.isFinite(fLow) || !Number.isFinite(fHigh)) return null

  for (let i = 0; i < 20 && fLow * fHigh > 0; i++) {
    high *= 2
    fHigh = npv(high, flows, toMs(flows[0].date))
    if (!Number.isFinite(fHigh)) return null
  }

  if (fLow * fHigh > 0) return null

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

export function calculate(inputs) {
  const flows = parseCashFlows(inputs.cashFlows)
    .sort((a, b) => toMs(a.date) - toMs(b.date))

  const invested = Math.abs(
    flows
      .filter((flow) => flow.amount < 0)
      .reduce((sum, flow) => sum + flow.amount, 0),
  )
  const received = flows
    .filter((flow) => flow.amount > 0)
    .reduce((sum, flow) => sum + flow.amount, 0)

  const summary = {
    netCashFlow: Math.round(received - invested),
    totalInvested: Math.round(invested),
    totalReceived: Math.round(received),
  }

  if (flows.length < 2) {
    return {
      ...summary,
      isValid: false,
      message: 'XIRR needs at least one investment and one received cash flow.',
    }
  }

  const hasPositive = flows.some((flow) => flow.amount > 0)
  const hasNegative = flows.some((flow) => flow.amount < 0)

  if (!hasPositive || !hasNegative) {
    return {
      ...summary,
      isValid: false,
      message: 'XIRR needs at least one investment and one received cash flow.',
    }
  }

  const rate = solveXIRR(flows)

  if (rate === null) {
    return {
      ...summary,
      isValid: false,
      message: 'XIRR could not find a valid annualized return for these cash flows.',
    }
  }

  return {
    ...summary,
    xirr: Math.round(rate * 10000) / 100,
    isValid: true,
  }
}
