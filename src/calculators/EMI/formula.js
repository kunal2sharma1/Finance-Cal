// Pure function: same inputs always give the same outputs, and it never
// touches the DOM or React. That makes it easy to test and easy to reuse.

export function calculate(inputs) {
  const loanAmount = Number(inputs.loanAmount) || 0
  const annualInterestRate = Number(inputs.annualInterestRate) || 0
  const loanTenureYears = Number(inputs.loanTenureYears) || 0

  const months = loanTenureYears * 12
  const monthlyRate = annualInterestRate / 12 / 100

  let monthlyEMI = 0
  if (months > 0) {
    if (monthlyRate === 0) {
      // Edge case: 0% interest means each instalment is just the principal
      // spread evenly across the tenure, with no interest component.
      monthlyEMI = loanAmount / months
    } else {
      // Standard reducing-balance EMI formula:
      // EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
      const factor = Math.pow(1 + monthlyRate, months)
      monthlyEMI = (loanAmount * monthlyRate * factor) / (factor - 1)
    }
  }

  const totalAmountPayable = monthlyEMI * months
  const totalInterestPayable = totalAmountPayable - loanAmount

  return {
    monthlyEMI: Math.round(monthlyEMI),
    totalAmountPayable: Math.round(totalAmountPayable),
    totalInterestPayable: Math.round(totalInterestPayable),
  }
}