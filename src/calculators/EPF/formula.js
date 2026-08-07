// Pure function: same inputs always give the same outputs.
// It never touches the DOM or React.

export function calculate(inputs) {
  const currentAge = Number(inputs.currentAge) || 0
  const retirementAge = Number(inputs.retirementAge) || 0
  const monthlyBasicSalary =
    Number(inputs.monthlyBasicSalary) || 0
  const currentEpfBalance =
    Number(inputs.currentEpfBalance) || 0
  const annualSalaryGrowth =
    Number(inputs.annualSalaryGrowth) || 0
  const annualInterestRate =
    Number(inputs.interestRate) || 0

  // ---------------------------------------------
  // Basic validation
  // ---------------------------------------------

  if (retirementAge <= currentAge) {
    return {
      projectedCorpus: Math.round(currentEpfBalance),
      totalEmployeeContributions: 0,
      totalEmployerEpfContributions: 0,
      totalInterestEarned: 0,
    }
  }

  if (monthlyBasicSalary < 0 || currentEpfBalance < 0) {
    return {
      projectedCorpus: 0,
      totalEmployeeContributions: 0,
      totalEmployerEpfContributions: 0,
      totalInterestEarned: 0,
    }
  }

  // ---------------------------------------------
  // EPF assumptions
  // ---------------------------------------------

  const employeeRate = 12 / 100

  // Standard employer EPF portion after EPS allocation.
  const employerEpfRate = 3.67 / 100

  // Standard EPS allocation.
  const employerEpsRate = 8.33 / 100

  // Standard statutory wage ceiling.
  const wageCeiling = 15000

  const months =
    Math.max(0, retirementAge - currentAge) * 12

  const monthlyInterestRate =
    annualInterestRate / 12 / 100

  let balance = currentEpfBalance

  let totalEmployeeContributions = 0
  let totalEmployerEpfContributions = 0
  let totalInterestEarned = 0

  // ---------------------------------------------
  // Monthly projection
  // ---------------------------------------------

  for (let month = 0; month < months; month += 1) {
    // Salary increases once every 12 months.
    const completedYears = Math.floor(month / 12)

    const salaryMultiplier = Math.pow(
      1 + annualSalaryGrowth / 100,
      completedYears
    )

    const projectedMonthlySalary =
      monthlyBasicSalary * salaryMultiplier

    /*
     * Standard EPF contribution calculation uses
     * the statutory wage ceiling of ₹15,000.
     */
    const contributionWage = Math.min(
      projectedMonthlySalary,
      wageCeiling
    )

    const employeeContribution =
      contributionWage * employeeRate

    const employerEpfContribution =
      contributionWage * employerEpfRate

    /*
     * Employer EPS contribution is calculated separately
     * and does NOT enter the EPF corpus.
     *
     * Kept here conceptually so the distinction is clear:
     *
     * employer EPS =
     * contributionWage × 8.33%
     */

    // Add employee contribution.
    balance += employeeContribution

    // Add employer's EPF portion.
    balance += employerEpfContribution

    // Estimate interest for the month.
    const monthlyInterest =
      balance * monthlyInterestRate

    balance += monthlyInterest

    totalEmployeeContributions +=
      employeeContribution

    totalEmployerEpfContributions +=
      employerEpfContribution

    totalInterestEarned += monthlyInterest
  }

  // ---------------------------------------------
  // Results
  // ---------------------------------------------

  const projectedCorpus = Math.max(0, balance)

  return {
    projectedCorpus: Math.round(projectedCorpus),

    totalEmployeeContributions:
      Math.round(totalEmployeeContributions),

    totalEmployerEpfContributions:
      Math.round(totalEmployerEpfContributions),

    totalInterestEarned:
      Math.round(totalInterestEarned),
  }
}