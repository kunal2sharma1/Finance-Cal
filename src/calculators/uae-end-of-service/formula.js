export function calculate(values) {
  const basicSalary = Number(values.basicSalary)
  const years = Number(values.years)

  if (![basicSalary, years].every(Number.isFinite) || basicSalary < 0 || years < 0) {
    return { isValid: false, message: 'Enter valid salary and service years.' }
  }

  const dailyBasicSalary = basicSalary / 30
  const cap = basicSalary * 24

  if (years < 1) {
    return {
      isValid: true,
      dailyBasicSalary,
      gratuity: 0,
      cap,
      eligibility: 'Less than 1 year: no gratuity under the standard full-time expatriate rule.',
    }
  }

  const firstFiveYears = Math.min(years, 5)
  const laterYears = Math.max(years - 5, 0)
  const gratuity = Math.min(
    dailyBasicSalary * 21 * firstFiveYears + dailyBasicSalary * 30 * laterYears,
    cap,
  )

  return {
    isValid: true,
    dailyBasicSalary,
    gratuity,
    cap,
    eligibility: 'Eligible under the standard full-time expatriate private-sector rule, subject to the applicable law and service conditions.',
  }
}
