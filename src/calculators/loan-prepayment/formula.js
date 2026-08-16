function emi(principal, annualRate, months) {
  if (principal <= 0 || months <= 0) return 0
  const r = annualRate / 12 / 100
  if (r === 0) return principal / months
  const f = Math.pow(1 + r, months)
  return principal * r * f / (f - 1)
}

function amortize(principal, annualRate, months, extraMonthly, annualLumpSum) {
  const r = annualRate / 12 / 100
  const baseEMI = emi(principal, annualRate, months)
  let balance = principal
  let interest = 0
  let month = 0

  while (balance > 0.01 && month < Math.max(months, 1200)) {
    month++
    const interestPart = balance * r
    interest += interestPart

    let payment = Math.min(baseEMI, balance + interestPart)
    let principalPart = Math.max(0, payment - interestPart)
    balance = Math.max(0, balance - principalPart)

    const extra = Math.min(extraMonthly, balance)
    balance -= extra

    if (annualLumpSum > 0 && month % 12 === 0) {
      const annual = Math.min(annualLumpSum, balance)
      balance -= annual
    }
  }

  return { interest, months: month }
}

export function calculate(inputs) {
  const principal = Math.max(0, Number(inputs.outstandingLoan) || 0)
  const rate = Math.max(0, Number(inputs.annualInterestRate) || 0)
  const years = Math.max(0, Number(inputs.remainingYears) || 0)
  const extraMonthly = Math.max(0, Number(inputs.extraMonthlyPayment) || 0)
  const annualLumpSum = Math.max(0, Number(inputs.annualLumpSum) || 0)
  const months = Math.round(years * 12)

  const without = amortize(principal, rate, months, 0, 0)
  const withExtra = amortize(principal, rate, months, extraMonthly, annualLumpSum)

  return {
    interestWithoutPrepayment: Math.round(without.interest),
    interestWithPrepayment: Math.round(withExtra.interest),
    interestSaved: Math.round(Math.max(0, without.interest - withExtra.interest)),
    monthsSaved: Math.max(0, months - withExtra.months),
  }
}
