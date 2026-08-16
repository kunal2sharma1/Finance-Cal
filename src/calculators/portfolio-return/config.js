export const config = {
  id: 'portfolio-return',
  title: 'Portfolio Return Calculator',
  shortDescription:
    'Combine several investments to see how your overall portfolio has performed.',
  category: 'Investing & Markets',

  fields: [
    {
      name: 'assets',
      type: 'textarea',
      label: 'Enter your investments',
      unit: '',
      defaultValue:
        'Stocks, 200000, 240000\nMutual Funds, 300000, 360000\nGold, 100000, 115000',
      rows: 7,
      help:
        'One line per investment: Name, amount invested, current value.',
    },
  ],

  resultFields: [
    { name: 'totalInvested', label: 'Total money invested', primary: true },
    { name: 'currentValue', label: 'Current portfolio value' },
    { name: 'gainOrLoss', label: 'Overall gain or loss' },
    { name: 'returnPercent', label: 'Overall portfolio return', unit: '%' },
  ],
}
