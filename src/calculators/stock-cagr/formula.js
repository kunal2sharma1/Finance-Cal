export function calculate(inputs) {
  const start = Math.max(0, Number(inputs.startingPrice) || 0)
  const end = Math.max(0, Number(inputs.endingPrice) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)

  const totalGrowth = start > 0 ? (end / start - 1) * 100 : 0
  const cagr = start > 0 && end > 0 && years > 0
    ? (Math.pow(end / start, 1 / years) - 1) * 100
    : 0

  return {
    cagr: Math.round(cagr * 100) / 100,
    totalGrowth: Math.round(totalGrowth * 100) / 100,
    priceChange: Math.round(end - start),
  }
}
