// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

export function calculate(inputs) {
  const monthlyDeposit = Number(inputs.monthlyDeposit) || 0
  const annualInterestRate = Number(inputs.annualInterestRate) || 0
  const years = Number(inputs.years) || 0

  const months = years * 12
  const quarters = months / 3
  const quarterlyRate = annualInterestRate / 4 / 100

  let maturityAmount
  if (quarterlyRate === 0) {
    // Edge case: 0% interest means the maturity is just what was deposited.
    maturityAmount = monthlyDeposit * months
  } else {
    // Standard Indian RD maturity formula (as prescribed by the Indian
    // Banks' Association). Interest compounds quarterly even though
    // deposits are made monthly, so each instalment's growth is modelled
    // with a fractional exponent (−1/3) to account for months that fall
    // between quarterly compounding dates:
    // M = P × [(1 + i)^n − 1] / [1 − (1 + i)^(−1/3)]
    maturityAmount =
      monthlyDeposit *
      ((Math.pow(1 + quarterlyRate, quarters) - 1) /
        (1 - Math.pow(1 + quarterlyRate, -1 / 3)))
  }

  const totalInvested = monthlyDeposit * months
  const totalReturns = maturityAmount - totalInvested

  return {
    maturityAmount: Math.round(maturityAmount),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
  }
}