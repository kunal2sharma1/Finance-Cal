export function calculate(inputs) {
  const shares = Math.max(0, Number(inputs.shares) || 0)
  const dividendPerShare = Math.max(0, Number(inputs.dividendPerShare) || 0)
  const annualDividend = shares * dividendPerShare

  return {
    annualDividend: Math.round(annualDividend),
    monthlyEquivalent: Math.round(annualDividend / 12),
  }
}
