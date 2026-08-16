export function calculate(inputs) {
  const monthly = Math.max(0, Number(inputs.monthlyGrossSalary) || 0)
  const noticeDays = Math.max(0, Number(inputs.noticeDays) || 0)
  const served = Math.min(noticeDays, Math.max(0, Number(inputs.daysServed) || 0))
  const multiplier = Math.max(0, Number(inputs.buyoutMultiplier) || 0)
  const daily = monthly / 30
  const unserved = Math.max(0, noticeDays - served)

  return {
    dailySalary: Math.round(daily),
    servedPeriodPay: Math.round(daily * served),
    unservedDays: Math.round(unserved),
    estimatedBuyout: Math.round(daily * unserved * multiplier),
  }
}
