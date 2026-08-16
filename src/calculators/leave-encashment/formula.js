export function calculate(inputs) {
  const basic = Math.max(0, Number(inputs.monthlyBasicSalary) || 0)
  const leaveDays = Math.max(0, Number(inputs.unusedLeaveDays) || 0)
  const workingDays = Math.max(1, Number(inputs.workingDaysPerMonth) || 1)

  const dailyRate = basic / workingDays
  const gross = dailyRate * leaveDays

  return {
    dailyRate: Math.round(dailyRate * 100) / 100,
    grossLeaveEncashment: Math.round(gross),
  }
}
