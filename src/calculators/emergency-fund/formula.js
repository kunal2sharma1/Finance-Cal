export function calculate(inputs) {
  const monthly = Math.max(0, Number(inputs.monthlyEssentialExpenses) || 0)
  const months = Math.max(0, Number(inputs.monthsOfCover) || 0)
  const current = Math.max(0, Number(inputs.currentEmergencySavings) || 0)

  const recommendedFund = monthly * months
  const shortfall = Math.max(0, recommendedFund - current)
  const monthsCovered = monthly > 0 ? current / monthly : 0

  return {
    recommendedFund: Math.round(recommendedFund),
    currentSavings: Math.round(current),
    shortfall: Math.round(shortfall),
    monthsCovered: Math.round(monthsCovered * 10) / 10,
  }
}
