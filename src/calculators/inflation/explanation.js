export const explanation = {
  heading: 'How this is calculated',
  body: `Inflation is the rate at which prices rise over time, so the same amount of money buys a little less with each year that passes. This calculator works in both directions from one pair of numbers: an expected annual inflation rate and a number of years.

Future value — what today's money will cost you later:

Future Amount = Current Amount × (1 + inflation rate)^years

Present value — what a future amount is really worth in today's money:

Present Value = Future Amount ÷ (1 + inflation rate)^years

In both formulas, the inflation rate is the expected annual rate written as a decimal (6% becomes 0.06), and years is the length of the period. Both calculations always run together, so you'll see both results update no matter which amount you're focused on.

Three terms are easy to blur together here. The nominal amount is just the number on the note or the payslip — it doesn't account for inflation at all. Purchasing power is what that number can actually buy — how far it really goes. An inflation-adjusted amount (sometimes called a "real" amount) restates a nominal figure in a specific year's buying power, which is what makes it possible to fairly compare a rupee today with a rupee from a different year.`,
  disclaimer:
    'This is an estimate for planning purposes only. Inflation projections are not guaranteed — actual inflation varies from year to year, and this calculator assumes one constant rate for the entire period rather than the ups and downs a real economy goes through.',
}