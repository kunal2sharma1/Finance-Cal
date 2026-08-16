export function calculate(inputs) {
  const gross = Math.max(0, Number(inputs.annualGrossSalary) || 0)
  const pf = Math.max(0, Number(inputs.employeePFAnnual) || 0)
  const professionalTax = Math.max(0, Number(inputs.professionalTaxAnnual) || 0)
  const other = Math.max(0, Number(inputs.otherDeductionsAnnual) || 0)
  const tds = Math.max(0, Number(inputs.annualTDS) || 0)

  const deductions = pf + professionalTax + other + tds
  const annualTakeHome = Math.max(0, gross - deductions)

  return {
    estimatedMonthlyTakeHome: Math.round(annualTakeHome / 12),
    estimatedAnnualTakeHome: Math.round(annualTakeHome),
    totalAnnualDeductions: Math.round(deductions),
    takeHomePercent: gross > 0 ? Math.round((annualTakeHome / gross) * 10000) / 100 : 0,
  }
}
