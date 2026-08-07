// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.
//
// Model: the annual investment is treated as one deposit made at the
// start of each financial year, with interest compounding annually on
// the running balance. This is the standard "annual contribution, annual
// compounding" simplification used for PPF illustrations — see
// explanation.js for how it differs from the scheme's actual monthly
// lowest-balance rule.

export function calculate(inputs) {
  const annualInvestment = Number(inputs.annualInvestment) || 0
  const annualInterestRate = Number(inputs.annualInterestRate) || 0
  const years = Number(inputs.years) || 0

  const annualRate = annualInterestRate / 100

  let maturityAmount
  if (annualRate === 0) {
    // Edge case: 0% rate means the total is just what was put in.
    maturityAmount = annualInvestment * years
  } else {
    // Future value of an annuity due (deposit at the start of each year,
    // so every contribution gets one full extra year of compounding):
    // FV = P × [((1 + r)^n − 1) / r] × (1 + r)
    maturityAmount =
      annualInvestment *
      ((Math.pow(1 + annualRate, years) - 1) / annualRate) *
      (1 + annualRate)
  }

  const totalInvested = annualInvestment * years
  const totalReturns = maturityAmount - totalInvested

  return {
    maturityAmount: Math.round(maturityAmount),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
  }
}