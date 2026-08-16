export function calculate({ vehiclePrice = 0, downPayment = 0, annualRate = 0, years = 0 }) {
  const price = Number(vehiclePrice)
  const down = Math.min(Math.max(0, Number(downPayment)), Math.max(0, price))
  const rate = Number(annualRate) / 100 / 12
  const months = Math.round(Number(years) * 12)
  const loanAmount = Math.max(0, price - down)
  if (!(loanAmount > 0) || !(months > 0)) return { loanAmount, monthlyPayment: 0, totalInterest: 0, totalRepayment: 0 }
  const monthlyPayment = rate === 0
    ? loanAmount / months
    : loanAmount * rate * (1 + rate) ** months / ((1 + rate) ** months - 1)
  const totalRepayment = monthlyPayment * months
  return { loanAmount, monthlyPayment, totalInterest: totalRepayment - loanAmount, totalRepayment }
}
