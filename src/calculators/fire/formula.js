// Pure function: same inputs always give the same outputs.
// It never touches the DOM or React.

export function calculate(inputs) {
  const currentAge = Number(inputs.currentAge) || 0
  const currentCorpus = Number(inputs.currentCorpus) || 0
  const monthlyInvestment = Number(inputs.monthlyInvestment) || 0
  const annualExpenses = Number(inputs.annualExpenses) || 0
  const expectedReturnRate =
    Number(inputs.expectedReturnRate) || 0
  const inflationRate =
    Number(inputs.inflationRate) || 0
  const withdrawalRate =
    Number(inputs.withdrawalRate) || 0

  // ---------------------------------------------
  // Basic validation
  // ---------------------------------------------

  if (
    currentAge <= 0 ||
    annualExpenses < 0 ||
    currentCorpus < 0 ||
    monthlyInvestment < 0 ||
    withdrawalRate <= 0
  ) {
    return {
      fireNumber: 0,
      estimatedFireAge: currentAge,
      yearsToFire: 0,
      futureAnnualExpenses: 0,
      requiredMonthlyInvestment: 0,
    }
  }

  // ---------------------------------------------
  // FIRE number
  // ---------------------------------------------
  //
  // FIRE number = annual expenses / withdrawal rate
  //
  // Example:
  // ₹10,00,000 annual expenses
  // 4% withdrawal rate
  //
  // ₹10,00,000 / 0.04 = ₹2.5 crore
  //
  // This is the target portfolio required to support
  // the specified annual spending under the selected
  // withdrawal-rate assumption.

  const withdrawalRateDecimal =
    withdrawalRate / 100

  const fireNumber =
    annualExpenses / withdrawalRateDecimal

  // ---------------------------------------------
  // Real return
  // ---------------------------------------------
  //
  // Instead of simply subtracting inflation from
  // investment returns, use the mathematically correct
  // real-return relationship:
  //
  // Real return =
  // (1 + nominal return) / (1 + inflation) - 1
  //
  // This is used to estimate whether the portfolio
  // can grow faster than purchasing-power erosion.

  const nominalReturn =
    expectedReturnRate / 100

  const inflation =
    inflationRate / 100

  const realReturn =
    (1 + nominalReturn) /
      (1 + inflation) -
    1

  // ---------------------------------------------
  // Monthly investment
  // ---------------------------------------------

  const monthlyReturn =
    expectedReturnRate / 12 / 100

  // ---------------------------------------------
  // Estimate FIRE timeline
  // ---------------------------------------------

  let corpus = currentCorpus
  let yearsToFire = 0
  let estimatedFireAge = currentAge

  const maxYears = 100

  /*
   * We project the portfolio month by month.
   *
   * Inflation increases annual expenses every year.
   * Therefore the required FIRE number also increases
   * every year.
   */

  for (
    let month = 0;
    month < maxYears * 12;
    month += 1
  ) {
    // Monthly investment is added.
    corpus += monthlyInvestment

    // Portfolio growth.
    if (monthlyReturn > 0) {
      corpus *= 1 + monthlyReturn
    }

    // At the end of each year, calculate the
    // inflation-adjusted FIRE target.
    if (
      (month + 1) % 12 === 0
    ) {
      const yearsElapsed =
        (month + 1) / 12

      const inflatedAnnualExpenses =
        annualExpenses *
        Math.pow(
          1 + inflation,
          yearsElapsed
        )

      const currentFireNumber =
        inflatedAnnualExpenses /
        withdrawalRateDecimal

      if (corpus >= currentFireNumber) {
        yearsToFire = yearsElapsed
        estimatedFireAge =
          currentAge + yearsElapsed

        break
      }
    }
  }

  // ---------------------------------------------
  // Future annual expenses
  // ---------------------------------------------

  let futureAnnualExpenses

  if (yearsToFire > 0) {
    futureAnnualExpenses =
      annualExpenses *
      Math.pow(
        1 + inflation,
        yearsToFire
      )
  } else {
    futureAnnualExpenses =
      annualExpenses
  }

  // ---------------------------------------------
  // Required monthly investment
  // ---------------------------------------------
  //
  // Calculate how much the user would need to invest
  // monthly to reach the FIRE number at a target age.
  //
  // Here we use a practical target horizon of
  // 20 years when the current investment amount
  // is insufficient to reach FIRE within the normal
  // projection window.
  //
  // If current corpus already satisfies the target,
  // required additional monthly investment is zero.

  const currentTarget =
    fireNumber

  let requiredMonthlyInvestment = 0

  if (currentCorpus < currentTarget) {
    const targetYears = 20
    const targetMonths =
      targetYears * 12

    const monthlyRate =
      expectedReturnRate / 12 / 100

    const futureValueOfCurrentCorpus =
      monthlyRate > 0
        ? currentCorpus *
          Math.pow(
            1 + monthlyRate,
            targetMonths
          )
        : currentCorpus

    const futureExpenses =
      annualExpenses *
      Math.pow(
        1 + inflation,
        targetYears
      )

    const targetCorpus =
      futureExpenses /
      withdrawalRateDecimal

    const remainingAmount =
      Math.max(
        0,
        targetCorpus -
          futureValueOfCurrentCorpus
      )

    if (remainingAmount > 0) {
      if (monthlyRate > 0) {
        const annuityFactor =
          (Math.pow(
            1 + monthlyRate,
            targetMonths
          ) - 1) /
          monthlyRate

        requiredMonthlyInvestment =
          remainingAmount /
          annuityFactor
      } else {
        requiredMonthlyInvestment =
          remainingAmount /
          targetMonths
      }
    }
  }

  // ---------------------------------------------
  // If FIRE was not reached
  // ---------------------------------------------

  if (yearsToFire === 0) {
    yearsToFire = maxYears
    estimatedFireAge =
      currentAge + maxYears
  }

  return {
    fireNumber: Math.round(fireNumber),

    estimatedFireAge:
      Math.round(estimatedFireAge),

    yearsToFire:
      Math.round(yearsToFire),

    futureAnnualExpenses:
      Math.round(futureAnnualExpenses),

    requiredMonthlyInvestment:
      Math.round(
        Math.max(
          0,
          requiredMonthlyInvestment
        )
      ),
  }
}