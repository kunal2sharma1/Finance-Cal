export function calculate(inputs) {
  const age = Number(inputs.age) || 0
  const wage = Math.max(0, Number(inputs.monthlyWage) || 0)
  const wageUsed = Math.min(wage, 8000)

  let employeeRate = 0.20
  let employerRate = 0.17
  if (age > 55 && age <= 60) { employeeRate = 0.18; employerRate = 0.16 }
  else if (age > 60 && age <= 65) { employeeRate = 0.125; employerRate = 0.125 }
  else if (age > 65 && age <= 70) { employeeRate = 0.075; employerRate = 0.09 }
  else if (age > 70) { employeeRate = 0.05; employerRate = 0.075 }

  const employeeContribution = wageUsed * employeeRate
  const employerContribution = wageUsed * employerRate
  return {
    employeeContribution,
    employerContribution,
    totalContribution: employeeContribution + employerContribution,
    contributionRate: (employeeRate + employerRate) * 100,
    wageUsed,
    isValid: true,
  }
}
