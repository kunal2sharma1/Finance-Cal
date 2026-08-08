export const explanation = {
  heading: 'How this is calculated',
  body: `Eligibility here is based on FOIR (Fixed Obligation to Income Ratio) — the share of your monthly income a lender is willing to let go toward all EMIs and fixed obligations combined, including the new loan you're asking about.

First, we work out the maximum total EMI your income can support at the selected FOIR:

Maximum affordable EMI = Monthly income × FOIR

Then we subtract what's already committed — your existing EMI plus any other fixed obligations — to see how much room is left for a new EMI:

Maximum new EMI = Maximum affordable EMI − Existing EMI − Other obligations

If existing obligations already use up the affordable EMI, or more, the maximum new EMI is ₹0, never negative — and the eligible loan amount is ₹0 too.

Finally, we run the standard reducing-balance EMI formula in reverse — the same formula this project's EMI calculator uses, just solved for the loan principal a lender could offer for that EMI, instead of solving for the EMI a given loan would cost:

P = EMI × [(1 + r)^n − 1] / [r × (1 + r)^n]

P is the eligible loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly instalments (loan tenure in years × 12). At 0% interest, the eligible amount is simply the maximum new EMI multiplied by the number of months.`,
  disclaimer:
    'This is an estimate for planning purposes only, not a loan offer or a guarantee of approval. FOIR is an assumption that varies from lender to lender — actual eligibility also depends on credit score, age, employment type, income stability, lender policy, documentation, property value, loan-to-value ratio, and other factors a lender evaluates individually.',
}