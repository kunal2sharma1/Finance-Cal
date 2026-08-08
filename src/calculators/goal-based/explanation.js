export const explanation = {
  heading: 'How this is calculated',
  body: `A goal-based calculation works backwards from a target: instead of asking "what will my investment grow into?", it asks "how much do I need to invest to reach a specific number?"

First, your target amount is grown for inflation if you've set an expected inflation rate above 0% (left at 0%, this step does nothing). Your current savings are then projected forward at your expected return, the same way the Lumpsum calculator grows a one-time investment. Whatever gap remains between that projected goal and your grown savings is the "required additional corpus" — the part new contributions need to cover.

That corpus is then solved for a monthly figure and an annual figure using the same future-value-of-a-series formula this project's SIP and PPF calculators use, just run in reverse:

FV = P × [((1 + i)^n − 1) / i] × (1 + i)   →   P = FV ÷ [((1 + i)^n − 1) / i] × (1 + i)

FV is the required additional corpus, i is the periodic rate of return (the annual rate ÷ 12 for the monthly figure, or the annual rate itself for the annual figure), n is the number of periods, and P is the contribution solved for. Both figures are always shown, regardless of which frequency you have selected — the frequency toggle only decides which one feeds into the total-contributions, total-returns, and projected-final-value figures below it.

If your current savings alone are already projected to grow past your target, the required investment is shown as ₹0 and the difference appears as a projected surplus instead.`,
  disclaimer:
    'This is an estimate for planning purposes only. It assumes a constant rate of return and, where used, a constant rate of inflation — actual investment returns and inflation will vary and are not guaranteed.',
}