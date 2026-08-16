export const config = {
  id: 'stock-average-price',
  title: 'Stock Average Price Calculator',
  shortDescription:
    'Find your new average buying price after adding more shares at a different price.',
  category: 'Investing & Markets',

  fields: [
    { name: 'existingQuantity', label: 'How many shares do you already own?', unit: 'shares', defaultValue: 100, min: 0, max: 100000000, step: 1 },
    { name: 'existingAveragePrice', label: 'Your current average buying price', unit: '₹', defaultValue: 100, min: 0, max: 10000000, step: 0.01 },
    { name: 'newQuantity', label: 'How many more shares will you buy?', unit: 'shares', defaultValue: 50, min: 0, max: 100000000, step: 1 },
    { name: 'newPrice', label: 'Price of the new shares', unit: '₹', defaultValue: 80, min: 0, max: 10000000, step: 0.01 },
  ],

  resultFields: [
    { name: 'newAveragePrice', label: 'New average buying price', primary: true },
    { name: 'totalQuantity', label: 'Total shares after the new purchase' },
    { name: 'totalInvested', label: 'Total money invested' },
  ],
}
