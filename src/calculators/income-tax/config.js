const RULES = {
  taxYearLabel: 'AY 2026-27 (FY 2025-26)',
  newRegime: {
    standardDeduction: 75000,
    slabs: [
      { upTo: 400000, rate: 0 },
      { upTo: 800000, rate: 0.05 },
      { upTo: 1200000, rate: 0.10 },
      { upTo: 1600000, rate: 0.15 },
      { upTo: 2000000, rate: 0.20 },
      { upTo: 2400000, rate: 0.25 },
      { upTo: Infinity, rate: 0.30 },
    ],
    rebateThreshold: 1200000,
    rebateCap: 60000,
  },
  oldRegime: {
    standardDeduction: 50000,
    slabsByAgeCategory: {
      general: [
        { upTo: 250000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.20 },
        { upTo: Infinity, rate: 0.30 },
      ],
      senior: [
        { upTo: 300000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.20 },
        { upTo: Infinity, rate: 0.30 },
      ],
      superSenior: [
        { upTo: 500000, rate: 0 },
        { upTo: 1000000, rate: 0.20 },
        { upTo: Infinity, rate: 0.30 },
      ],
    },
    seniorAge: 60,
    superSeniorAge: 80,
    rebateThreshold: 500000,
    rebateCap: 12500,
    section80CCap: 150000,
    section80DCapGeneral: 25000,
    section80DCapSenior: 50000,
    hra: {
      assumedBasicPercentOfGross: 50,
      rentThresholdPercentOfBasic: 10,
      nonMetroRatePercentOfBasic: 40,
      metroRatePercentOfBasic: 50,
    },
  },
  surcharge: {
    slabs: [
      { threshold: 5000000, rate: 0.10 },
      { threshold: 10000000, rate: 0.15 },
      { threshold: 20000000, rate: 0.25 },
      { threshold: 50000000, rate: 0.37 },
    ],
    newRegimeMaxRate: 0.25,
  },
  cessRate: 0.04,
}

export const config = {
  id: 'income-tax',
  title: 'Income Tax Calculator',
  shortDescription: 'Compare your estimated tax under the Old and New Regimes and see which may cost less.',
  category: 'Tax',
  taxYear: RULES.taxYearLabel,
  modelingNote: 'HRA is illustrated using an assumed basic-salary share of gross salary. Actual HRA exemption depends on salary components and applicable rules, so treat this as an estimate rather than a filing calculation.',
  fields: [
    { name: 'annualGrossSalary', label: 'What is your yearly gross salary?', unit: '₹', defaultValue: 1200000, min: 0, max: 100000000, step: 10000 },
    { name: 'otherIncomeAnnual', label: 'Do you have income from interest, rent, or other sources? (Enter yearly amount)', unit: '₹', defaultValue: 0, min: 0, max: 10000000, step: 5000 },
    { name: 'age', label: 'How old are you?', unit: 'years', defaultValue: 30, min: 18, max: 100, step: 1 },
    { name: 'section80C', label: 'Eligible 80C investments (for example PF, ELSS, or life insurance)', unit: '₹', defaultValue: 150000, min: 0, max: RULES.oldRegime.section80CCap, step: 5000 },
    { name: 'section80D', label: 'Health-insurance premiums you paid', unit: '₹', defaultValue: 25000, min: 0, max: RULES.oldRegime.section80DCapSenior, step: 1000 },
    { name: 'hraReceivedAnnual', label: 'HRA received each year (if your salary includes HRA)', unit: '₹', defaultValue: 240000, min: 0, max: 5000000, step: 5000 },
    { name: 'rentPaidAnnual', label: 'Rent you pay each year', unit: '₹', defaultValue: 180000, min: 0, max: 5000000, step: 5000 },
    { name: 'hraCityRate', label: 'HRA city type: 50% for metro, 40% for other cities', unit: '%', defaultValue: RULES.oldRegime.hra.nonMetroRatePercentOfBasic, min: RULES.oldRegime.hra.nonMetroRatePercentOfBasic, max: RULES.oldRegime.hra.metroRatePercentOfBasic, step: 10 },
    { name: 'otherOldRegimeDeductions', label: 'Other Old-Regime deductions you can legally claim', unit: '₹', defaultValue: 0, min: 0, max: 500000, step: 5000 },
  ],
  resultFields: [
    { name: 'recommendedRegimeTax', label: 'Estimated tax under the lower-tax regime', primary: true },
    { name: 'grossTotalIncome', label: 'Total income before deductions' },
    { name: 'oldRegimeDeductions', label: 'Old Regime deductions used' },
    { name: 'oldRegimeTaxableIncome', label: 'Old Regime income that is taxed' },
    { name: 'oldRegimeTotalTax', label: 'Old Regime total tax' },
    { name: 'newRegimeDeductions', label: 'New Regime deductions used' },
    { name: 'newRegimeTaxableIncome', label: 'New Regime income that is taxed' },
    { name: 'newRegimeTotalTax', label: 'New Regime total tax' },
    { name: 'taxSavingsBetterRegime', label: 'Estimated tax saved by choosing the lower-tax regime' },
    { name: 'recommendedRegimeMonthlyTax', label: 'Estimated monthly tax under the lower-tax regime' },
  ],
}

export { RULES }
