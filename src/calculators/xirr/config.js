export const config = {
  id: 'xirr',
  title: 'XIRR Calculator',
  shortDescription:
    'Measure your actual annualized investment return when money goes in or out on different dates.',
  category: 'Investing',

  fields: [
    {
      name: 'cashFlows',
      type: 'textarea',
      label: 'Enter your dated cash flows',
      unit: '',
      defaultValue:
        '2020-01-01, -100000\n2021-06-01, -50000\n2025-01-01, 220000',
      rows: 7,
      help:
        'One line per cash flow: YYYY-MM-DD, amount. Money invested = negative. Money received/current value = positive.',
    },
  ],

  resultFields: [
    { name: 'xirr', label: 'Annualized investment return', unit: '%', primary: true },
    { name: 'netCashFlow', label: 'Net cash flow' },
    { name: 'totalInvested', label: 'Total money invested' },
    { name: 'totalReceived', label: 'Total money received' },
  ],
}
