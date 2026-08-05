export const explanation = {
  heading: 'How this is calculated',
  body: `A Systematic Investment Plan (SIP) means investing a fixed amount every month, usually into a mutual fund. Each month's contribution has a different amount of time to grow, which is why the total compounds faster the longer you stay invested.

We use the standard SIP future-value formula:

FV = P × [((1 + i)^n − 1) / i] × (1 + i)

P is your monthly investment, i is the monthly rate of return (annual rate ÷ 12 ÷ 100), and n is the number of months (years × 12).`,
  disclaimer:
    'This is an estimate for planning purposes only. Actual mutual fund returns are not guaranteed and will vary with market performance.',
}
