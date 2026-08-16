function emi(principal, rate, years) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return 0
  const r = rate / 12 / 100
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}

export function calculate(inputs) {
  const price = Math.max(0, Number(inputs.carPrice) || 0)
  const down = Math.min(price, Math.max(0, Number(inputs.downPayment) || 0))
  const loan = Math.max(0, price - down)
  const rate = Math.max(0, Number(inputs.loanRate) || 0)
  const years = Math.max(0, Number(inputs.loanYears) || 0)
  const investmentRate = Math.max(0, Number(inputs.cashReturnRate) || 0) / 100
  const compareYears = Math.max(0, Number(inputs.comparisonYears) || 0)

  const monthlyEMI = emi(loan, rate, years)
  const loanMonths = Math.min(years, compareYears) * 12
  const financePayments = down + monthlyEMI * loanMonths

  const cashKeptInvested = Math.max(0, price - down)
  const estimatedInvestmentValue = cashKeptInvested * Math.pow(1 + investmentRate, compareYears)

  const cashPurchaseCost = price

  return {
    cashPurchaseCost: Math.round(cashPurchaseCost),
    financeCost: Math.round(financePayments),
    estimatedInvestmentValue: Math.round(estimatedInvestmentValue),
    difference: Math.round(Math.abs(cashPurchaseCost - financePayments - estimatedInvestmentValue)),
  }
}
