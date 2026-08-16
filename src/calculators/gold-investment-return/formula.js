export function calculate(inputs) {
  const purchase = Math.max(0, Number(inputs.purchaseAmount) || 0)
  const current = Math.max(0, Number(inputs.currentValue) || 0)
  const years = Math.max(0, Number(inputs.yearsHeld) || 0)

  const gain = current - purchase
  const totalReturn = purchase > 0 ? gain / purchase * 100 : 0
  const annualized = purchase > 0 && current > 0 && years > 0
    ? (Math.pow(current / purchase, 1 / years) - 1) * 100
    : 0

  return {
    gainOrLoss: Math.round(gain),
    returnPercent: Math.round(totalReturn * 100) / 100,
    annualizedReturn: Math.round(annualized * 100) / 100,
  }
}
