export const config = {
  id: 'job-offer-comparison',
  title: 'Job Offer Comparison Calculator',
  shortDescription:
    'Compare two job offers using estimated take-home pay and the value of major costs and benefits.',
  category: 'Salary & Employment',

  fields: [
    { name: 'offerACTC', label: 'Offer A annual CTC', unit: '₹', defaultValue: 1200000, min: 0, max: 100000000, step: 10000 },
    { name: 'offerATakeHomeMonthly', label: 'Offer A estimated monthly take-home', unit: '₹', defaultValue: 80000, min: 0, max: 5000000, step: 1000 },
    { name: 'offerARentMonthly', label: 'Offer A extra monthly rent/relocation cost', unit: '₹', defaultValue: 10000, min: 0, max: 500000, step: 500 },
    { name: 'offerATransportMonthly', label: 'Offer A monthly commute cost', unit: '₹', defaultValue: 3000, min: 0, max: 200000, step: 500 },
    { name: 'offerBCTC', label: 'Offer B annual CTC', unit: '₹', defaultValue: 1100000, min: 0, max: 100000000, step: 10000 },
    { name: 'offerBTakeHomeMonthly', label: 'Offer B estimated monthly take-home', unit: '₹', defaultValue: 75000, min: 0, max: 5000000, step: 1000 },
    { name: 'offerBRentMonthly', label: 'Offer B extra monthly rent/relocation cost', unit: '₹', defaultValue: 5000, min: 0, max: 500000, step: 500 },
    { name: 'offerBTransportMonthly', label: 'Offer B monthly commute cost', unit: '₹', defaultValue: 2000, min: 0, max: 200000, step: 500 },
  ],

  resultFields: [
    { name: 'offerAUsableAnnualMoney', label: 'Offer A estimated usable money after listed costs', primary: true },
    { name: 'offerBUsableAnnualMoney', label: 'Offer B estimated usable money after listed costs' },
    { name: 'difference', label: 'Estimated yearly difference' },
  ],
}
