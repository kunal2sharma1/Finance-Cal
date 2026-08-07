export const explanation = {
  heading: 'How this is calculated',

  body: `The Employees' Provident Fund (EPF) is a retirement savings scheme where both the employee and employer make contributions based on the applicable EPF contribution wage.


For this calculator, we estimate the future EPF balance by starting with your current EPF balance and adding monthly employee contributions, the employer's EPF contribution, and estimated interest.


The standard employee contribution used here is 12% of the applicable contribution wage. The standard employer contribution is also 12%, but the employer contribution is generally divided between EPF and EPS. The EPF portion used in this calculator is 3.67%, while the EPS portion is kept separate and is not added to the projected EPF corpus.


For the standard calculation, the contribution wage is capped at the statutory wage ceiling of ₹15,000 per month.


The projection increases the monthly salary once each year according to the annual salary-growth assumption. Monthly interest is estimated using the selected annual EPF interest rate divided by 12.


The projected EPF corpus is therefore based on:


Starting EPF balance + employee contributions + employer EPF contributions + estimated interest.


Employer EPS contributions are not included in the EPF corpus because EPS is a separate pension component.`,

  disclaimer:
    'This is an estimate for financial planning purposes only. Actual EPF contributions, EPS allocation, interest crediting, applicable wage ceilings, eligibility and future EPF interest rates may differ according to EPFO rules and government notifications.',
}