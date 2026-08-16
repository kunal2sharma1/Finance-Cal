export function calculate(inputs) {
  const price = Math.max(0, Number(inputs.sharePrice) || 0)
  const dividend = Math.max(0, Number(inputs.annualDividendPerShare) || 0)
  const yieldPercent = price > 0 ? dividend / price * 100 : 0

  return {
    dividendYield: Math.round(yieldPercent * 100) / 100,
    annualDividend: Math.round(dividend * 100) / 100,
  }
}
