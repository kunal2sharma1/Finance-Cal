export function calculate(inputs) {
  const oldQty = Math.max(0, Number(inputs.existingQuantity) || 0)
  const oldPrice = Math.max(0, Number(inputs.existingAveragePrice) || 0)
  const newQty = Math.max(0, Number(inputs.newQuantity) || 0)
  const newPrice = Math.max(0, Number(inputs.newPrice) || 0)

  const oldCost = oldQty * oldPrice
  const newCost = newQty * newPrice
  const totalQuantity = oldQty + newQty
  const totalInvested = oldCost + newCost

  return {
    newAveragePrice: totalQuantity > 0 ? Math.round((totalInvested / totalQuantity) * 100) / 100 : 0,
    totalQuantity: Math.round(totalQuantity),
    totalInvested: Math.round(totalInvested),
  }
}
