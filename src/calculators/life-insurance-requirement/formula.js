export function calculate(inputs) {
  const annualExpenses = Math.max(0, Number(inputs.annualFamilyExpenses) || 0)
  const supportYears = Math.max(0, Number(inputs.yearsOfIncomeSupport) || 0)
  const debt = Math.max(0, Number(inputs.outstandingDebt) || 0)
  const goals = Math.max(0, Number(inputs.futureGoals) || 0)
  const assets = Math.max(0, Number(inputs.existingAssets) || 0)
  const existingCover = Math.max(0, Number(inputs.existingInsurance) || 0)

  const suggestedCover = annualExpenses * supportYears + debt + goals
  const additional = Math.max(0, suggestedCover - assets - existingCover)

  return {
    suggestedCover: Math.round(suggestedCover),
    existingCover: Math.round(existingCover),
    additionalCoverNeeded: Math.round(additional),
  }
}
