export function calculate(inputs) {
  const principal = Math.max(0, Number(inputs.principal) || 0)
  const annualRate = Math.max(0, Number(inputs.annualRate) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)

  const interest = principal * (annualRate / 100) * years
  return {
    interest: Math.round(interest),
    maturityAmount: Math.round(principal + interest),
  }
}
