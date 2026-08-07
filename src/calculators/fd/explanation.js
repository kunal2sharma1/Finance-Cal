export const explanation = {
  heading: 'How this is calculated',
  body: `A Fixed Deposit (FD) means locking in a lump sum with a bank for a fixed tenure at a fixed interest rate. Most Indian banks compound FD interest quarterly, so interest earned in one quarter starts earning its own interest from the next quarter onward.

We use the standard quarterly-compounding FD formula:

A = P × (1 + r/4)^(4t)

P is your deposit amount, r is the annual interest rate as a decimal (annual rate ÷ 100), and t is the tenure in years.`,
  disclaimer:
    'This is an estimate for planning purposes only. Actual FD interest rates, compounding frequency, and tax treatment vary by bank and are not guaranteed.',
}