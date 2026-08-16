export function calculate(inputs) {
  const assets0 = Math.max(0, Number(inputs.currentAssets) || 0)
  const debt0 = Math.max(0, Number(inputs.currentDebt) || 0)
  const monthlyInvestment = Math.max(0, Number(inputs.monthlyInvestment) || 0)
  const annualDebtPayment = Math.max(0, Number(inputs.annualDebtPayment) || 0)
  const assetRate = Math.max(0, Number(inputs.annualAssetGrowth) || 0) / 100
  const years = Math.max(0, Math.floor(Number(inputs.years) || 0))

  let assets = assets0
  let debt = debt0

  for (let year = 0; year < years; year++) {
    assets = assets * (1 + assetRate) + monthlyInvestment * 12
    debt = Math.max(0, debt - annualDebtPayment)
  }

  const currentNetWorth = assets0 - debt0
  const futureNetWorth = assets - debt

  return {
    futureAssets: Math.round(assets),
    futureDebt: Math.round(debt),
    futureNetWorth: Math.round(futureNetWorth),
    netWorthGrowth: Math.round(futureNetWorth - currentNetWorth),
  }
}
