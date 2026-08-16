export function calculate(inputs) {
  const salary = Math.max(0, Number(inputs.monthlySalary) || 0)
  const hours = Math.max(1, Number(inputs.monthlyWorkHours) || 1)
  const overtimeHours = Math.max(0, Number(inputs.overtimeHours) || 0)
  const multiplier = Math.max(0, Number(inputs.overtimeMultiplier) || 0)

  const hourlyRate = salary / hours
  const effectiveRate = hourlyRate * multiplier
  const overtimePay = effectiveRate * overtimeHours

  return {
    hourlyRate: Math.round(hourlyRate * 100) / 100,
    overtimePay: Math.round(overtimePay),
    effectiveOvertimeRate: Math.round(effectiveRate * 100) / 100,
  }
}
