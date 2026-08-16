export function calculate(inputs) {
  const invested = Math.max(0, Number(inputs.amountInvested) || 0)
  const current = Math.max(0, Number(inputs.currentValue) || 0)
  const years = Math.max(0, Number(inputs.yearsHeld) || 0)

  const gainOrLoss = current - invested
  const returnPercent = invested > 0 ? (gainOrLoss / invested) * 100 : 0
  const annualizedReturn = invested > 0 && current >= 0 && years > 0
    ? (Math.pow(current / invested, 1 / years) - 1) * 100
    : 0

  return {
    gainOrLoss: Math.round(gainOrLoss),
    returnPercent: Math.round(returnPercent * 100) / 100,
    annualizedReturn: Math.round(annualizedReturn * 100) / 100,
  }
}
