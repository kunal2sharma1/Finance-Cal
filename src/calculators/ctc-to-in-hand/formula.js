export function calculate(inputs) {
  const ctc = Math.max(0, Number(inputs.annualCTC) || 0)
  const variable = Math.max(0, Number(inputs.variablePayAnnual) || 0)
  const employerPF = Math.max(0, Number(inputs.employerPFAnnual) || 0)
  const gratuity = Math.max(0, Number(inputs.gratuityAnnual) || 0)
  const employeePF = Math.max(0, Number(inputs.employeePFAnnual) || 0)
  const tds = Math.max(0, Number(inputs.annualTDS) || 0)
  const other = Math.max(0, Number(inputs.otherDeductionsAnnual) || 0)

  const excluded = Math.min(ctc, variable + employerPF + gratuity)
  const cashBeforeEmployeeDeductions = Math.max(0, ctc - excluded)
  const annualInHand = Math.max(0, cashBeforeEmployeeDeductions - employeePF - tds - other)

  return {
    estimatedMonthlyInHand: Math.round(annualInHand / 12),
    estimatedAnnualFixedCash: Math.round(cashBeforeEmployeeDeductions),
    totalExcludedFromCash: Math.round(excluded),
    estimatedAnnualInHand: Math.round(annualInHand),
  }
}
