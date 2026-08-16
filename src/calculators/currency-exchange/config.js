const currencies = [
  { value: 'INR', label: '🇮🇳 Indian Rupee (INR)' },
  { value: 'USD', label: '🇺🇸 US Dollar (USD)' },
  { value: 'EUR', label: '🇪🇺 Euro (EUR)' },
  { value: 'GBP', label: '🇬🇧 British Pound (GBP)' },
  { value: 'AED', label: '🇦🇪 UAE Dirham (AED)' },
  { value: 'CAD', label: '🇨🇦 Canadian Dollar (CAD)' },
  { value: 'AUD', label: '🇦🇺 Australian Dollar (AUD)' },
  { value: 'SGD', label: '🇸🇬 Singapore Dollar (SGD)' },
  { value: 'JPY', label: '🇯🇵 Japanese Yen (JPY)' },
  { value: 'CNY', label: '🇨🇳 Chinese Yuan (CNY)' },
  { value: 'CHF', label: '🇨🇭 Swiss Franc (CHF)' },
  { value: 'NZD', label: '🇳🇿 New Zealand Dollar (NZD)' },
  { value: 'HKD', label: '🇭🇰 Hong Kong Dollar (HKD)' },
  { value: 'SAR', label: '🇸🇦 Saudi Riyal (SAR)' },
  { value: 'ZAR', label: '🇿🇦 South African Rand (ZAR)' },
  { value: 'THB', label: '🇹🇭 Thai Baht (THB)' },
  { value: 'MYR', label: '🇲🇾 Malaysian Ringgit (MYR)' },
  { value: 'NOK', label: '🇳🇴 Norwegian Krone (NOK)' },
  { value: 'SEK', label: '🇸🇪 Swedish Krona (SEK)' },
  { value: 'DKK', label: '🇩🇰 Danish Krone (DKK)' },
]

export const config = {
  id: 'currency-exchange',
  title: 'Money Exchange Calculator',
  shortDescription: 'Convert money between major currencies using the latest available daily exchange rate.',
  category: 'Travel & Currency',
  fields: [
    { name: 'amount', label: 'How much money do you want to exchange?', unit: '', defaultValue: 10000, min: 0, max: 100000000, step: 100 },
    { name: 'fromCurrency', label: 'From currency', type: 'select', defaultValue: 'INR', options: currencies },
    { name: 'toCurrency', label: 'To currency', type: 'select', defaultValue: 'USD', options: currencies },
  ],
  resultFields: [
    { name: 'convertedAmount', label: 'Converted amount', primary: true, type: 'dynamicCurrency' },
    { name: 'exchangeRate', label: 'Exchange rate', unit: 'rate' },
    { name: 'sourceDate', label: 'Rate date', unit: 'date' },
  ],
}
