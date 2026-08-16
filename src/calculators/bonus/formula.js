export function calculate(inputs) {
  const salary = Math.max(0, Number(inputs.annualSalary) || 0)
  const bonusPercent = Math.max(0, Number(inputs.bonusPercent) || 0) / 100
  const deductionPercent = Math.min(100, Math.max(0, Number(inputs.estimatedDeductionPercent) || 0)) / 100

  const grossBonus = salary * bonusPercent
  const estimatedDeductions = grossBonus * deductionPercent

  return {
    grossBonus: Math.round(grossBonus),
    estimatedDeductions: Math.round(estimatedDeductions),
    estimatedNetBonus: Math.round(grossBonus - estimatedDeductions),
  }
}
