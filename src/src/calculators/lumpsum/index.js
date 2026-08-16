export const config = {
  id: 'lumpsum',
  title: 'Lumpsum Investment Calculator',
  shortDescription: 'See what a one-time investment could grow into.',
  category: 'Investing',
  fields: [
    {
      name: 'investmentAmount',
      label: 'Investment amount',
      unit: '₹',
      defaultValue: 100000,
      min: 1000,
      max: 50000000,
      step: 1000,
    },
    {
      name: 'annualReturnRate',
      label: 'Expected annual return',
      unit: '%',
      defaultValue: 8.5,
      min: 1,
      max: 30,
      step: 0.5,
    },
    {
      name: 'years',
      label: 'Investment period',
      unit: 'years',
      defaultValue: 10,
      min: 1,
      max: 40,
      step: 1,
    },
  ],
  resultFields: [
    { name: 'totalValue', label: 'Total value', primary: true },
    { name: 'totalInvested', label: 'Amount invested' },
    { name: 'totalReturns', label: 'Wealth gained' },
  ],
}

export function calculate(inputs) {
  const investmentAmount = Number(inputs.investmentAmount) || 0
  const annualReturnRate = Number(inputs.annualReturnRate) || 0
  const years = Number(inputs.years) || 0
  const annualRate = annualReturnRate / 100
  const totalValue = investmentAmount * Math.pow(1 + annualRate, years)
  const totalInvested = investmentAmount
  const totalReturns = totalValue - totalInvested

  return {
    totalValue: Math.round(totalValue),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
  }
}

export const explanation = {
  heading: 'How this is calculated',
  body: `A lumpsum investment means investing a one-time amount and leaving it invested for a fixed period.

We use the standard compound-growth formula:

FV = P × (1 + r)^t

P is the initial investment, r is the annual rate of return divided by 100, and t is the investment period in years. The estimated wealth gained is the final value minus the original investment.`,
  disclaimer:
    'This is an estimate for planning purposes only. Investment returns are not guaranteed and actual results will vary with market performance.',
}
