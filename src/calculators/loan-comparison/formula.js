function calc(principal, annualRate, years, fees) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return { emi: 0, interest: 0, cost: fees }
  const r = annualRate / 12 / 100
  const emi = r === 0 ? principal / months : principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
  const repayment = emi * months
  return { emi, interest: Math.max(0, repayment - principal), cost: repayment + fees }
}

export function calculate(inputs) {
  const amount = Math.max(0, Number(inputs.loanAmount) || 0)
  const a = calc(amount, Math.max(0, Number(inputs.rateA) || 0), Math.max(0, Number(inputs.yearsA) || 0), Math.max(0, Number(inputs.feesA) || 0))
  const b = calc(amount, Math.max(0, Number(inputs.rateB) || 0), Math.max(0, Number(inputs.yearsB) || 0), Math.max(0, Number(inputs.feesB) || 0))
  const difference = Math.abs(a.cost - b.cost)

  return {
    loanATotalCost: Math.round(a.cost),
    loanBTotalCost: Math.round(b.cost),
    cheaperOption: a.cost <= b.cost ? 1 : 2,
    costDifference: Math.round(difference),
  }
}
