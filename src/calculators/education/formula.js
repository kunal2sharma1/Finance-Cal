// Pure function: same inputs always give the same outputs.
// It never touches the DOM or React.

export function calculate(inputs) {
  const childAge = Number(inputs.childAge) || 0
  const educationStartAge =
    Number(inputs.educationStartAge) || 0
  const currentEducationCost =
    Number(inputs.currentEducationCost) || 0
  const educationDuration =
    Number(inputs.educationDuration) || 0
  const educationInflationRate =
    Number(inputs.educationInflationRate) || 0
  const currentSavings =
    Number(inputs.currentSavings) || 0
  const monthlyInvestment =
    Number(inputs.monthlyInvestment) || 0
  const expectedReturnRate =
    Number(inputs.expectedReturnRate) || 0

  // ---------------------------------------------
  // Basic validation
  // ---------------------------------------------

  if (
    educationStartAge <= childAge ||
    currentEducationCost < 0 ||
    currentSavings < 0 ||
    monthlyInvestment < 0 ||
    educationDuration <= 0
  ) {
    return {
      futureEducationCost: 0,
      totalEducationCorpus: 0,
      futureSavings: 0,
      futureInvestments: 0,
      fundingShortfall: 0,
      requiredMonthlyInvestment: 0,
    }
  }

  // ---------------------------------------------
  // Years until education begins
  // ---------------------------------------------

  const yearsToEducation =
    educationStartAge - childAge

  const monthsToEducation =
    yearsToEducation * 12

  // ---------------------------------------------
  // Future education cost
  // ---------------------------------------------
  //
  // Future cost =
  // Current cost × (1 + inflation)^years
  //
  // This estimates the cost at the time education
  // begins.

  const inflationRate =
    educationInflationRate / 100

  const futureEducationCost =
    currentEducationCost *
    Math.pow(
      1 + inflationRate,
      yearsToEducation
    )

  // ---------------------------------------------
  // Total education corpus
  // ---------------------------------------------
  //
  // The current education cost is treated as the
  // cost of the complete education program today.
  //
  // The same inflation-adjusted amount is therefore
  // used as the planning corpus required at the
  // education start date.
  //
  // If the education lasts multiple years, this is
  // a simplified planning estimate rather than a
  // year-by-year tuition schedule.

  const totalEducationCorpus =
    futureEducationCost

  // ---------------------------------------------
  // Investment growth assumptions
  // ---------------------------------------------

  const monthlyReturnRate =
    expectedReturnRate / 12 / 100

  // ---------------------------------------------
  // Future value of current savings
  // ---------------------------------------------

  let futureSavings

  if (monthlyReturnRate === 0) {
    futureSavings = currentSavings
  } else {
    futureSavings =
      currentSavings *
      Math.pow(
        1 + monthlyReturnRate,
        monthsToEducation
      )
  }

  // ---------------------------------------------
  // Future value of monthly investments
  // ---------------------------------------------
  //
  // Contributions are assumed to be made at the
  // beginning of each month.

  let futureInvestments

  if (monthlyReturnRate === 0) {
    futureInvestments =
      monthlyInvestment *
      monthsToEducation
  } else {
    futureInvestments =
      monthlyInvestment *
      (
        (
          Math.pow(
            1 + monthlyReturnRate,
            monthsToEducation
          ) - 1
        ) /
        monthlyReturnRate
      ) *
      (1 + monthlyReturnRate)
  }

  // ---------------------------------------------
  // Projected funding
  // ---------------------------------------------

  const projectedFunding =
    futureSavings +
    futureInvestments

  const fundingShortfall =
    Math.max(
      0,
      totalEducationCorpus -
        projectedFunding
    )

  // ---------------------------------------------
  // Required monthly investment
  // ---------------------------------------------
  //
  // Calculate the additional monthly investment
  // required from today to fully fund the future
  // education corpus.
  //
  // Existing savings are included first.

  const amountRequiredFromInvestments =
    Math.max(
      0,
      totalEducationCorpus -
        futureSavings
    )

  let requiredMonthlyInvestment = 0

  if (amountRequiredFromInvestments > 0) {
    if (monthlyReturnRate === 0) {
      requiredMonthlyInvestment =
        amountRequiredFromInvestments /
        monthsToEducation
    } else {
      const annuityFactor =
        (
          Math.pow(
            1 + monthlyReturnRate,
            monthsToEducation
          ) - 1
        ) /
        monthlyReturnRate

      requiredMonthlyInvestment =
        amountRequiredFromInvestments /
        (annuityFactor * (1 + monthlyReturnRate))
    }
  }

  // ---------------------------------------------
  // Results
  // ---------------------------------------------

  return {
    futureEducationCost:
      Math.round(
        Math.max(
          0,
          futureEducationCost
        )
      ),

    totalEducationCorpus:
      Math.round(
        Math.max(
          0,
          totalEducationCorpus
        )
      ),

    futureSavings:
      Math.round(
        Math.max(
          0,
          futureSavings
        )
      ),

    futureInvestments:
      Math.round(
        Math.max(
          0,
          futureInvestments
        )
      ),

    fundingShortfall:
      Math.round(
        fundingShortfall
      ),

    requiredMonthlyInvestment:
      Math.round(
        Math.max(
          0,
          requiredMonthlyInvestment
        )
      ),
  }
}