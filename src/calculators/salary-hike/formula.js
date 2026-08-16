export function calculate(inputs) {
  const current = Math.max(0, Number(inputs.currentAnnualSalary) || 0)
  const hike = Math.max(0, Number(inputs.hikePercent) || 0) / 100

  const increase = current * hike
  const next = current + increase

  return {
    newAnnualSalary: Math.round(next),
    annualIncrease: Math.round(increase),
    monthlyIncrease: Math.round(increase / 12),
    newMonthlySalary: Math.round(next / 12),
  }
}
