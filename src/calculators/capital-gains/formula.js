export function calculate(inputs) {
  const purchase = Math.max(0, Number(inputs.purchaseValue) || 0)
  const sale = Math.max(0, Number(inputs.saleValue) || 0)
  const purchaseCosts = Math.max(0, Number(inputs.purchaseCosts) || 0)
  const saleCosts = Math.max(0, Number(inputs.saleCosts) || 0)

  const grossGain = sale - purchase
  const totalCosts = purchaseCosts + saleCosts
  const netGain = grossGain - totalCosts

  return {
    netGain: Math.round(netGain),
    grossGain: Math.round(grossGain),
    totalCosts: Math.round(totalCosts),
  }
}
