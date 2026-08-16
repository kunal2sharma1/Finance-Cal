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
        { date: '2020-01-01', direction: 'invested', amount: '100000' },
        { date: '2021-06-01', direction: 'invested', amount: '50000' },
        { date: '2025-01-01', direction: 'received', amount: '220000' },
      ],
      help:
        'Pick a date, choose whether the money was invested or received, and enter the amount. You do not need to type negative numbers.',
    },
  ],

  resultFields: [
    { name: 'xirr', label: 'Annualized investment return', unit: '%', primary: true },
    { name: 'netCashFlow', label: 'Net cash flow' },
    { name: 'totalInvested', label: 'Total money invested' },
    { name: 'totalReceived', label: 'Total money received' },
  ],
}
