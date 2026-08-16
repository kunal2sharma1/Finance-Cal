export function calculate(inputs) {
  const allowance = 20000
  const used = Math.max(0, Number(inputs.annualAllowanceUsed) || 0)
  const planned = Math.max(0, Number(inputs.newContribution) || 0)
  const lifetime = Math.min(4000, Math.max(0, Number(inputs.lifetimeContribution) || 0))
  const years = Math.max(1, Number(inputs.years) || 1)
  const rate = (Number(inputs.returnRate) || 0) / 100
  const remaining = Math.max(0, allowance - used)
  const allowed = Math.min(planned, remaining)
  const bonus = Math.min(lifetime, allowed) * 0.25
  const growth = rate === 0 ? years : (((1 + rate) ** years - 1) / rate)
  const projectedValue = allowed * growth
  const warning = planned > remaining ? 'Planned contribution exceeds the remaining 2026–27 ISA allowance.' : 'Planned contribution fits within the remaining annual allowance.'
  return { remainingAllowance: remaining, allowedNewContribution: allowed, lifetimeBonus: bonus, projectedValue, warning, isValid: true }
}
