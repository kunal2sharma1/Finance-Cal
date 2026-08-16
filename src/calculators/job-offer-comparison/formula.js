export function calculate(inputs) {
  const a = Math.max(0, Number(inputs.offerATakeHomeMonthly) || 0) - Math.max(0, Number(inputs.offerARentMonthly) || 0) - Math.max(0, Number(inputs.offerATransportMonthly) || 0)
  const b = Math.max(0, Number(inputs.offerBTakeHomeMonthly) || 0) - Math.max(0, Number(inputs.offerBRentMonthly) || 0) - Math.max(0, Number(inputs.offerBTransportMonthly) || 0)

  const annualA = Math.max(0, a * 12)
  const annualB = Math.max(0, b * 12)

  return {
    offerAUsableAnnualMoney: Math.round(annualA),
    offerBUsableAnnualMoney: Math.round(annualB),
    difference: Math.round(Math.abs(annualA - annualB)),
  }
}
