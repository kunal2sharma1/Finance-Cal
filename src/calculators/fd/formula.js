// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

export function calculate(inputs) {
  const depositAmount = Number(inputs.depositAmount) || 0
  const annualInterestRate = Number(inputs.annualInterestRate) || 0
  const tenureYears = Number(inputs.tenureYears) || 0

  const quarterlyRate = annualInterestRate / 100 / 4

  // Standard FD compound-interest formula, compounded quarterly:
  // A = P × (1 + r/4)^(4t)
  // At 0% interest this simplifies to A = P × 1, so the maturity amount
  // correctly falls back to the principal — no special-casing needed.
  const maturityAmount =
    depositAmount * Math.pow(1 + quarterlyRate, 4 * tenureYears)

  const totalInvested = depositAmount
  const totalReturns = maturityAmount - totalInvested

  return {
    maturityAmount: Math.round(maturityAmount),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
  }
}