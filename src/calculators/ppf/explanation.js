export const explanation = {
  heading: 'How this is calculated',
  body: `The Public Provident Fund (PPF) is a long-term, government-backed savings scheme. You deposit a chosen amount each financial year, the government credits interest once a year, and the entire balance — deposits plus interest — is tax-free at maturity.

This calculator assumes your full annual investment is deposited at the start of each year and compounds annually on the running balance:

Maturity amount = P × [((1 + r)^n − 1) / r] × (1 + r)

P is your annual investment, r is the annual interest rate ÷ 100, and n is the number of years.

In an actual PPF account, interest is worked out monthly on the lowest balance between the 5th and the last day of that month, then credited once a year — so instalments paid later in the month, or spread across the year, earn a little less than this year-start estimate.`,
  disclaimer:
    'This is an estimate for planning purposes only. The PPF interest rate is set by the Government of India and reviewed quarterly, so the actual rate over your investment period will likely differ from the rate you enter here.',
}