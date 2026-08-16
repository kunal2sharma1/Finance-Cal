export function calculate(inputs) {
  const invested = Math.max(0, Number(inputs.amountInvested) || 0)
  const current = Math.max(0, Number(inputs.currentValue) || 0)
  const years = Math.max(0, Number(inputs.yearsHeld) || 0)
  const gain = current - invested
  const totalReturn = invested > 0 ? gain / invested * 100 : 0
  const annualized = invested > 0 && current > 0 && years > 0
    ? (Math.pow(current / invested, 1 / years) - 1) * 100
    : 0

  return {
    gainOrLoss: Math.round(gain),
    returnPercent: Math.round(totalReturn * 100) / 100,
    annualizedReturn: Math.round(annualized * 100) / 100,
  }
}
