export const config = {
  id: 'real-return',
  title: 'Real Return Calculator',
  shortDescription: 'Estimate investment return after adjusting for inflation to understand changes in purchasing power.',
  category: 'Investing & Markets',
  fields: [
    { name: 'nominalReturn', label: 'Nominal annual return', unit: '%', defaultValue: 10, min: -100, max: 100, step: 0.1 },
    { name: 'inflationRate', label: 'Inflation rate', unit: '%', defaultValue: 6, min: -50, max: 100, step: 0.1 },
  ],
  resultFields: [
    { name: 'realReturn', label: 'Estimated real return', primary: true, unit: '%' },
    { name: 'purchasingPowerFactor', label: 'Purchasing-power factor', unit: '' },
  ],
}
