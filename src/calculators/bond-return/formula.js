export function calculate({ faceValue = 0, purchasePrice = 0, couponRate = 0, yearsHeld = 0, salePrice = 0 }) {
  const face = Number(faceValue)
  const purchase = Number(purchasePrice)
  const coupon = Number(couponRate) / 100
  const years = Number(yearsHeld)
  const sale = Number(salePrice)
  if (face < 0 || purchase <= 0 || coupon < 0 || years < 0 || sale < 0) {
    return { couponIncome: 0, capitalGain: 0, totalReturn: 0, totalReturnRate: 0 }
  }
  const couponIncome = face * coupon * years
  const capitalGain = sale - purchase
  const totalReturn = couponIncome + capitalGain
  return {
    couponIncome,
    capitalGain,
    totalReturn,
    totalReturnRate: (totalReturn / purchase) * 100,
  }
}
