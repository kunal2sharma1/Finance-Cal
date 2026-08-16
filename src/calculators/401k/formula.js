export function calculate(inputs) {
  const age = Number(inputs.age) || 0
  const salary = Math.max(0, Number(inputs.salary) || 0)
  const employeeRate = Math.max(0, Number(inputs.employeeRate) || 0) / 100
  const employerRate = Math.max(0, Number(inputs.employerRate) || 0) / 100
  const employerCap = Math.max(0, Number(inputs.employerCap) || 0) / 100
  const years = Math.max(0, Number(inputs.years) || 0)
  const annualReturn = (Number(inputs.returnRate) || 0) / 100

  const baseLimit = 24500
  const catchUp = age >= 60 && age <= 63 ? 11250 : age >= 50 ? 8000 : 0
  const employeeLimit = baseLimit + catchUp
  const desiredEmployee = salary * employeeRate
  const annualEmployee = Math.min(desiredEmployee, employeeLimit, salary)
  const annualEmployer = Math.min(salary * employerRate, salary * employerCap)
  const annualTotal = annualEmployee + annualEmployer

  const periods = Math.max(0, Math.round(years))
  const growth = annualReturn === 0 ? periods : ((1 + annualReturn) ** periods)
  const annuityFactor = annualReturn === 0 ? periods : (((1 + annualReturn) ** periods - 1) / annualReturn)
  const projectedBalance = annualEmployee * 0 + annualTotal * annuityFactor

  const limitWarning = desiredEmployee > employeeLimit
    ? 'Your requested employee contribution is above the 2026 IRS employee deferral limit; the estimate caps it at the applicable limit.'
    : 'Within the modeled 2026 employee deferral limit.'

  return {
    annualEmployee,
    annualEmployer,
    annualTotal,
    projectedBalance: Math.max(0, projectedBalance),
    contributionLimit: employeeLimit,
    limitWarning,
    isValid: true,
    growth,
  }
}
