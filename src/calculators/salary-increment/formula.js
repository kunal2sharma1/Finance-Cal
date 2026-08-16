export function calculate(inputs) {
  const start = Math.max(0, Number(inputs.startingSalary) || 0)
  const growth = Math.max(0, Number(inputs.annualIncrementPercent) || 0) / 100
  const years = Math.max(0, Math.floor(Number(inputs.years) || 0))

  let salary = start
  let sum = 0
  for (let i = 0; i < years; i++) {
    sum += salary
    salary *= 1 + growth
  }

  return {
    finalAnnualSalary: Math.round(salary),
    totalIncrease: Math.round(Math.max(0, salary - start)),
    averageAnnualSalary: years > 0 ? Math.round(sum / years) : Math.round(start),
  }
}
