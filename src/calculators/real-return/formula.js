export function calculate({ nominalReturn = 0, inflationRate = 0 }) {
  const nominal = Number(nominalReturn) / 100
  const inflation = Number(inflationRate) / 100
  if (nominal <= -1 || inflation <= -1) return { realReturn: 0, purchasingPowerFactor: 1 }
  const factor = (1 + nominal) / (1 + inflation)
  return {
    realReturn: (factor - 1) * 100,
    purchasingPowerFactor: factor,
  }
}
