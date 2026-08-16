export const config = {
  id: 'bond-return',
  title: 'Bond Return Calculator',
  shortDescription: 'Estimate bond value, coupon income, capital gain or loss and total return from simple bond assumptions.',
  category: 'Investing & Markets',
  fields: [
    { name: 'faceValue', label: 'Face value', unit: '₹', defaultValue: 100000, min: 0, max: 100000000, step: 1000 },
    { name: 'purchasePrice', label: 'Purchase price', unit: '₹', defaultValue: 98000, min: 0, max: 100000000, step: 1000 },
    { name: 'couponRate', label: 'Annual coupon rate', unit: '%', defaultValue: 7, min: 0, max: 100, step: 0.1 },
    { name: 'yearsHeld', label: 'Years held', unit: 'years', defaultValue: 3, min: 0, max: 100, step: 0.1 },
    { name: 'salePrice', label: 'Sale price', unit: '₹', defaultValue: 101000, min: 0, max: 100000000, step: 1000 },
  ],
  resultFields: [
    { name: 'couponIncome', label: 'Coupon income', primary: true, unit: '₹' },
    { name: 'capitalGain', label: 'Capital gain / loss', unit: '₹' },
    { name: 'totalReturn', label: 'Total return', unit: '₹' },
    { name: 'totalReturnRate', label: 'Total return on purchase price', unit: '%' },
  ],
}
