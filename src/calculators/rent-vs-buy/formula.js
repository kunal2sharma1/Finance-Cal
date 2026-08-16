function emi(principal, rate, years) {
  const months = Math.round(years * 12)
  if (principal <= 0 || months <= 0) return 0
  const r = rate / 12 / 100
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}

export function calculate(inputs) {
  const homePrice = Math.max(0, Number(inputs.homePrice) || 0)
  const downPayment = Math.min(homePrice, Math.max(0, Number(inputs.downPayment) || 0))
  const loanRate = Math.max(0, Number(inputs.loanRate) || 0)
  const loanYears = Math.max(0, Number(inputs.loanYears) || 0)
  const monthlyRent = Math.max(0, Number(inputs.monthlyRent) || 0)
  const rentGrowth = Math.max(0, Number(inputs.annualRentIncrease) || 0) / 100
  const propertyGrowth = Math.max(0, Number(inputs.annualPropertyGrowth) || 0) / 100
  const yearsCompare = Math.max(0, Math.floor(Number(inputs.yearsCompare) || 0))
  const maintenanceRate = Math.max(0, Number(inputs.annualMaintenanceRate) || 0) / 100

  const loan = Math.max(0, homePrice - downPayment)
  const monthlyEMI = emi(loan, loanRate, loanYears)
  let rentingCost = 0
  let currentRent = monthlyRent
  let maintenance = 0

  for (let year = 0; year < yearsCompare; year++) {
    rentingCost += currentRent * 12
    maintenance += homePrice * Math.pow(1 + propertyGrowth, year) * maintenanceRate
    currentRent *= 1 + rentGrowth
  }

  const loanPaymentsWithinPeriod = monthlyEMI * Math.min(loanYears, yearsCompare) * 12
  const buyingCost = downPayment + loanPaymentsWithinPeriod + maintenance
  const estimatedHomeValue = homePrice * Math.pow(1 + propertyGrowth, yearsCompare)

  return {
    buyingCost: Math.round(buyingCost),
    rentingCost: Math.round(rentingCost),
    difference: Math.round(Math.abs(buyingCost - rentingCost)),
    estimatedHomeValue: Math.round(estimatedHomeValue),
  }
}
