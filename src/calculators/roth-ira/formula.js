export function calculate(inputs) {
  const age = Number(inputs.age) || 0
  const status = inputs.filingStatus || 'single'
  const magi = Math.max(0, Number(inputs.magi) || 0)
  const planned = Math.max(0, Number(inputs.contribution) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)
  const annualReturn = (Number(inputs.returnRate) || 0) / 100

  const baseLimit = 7500
  const catchUp = age >= 50 ? 1100 : 0
  const maxContribution = baseLimit + catchUp
  let allowed = Math.min(planned, maxContribution)
  let eligibility = 'Within the modeled income range.'

  let low = 153000
  let high = 168000
  if (status === 'married') { low = 242000; high = 252000 }
  if (status === 'separate') { low = 0; high = 10000 }

  if (magi >= high) {
    allowed = 0
    eligibility = 'Income is at or above the modeled Roth IRA phase-out end; direct contribution is not modeled as available.'
  } else if (magi > low) {
    const ratio = Math.max(0, Math.min(1, (high - magi) / (high - low)))
    allowed *= ratio
    eligibility = 'Income is within the modeled Roth IRA phase-out range; contribution is prorated for this estimate.'
  }

  const growth = annualReturn === 0
    ? years
    : ((1 + annualReturn) ** years - 1) / annualReturn
  const projectedValue = Math.max(0, allowed * growth)

  return { allowedContribution: allowed, projectedValue, contributionLimit: maxContribution, eligibility, isValid: true }
}
