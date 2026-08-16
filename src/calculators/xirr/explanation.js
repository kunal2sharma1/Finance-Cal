export const explanation = {
  heading: 'What this calculator is doing',
  body: `XIRR is useful when you invest or withdraw money on different dates instead of making one fixed investment.

Enter one cash flow per line in the form:
YYYY-MM-DD, amount

Use negative amounts for money you put in and positive amounts for money you receive or the current value.

The calculator finds the annual return rate that makes those dated cash flows balance out. This is more appropriate than a simple return percentage when the timing of your investments matters.

Example:
2020-01-01, -100000
2021-06-01, -50000
2025-01-01, 220000`,
  disclaimer:
    'XIRR is an annualized mathematical measure based on the cash flows you enter. It does not guarantee future returns.',
}
