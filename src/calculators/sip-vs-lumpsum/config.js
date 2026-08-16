export const config = {
  id: 'sip-vs-lumpsum',
  title: 'SIP vs One-Time Investment Calculator',
  shortDescription:
    'Compare investing a large amount now with investing regularly over time.',
  category: 'Investing',

  fields: [
    { name: 'lumpsumAmount', label: 'How much could you invest as a one-time amount?', unit: '₹', defaultValue: 500000, min: 0, max: 100000000, step: 5000 },
    { name: 'sipAmount', label: 'How much could you invest each month instead?', unit: '₹', defaultValue: 25000, min: 0, max: 500000, step: 500 },
    { name: 'annualReturnRate', label: 'Expected yearly return', unit: '%', defaultValue: 12, min: 0, max: 30, step: 0.5 },
    { name: 'years', label: 'How long will the money stay invested?', unit: 'years', defaultValue: 10, min: 1, max: 40, step: 1 },
  ],

  resultFields: [
    { name: 'lumpsumFinalValue', label: 'Estimated value of the one-time investment', primary: true },
    { name: 'sipFinalValue', label: 'Estimated value of the monthly SIP' },
    { name: 'difference', label: 'Difference between the two outcomes' },
    { name: 'lumpsumGain', label: 'Estimated growth from the one-time investment' },
    { name: 'sipGain', label: 'Estimated growth from the SIP' },
  ],
}
