export function calculate(inputs) {
  const assets = Math.max(0, Number(inputs.investedAssets) || 0)
  const expenses = Math.max(0, Number(inputs.annualExpenses) || 0)
  const rate = Math.max(0.01, Number(inputs.withdrawalRate) || 0) / 100

  const targetCorpus = expenses / rate
  const progressPercent = targetCorpus > 0 ? Math.min(100, (assets / targetCorpus) * 100) : 0

  return {
    targetCorpus: Math.round(targetCorpus),
    progressPercent: Math.round(progressPercent * 100) / 100,
    remainingGap: Math.round(Math.max(0, targetCorpus - assets)),
  }
}
