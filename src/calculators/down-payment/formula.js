export function calculate(inputs) {
  const price = Math.max(0, Number(inputs.purchasePrice) || 0)
  const percent = Math.min(100, Math.max(0, Number(inputs.downPaymentPercent) || 0)) / 100
  const savings = Math.max(0, Number(inputs.availableSavings) || 0)
  const otherCosts = Math.max(0, Number(inputs.otherUpfrontCosts) || 0)

  const requiredDownPayment = price * percent
  const totalCashNeeded = requiredDownPayment + otherCosts
  const amountFinanced = Math.max(0, price - requiredDownPayment)
  const cashGap = Math.max(0, totalCashNeeded - savings)

  return {
    requiredDownPayment: Math.round(requiredDownPayment),
    totalCashNeeded: Math.round(totalCashNeeded),
    amountFinanced: Math.round(amountFinanced),
    cashGap: Math.round(cashGap),
  }
}
