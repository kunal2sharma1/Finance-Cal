export const config = {
  id: 'xirr',
  title: 'XIRR Calculator',
  shortDescription:
    'Measure your actual annualized investment return when money goes in or out on different dates.',
  category: 'Investing',

  fields: [
    {
      name: 'cashFlows',
      type: 'cashflows',
      label: 'Enter your investments and withdrawals',
      defaultValue: [
        { date: '2020-01-01', amount: '-100000' },
        { date: '2021-06-01', amount: '-50000' },
        { date: '2025-01-01', amount: '220000' },
      ],
      help:
        'Add each money movement. Use a negative amount for money you invest and a positive amount for money you receive or the current value.',
    },
  ],

  resultFields: [
    { name: 'xirr', label: 'Annualized investment return', unit: '%', primary: true },
    { name: 'netCashFlow', label: 'Net cash flow' },
    { name: 'totalInvested', label: 'Total money invested' },
    { name: 'totalReceived', label: 'Total money received' },
  ],
}
