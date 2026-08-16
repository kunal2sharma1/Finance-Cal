export function calculate(values) {
  const salary = Number(values.salary)
  const employeeRate = Number(values.employeeRate) / 100
  const sgRate = Number(values.sgRate) / 100
  const years = Number(values.years)
  const returnRate = Number(values.returnRate) / 100

  if (![salary, employeeRate, sgRate, years, returnRate].every(Number.isFinite) || salary < 0 || years <= 0) {
    return { isValid: false, message: 'Enter valid superannuation assumptions.' }
  }

  const annualEmployer = salary * sgRate
  const annualEmployee = salary * employeeRate
  const annualTotal = annualEmployer + annualEmployee

  let projectedBalance = 0
  const annualGrowth = 1 + returnRate
  for (let year = 0; year < years; year += 1) {
    projectedBalance = projectedBalance * annualGrowth + annualTotal
  }

  return {
    isValid: true,
    annualEmployer,
    annualEmployee,
    annualTotal,
    projectedBalance,
    sgRateUsed: sgRate * 100,
  }
}
