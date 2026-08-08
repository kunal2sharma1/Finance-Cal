export const explanation = {
  heading: 'How this is calculated',
  body: `This calculator estimates the corpus you'll need at retirement, projects what your current savings will grow into by then, and works out the monthly investment needed to close any gap.

Step 1 — Project your expenses to retirement. Your current monthly expenses are grown forward using expected inflation, compounding once per year for every year between now and retirement:

Expenses at retirement = Current expenses × (1 + inflation)^(years to retirement)

Step 2 — Work out the required corpus. Retirement is treated as a finite period (retirement age to life expectancy), not an amount that has to last forever. Withdrawals are assumed to rise with inflation every year of retirement, so your purchasing power stays level, while whatever remains keeps earning the post-retirement return. Discounting a payment stream that grows with inflation at the nominal post-retirement rate works out to the same thing as discounting a level stream (in year-one-of-retirement terms) at the REAL rate of return, so that's what the formula uses:

Real annual rate = (1 + post-retirement return) / (1 + inflation) − 1
Required corpus = Expenses at retirement × [(1 − (1 + i)⁻ⁿ) / i] × (1 + i)

— where i is the real rate converted to a monthly figure and n is the number of months in retirement (life expectancy − retirement age, in months).

Step 3 — Project your existing corpus. Your current retirement savings are grown to retirement age using the expected pre-retirement return, compounding once per year:

Projected existing corpus = Existing corpus × (1 + pre-retirement return)^(years to retirement)

Step 4 — Shortfall or surplus. The required corpus (Step 2) is compared against your projected existing corpus (Step 3). If the required corpus is larger, the difference is shown as the additional corpus required; if your existing corpus already covers it, the difference is shown as a surplus instead — never as a negative number.

Step 5 — Required monthly investment. If there's a shortfall, this uses the same future-value formula as this project's SIP calculator — solved for the monthly payment instead of the total — using the expected return on new monthly investments and the number of months left until retirement:

Required monthly investment = Shortfall / {[((1 + i)ⁿ − 1) / i] × (1 + i)}

Step 6 — Sustainable monthly income. As a separate reference figure, this estimates the monthly income your EXISTING savings trajectory alone (Step 3's projected corpus, before any additional investing) could sustain over your retirement duration, using the same real-rate annuity relationship as Step 2.

Contribution and withdrawal timing: every monthly cash flow in this calculator — new monthly investments before retirement, and monthly withdrawals during retirement — is assumed to happen at the START of the month, before that month's growth is applied. This matches how this project's SIP and SWP calculators already treat monthly cash flows.

Two separate return assumptions: "pre-retirement return" grows your existing corpus, while "return on new monthly investments" is used only for the new SIP this calculator recommends. They're kept separate because existing savings (e.g. EPF, PPF, older investments) are often parked more conservatively than new contributions — if that split doesn't apply to you, just enter the same value for both.

Edge cases: a retirement age at or before your current age leaves no time to invest further, so pre-retirement growth and the required monthly investment are both shown as unavailable rather than negative. A life expectancy at or before retirement age leaves no retirement period to fund, so the required corpus is shown as ₹0 rather than undefined. Either case is called out separately wherever this calculator's full result object is used.`,
  disclaimer:
    'This is an estimate for planning purposes only, built on the inflation and return assumptions you enter. Actual retirement requirements depend on your real future investment returns, inflation, spending, taxes, life events, and other personal circumstances, none of which can be predicted with certainty — revisit this calculation periodically as your situation changes.',
}