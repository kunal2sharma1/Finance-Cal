export function calculate(inputs) {
  const buy = Math.max(0, Number(inputs.buyPrice) || 0)
  const sell = Math.max(0, Number(inputs.sellPrice) || 0)
  const quantity = Math.max(0, Number(inputs.quantity) || 0)
  const costs = Math.max(0, Number(inputs.totalCosts) || 0)

  const invested = buy * quantity
  const gross = (sell - buy) * quantity
  const net = gross - costs
  const returnPercent = invested > 0 ? net / invested * 100 : 0

  return {
    grossProfitLoss: Math.round(gross),
    netProfitLoss: Math.round(net),
    returnPercent: Math.round(returnPercent * 100) / 100,
  }
}
