function parseAssets(value) {
  return String(value || '')
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, invested, current] = line.split(',').map((v) => v.trim())
      return {
        name: name || 'Investment',
        invested: Math.max(0, Number(invested) || 0),
        current: Math.max(0, Number(current) || 0),
      }
    })
}

export function calculate(inputs) {
  const assets = parseAssets(inputs.assets)
  const totalInvested = assets.reduce((sum, item) => sum + item.invested, 0)
  const currentValue = assets.reduce((sum, item) => sum + item.current, 0)
  const gainOrLoss = currentValue - totalInvested
  const returnPercent = totalInvested > 0 ? gainOrLoss / totalInvested * 100 : 0

  return {
    totalInvested: Math.round(totalInvested),
    currentValue: Math.round(currentValue),
    gainOrLoss: Math.round(gainOrLoss),
    returnPercent: Math.round(returnPercent * 100) / 100,
  }
}
