export function calculate(inputs) {
  const salary = Math.max(0, Number(inputs.lastDrawnBasicSalary) || 0)
  const years = Math.max(0, Math.floor(Number(inputs.yearsOfService) || 0))

  // Standard 15/26 formula for employees covered by the Payment of Gratuity Act,
  // using completed years as entered. Actual eligibility and service-rounding
  // rules must be checked against the employee's circumstances.
  const gratuity = salary * 15 / 26 * years

  return {
    estimatedGratuity: Math.round(gratuity),
    eligibleServiceYears: years,
  }
}
