export const explanation = {
  heading: 'How this is calculated',
  body: `A Recurring Deposit (RD) means depositing a fixed amount every month with a bank or post office for a fixed tenure. Unlike a lump-sum deposit, each monthly instalment earns interest for a different length of time — the first instalment earns interest the longest, the last one the least — and that interest compounds quarterly even though your deposits happen monthly.

We use the standard Indian Banks' Association formula for RD maturity:

M = P × [(1 + i)^n − 1] / [1 − (1 + i)^(−1/3)]

P is your monthly deposit, i is the quarterly rate of interest (annual rate ÷ 4 ÷ 100), and n is the number of quarters (years × 12 ÷ 3). The −1/3 exponent is what lets the formula correctly credit interest to deposits that land between one quarterly compounding date and the next.`,
  disclaimer:
    'This is an estimate for planning purposes only. Actual RD maturity values depend on the exact compounding and rounding conventions used by your bank and may vary slightly.',
}