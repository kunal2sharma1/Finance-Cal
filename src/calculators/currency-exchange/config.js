export const config = {
  id: 'currency-exchange',
  title: 'Money Exchange Calculator',
  shortDescription: 'Convert money between currencies using the latest available daily exchange rate.',
  category: 'Travel & Currency',
  fields: [
    { name: 'amount', label: 'How much money do you want to exchange?', unit: '', defaultValue: 10000, min: 0, max: 100000000, step: 100 },
    { name: 'fromCurrency', label: 'From currency', type: 'currency-select', defaultValue: 'INR' },
    { name: 'toCurrency', label: 'To currency', type: 'currency-select', defaultValue: 'USD' },
  ],
  resultFields: [
    { name: 'convertedAmount', label: 'Converted amount', primary: true, type: 'dynamicCurrency' },
    { name: 'exchangeRate', label: 'Exchange rate', unit: 'rate' },
    { name: 'sourceDate', label: 'Rate date', type: 'date', unit: 'date' },
  ],
}
