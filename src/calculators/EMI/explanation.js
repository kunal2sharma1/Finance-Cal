export const explanation = {
  heading: 'How this is calculated',
  body: `An EMI (Equated Monthly Instalment) is the fixed amount you repay each month on a loan. Every instalment first covers that month's interest, and whatever remains reduces the principal — so the interest portion shrinks and the principal portion grows with each payment, even though the EMI itself stays constant throughout the tenure.

We use the standard reducing-balance EMI formula:

EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)

P is your loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly instalments (loan tenure in years × 12). At 0% interest, the EMI is simply the loan amount divided evenly across the tenure.`,
  disclaimer:
    'This is an estimate for planning purposes only. Actual EMI amounts may vary by lender due to processing fees, prepayment terms, or floating interest rates.',
}