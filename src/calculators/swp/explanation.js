export const explanation = {
  heading: 'How this is calculated',
  body: `A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount every month from an existing lump-sum corpus, while the rest stays invested and keeps earning returns.

We simulate this one month at a time. Each month, the withdrawal is taken out of the corpus first, and the expected annual return — converted to a monthly rate — is then applied to whatever remains. This repeats for every month in your chosen period.

Monthly rate = annual return ÷ 12 ÷ 100

If withdrawals are large enough to use up the corpus before your period ends, withdrawals simply stop once the balance reaches ₹0 — the remaining corpus is never shown as negative.`,
  disclaimer:
    'This is an estimate for planning purposes only. Actual returns are not guaranteed and will vary with market performance.',
}