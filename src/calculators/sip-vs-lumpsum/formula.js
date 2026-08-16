function futureValueOfLumpsum(principal, monthlyRate, months) {
  return principal * Math.pow(1 + monthlyRate, months)
}

function futureValueOfSIP(monthlyInvestment, monthlyRate, months) {
  if (monthlyRate === 0) return monthlyInvestment * months
  return monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
}

export function calculate(inputs) {
  const lumpsum = Math.max(0, Number(inputs.lumpsumAmount) || 0)
  const sip = Math.max(0, Number(inputs.sipAmount) || 0)
  const annualReturn = Math.max(0, Number(inputs.annualReturnRate) || 0)
  const years = Math.max(0, Number(inputs.years) || 0)

  const months = years * 12
  const monthlyRate = annualReturn / 12 / 100

  const lumpsumFinalValue = futureValueOfLumpsum(lumpsum, monthlyRate, months)
  const sipFinalValue = futureValueOfSIP(sip, monthlyRate, months)

  return {
    lumpsumFinalValue: Math.round(lumpsumFinalValue),
    sipFinalValue: Math.round(sipFinalValue),
    difference: Math.round(Math.abs(lumpsumFinalValue - sipFinalValue)),
    lumpsumGain: Math.round(Math.max(0, lumpsumFinalValue - lumpsum)),
    sipGain: Math.round(Math.max(0, sipFinalValue - sip * months)),
  }
}
