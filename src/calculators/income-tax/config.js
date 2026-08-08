// Config files describe WHAT a calculator looks like — its inputs and
// outputs — but never do any math. That lives in formula.js.
//
// ONE DELIBERATE DEPARTURE from that rule for THIS calculator: income tax
// slabs, rebates, surcharge bands and section caps are also defined here
// (in the RULES block below) rather than as bare numbers inside
// formula.js. Tax law changes every Union Budget, so keeping every
// number that the law controls in one clearly-labelled, commented block
// means a future financial year's rules can be dropped in by editing
// this file only — formula.js never needs to change. This mirrors the
// spirit of this project's PPF calculator, which keeps government-set
// numbers in config.js for the same reason.
//
// ============================================================================
// TAX YEAR IN USE — READ THIS BEFORE TRUSTING A NUMBER
// ============================================================================
// Financial Year modelled : FY 2025-26 (1 Apr 2025 - 31 Mar 2026)
// Assessment Year          : AY 2026-27
// Source                   : Union Budget 2025 (presented 1 Feb 2025),
//                            Finance Act 2025 — new-regime slabs, the
//                            raised Section 87A rebate ceiling, and the
//                            new-regime surcharge cap. Old-regime slabs,
//                            80C/80D caps, HRA rules, surcharge slabs and
//                            the 4% cess are long-standing provisions that
//                            were unchanged by that Budget.
//
// This calculator was built on 8 Aug 2026, which falls in FY 2026-27
// (AY 2027-28) — the Union Budget for FY 2026-27 (presented ~1 Feb 2026)
// is what actually governs that year, and its contents are after the
// knowledge cutoff of the assistant that wrote this file. Rather than
// guess whether FY 2026-27 changed any of the numbers below, this
// calculator explicitly uses the last FY whose rules are confirmed
// (FY 2025-26) and flags that fact here, in explanation.js, and in the
// chat response this file shipped with.
//
// TO UPDATE FOR A NEW FINANCIAL YEAR: change TAX_YEAR_LABEL below and
// edit the RULES block to match the new Budget. Nothing in formula.js
// needs to change as long as the shape of RULES stays the same.
// ============================================================================

const TAX_YEAR_LABEL = 'FY 2025-26 (AY 2026-27)'

// upTo values are cumulative upper bounds on taxable income (₹), not
// bracket widths — the last bracket's Infinity means "and above". rate is
// the slab rate as a decimal (0.05 = 5%). formula.js walks these in order.
const RULES = {
  taxYearLabel: TAX_YEAR_LABEL,

  newRegime: {
    // Standard deduction available to salaried/pensioner taxpayers only
    // (this calculator assumes a salaried taxpayer throughout, per the
    // "most important common salaried-tax scenarios" scope Kunal asked
    // for — see TAX ASSUMPTIONS in the chat response).
    standardDeduction: 75000,
    // Same slabs for every age group — the new regime does not give
    // senior/super-senior citizens a higher basic exemption.
    slabs: [
      { upTo: 400000, rate: 0 },
      { upTo: 800000, rate: 0.05 },
      { upTo: 1200000, rate: 0.1 },
      { upTo: 1600000, rate: 0.15 },
      { upTo: 2000000, rate: 0.2 },
      { upTo: 2400000, rate: 0.25 },
      { upTo: Infinity, rate: 0.3 },
    ],
    // Section 87A: taxable income up to this threshold pays ₹0 tax
    // (rebate capped at rebateCap, which is exactly the tax due at the
    // threshold, so the two numbers are designed to zero out together).
    // Just above the threshold, marginal relief applies — see
    // applyRebateWithMarginalRelief() in formula.js.
    rebateThreshold: 1200000,
    rebateCap: 60000,
  },

  oldRegime: {
    standardDeduction: 50000,
    // Only the basic exemption slab changes by age category; 5/20/30%
    // rates are the same once past it (super seniors skip the 5% band
    // entirely because their exemption already covers ₹0-5,00,000).
    slabsByAgeCategory: {
      general: [
        { upTo: 250000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      senior: [
        { upTo: 300000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      superSenior: [
        { upTo: 500000, rate: 0 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
    },
    seniorAge: 60, // age >= this uses the "senior" slab
    superSeniorAge: 80, // age >= this uses the "superSenior" slab
    rebateThreshold: 500000,
    rebateCap: 12500,

    section80CCap: 150000,
    section80DCapGeneral: 25000, // taxpayer's own age < seniorAge
    section80DCapSenior: 50000, // taxpayer's own age >= seniorAge
    // NOTE: the enhanced ₹50,000 cap available specifically for premium
    // paid on senior-citizen PARENTS isn't modelled — see TAX ASSUMPTIONS.

    hra: {
      // Used to derive Basic+DA from gross salary, since this calculator
      // (matching every other calculator in this project) only collects
      // one salary figure rather than a separate basic-pay field. This
      // is a named, adjustable assumption, not a silent guess — see
      // TAX ASSUMPTIONS in the chat response for the trade-off.
      assumedBasicPercentOfGross: 50,
      rentThresholdPercentOfBasic: 10,
      nonMetroRatePercentOfBasic: 40,
      metroRatePercentOfBasic: 50,
    },
  },

  // Surcharge applies identically to both regimes up to ₹2 crore. Above
  // that, the new regime's surcharge is capped at 25% (it never reaches
  // the old regime's 37% top band) — a deliberate Budget 2023 change that
  // was still in force as of this calculator's last confirmed knowledge.
  surcharge: {
    slabs: [
      { threshold: 5000000, rate: 0.1 },
      { threshold: 10000000, rate: 0.15 },
      { threshold: 20000000, rate: 0.25 },
      { threshold: 50000000, rate: 0.37 },
    ],
    newRegimeMaxRate: 0.25,
  },

  cessRate: 0.04, // Health & Education Cess, on tax + surcharge, both regimes
}

export const config = {
  id: 'income-tax',
  title: 'Income Tax Calculator (Old vs New Regime)',
  shortDescription:
    'Compare Old vs New Regime tax for a salaried income and see which is lower.',
  category: 'Tax',

  fields: [
    {
      name: 'annualGrossSalary',
      label: 'Annual gross salary',
      unit: '₹',
      defaultValue: 1200000,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      name: 'otherIncomeAnnual',
      label: 'Income from other sources (interest, rent, etc.)',
      unit: '₹',
      defaultValue: 0,
      min: 0,
      max: 10000000,
      step: 5000,
    },
    {
      name: 'age',
      label: 'Age',
      unit: 'years',
      defaultValue: 30,
      min: 18,
      max: 100,
      step: 1,
    },
    {
      name: 'section80C',
      label: 'Section 80C investments (PF, ELSS, life insurance, etc.)',
      unit: '₹',
      // Defaults to the statutory cap, same convention as this project's
      // PPF calculator: most people modelling 80C model the full limit.
      defaultValue: 150000,
      min: 0,
      max: RULES.oldRegime.section80CCap,
      step: 5000,
    },
    {
      name: 'section80D',
      label: 'Section 80D health insurance premium',
      unit: '₹',
      defaultValue: 25000,
      min: 0,
      // Slider ceiling is the higher (senior-citizen) cap; formula.js
      // applies the correct age-based cap, since the UI has no way to
      // make this field's own max depend on the separate age field.
      max: RULES.oldRegime.section80DCapSenior,
      step: 1000,
    },
    {
      name: 'hraReceivedAnnual',
      label: 'HRA received annually (Old Regime only)',
      unit: '₹',
      defaultValue: 240000,
      min: 0,
      max: 5000000,
      step: 5000,
    },
    {
      name: 'rentPaidAnnual',
      label: 'Rent paid annually (Old Regime only)',
      unit: '₹',
      defaultValue: 180000,
      min: 0,
      max: 5000000,
      step: 5000,
    },
    {
      name: 'hraCityRate',
      label:
        'HRA city category — enter 50 for a metro (Delhi, Mumbai, Kolkata, Chennai), 40 for any other city',
      unit: '%',
      defaultValue: RULES.oldRegime.hra.nonMetroRatePercentOfBasic,
      min: RULES.oldRegime.hra.nonMetroRatePercentOfBasic,
      max: RULES.oldRegime.hra.metroRatePercentOfBasic,
      step: 10,
    },
    {
      name: 'otherOldRegimeDeductions',
      label:
        'Other Old Regime deductions (home loan interest 24(b), NPS 80CCD(1B), etc.)',
      unit: '₹',
      defaultValue: 0,
      min: 0,
      max: 500000,
      step: 5000,
    },
  ],

  // Every value here is rendered by ResultPanel.jsx through its
  // formatCurrency() — always ₹, always 0 decimal places, no percentages
  // or text. So every name below must resolve to a genuine, non-negative
  // ₹ amount. Effective tax rate and the "which regime wins" verdict are
  // still computed by formula.js (see its return value) but are
  // deliberately left out of this list — see the comment above that
  // return statement for why, and TAX ASSUMPTIONS in the chat response.
  resultFields: [
    { name: 'recommendedRegimeTax', label: 'Recommended regime — total tax payable', primary: true },
    { name: 'grossTotalIncome', label: 'Gross total income' },
    { name: 'oldRegimeDeductions', label: 'Old Regime — deductions & exemptions' },
    { name: 'oldRegimeTaxableIncome', label: 'Old Regime — taxable income' },
    { name: 'oldRegimeTaxBeforeRebate', label: 'Old Regime — tax before rebate & cess' },
    { name: 'oldRegimeRebate', label: 'Old Regime — rebate (Section 87A)' },
    { name: 'oldRegimeCess', label: 'Old Regime — health & education cess' },
    { name: 'oldRegimeTotalTax', label: 'Old Regime — total tax liability' },
    { name: 'newRegimeDeductions', label: 'New Regime — deductions (standard deduction)' },
    { name: 'newRegimeTaxableIncome', label: 'New Regime — taxable income' },
    { name: 'newRegimeTaxBeforeRebate', label: 'New Regime — tax before rebate & cess' },
    { name: 'newRegimeRebate', label: 'New Regime — rebate (Section 87A)' },
    { name: 'newRegimeCess', label: 'New Regime — health & education cess' },
    { name: 'newRegimeTotalTax', label: 'New Regime — total tax liability' },
    { name: 'taxSavingsBetterRegime', label: 'Tax savings with the better regime' },
    { name: 'recommendedRegimeMonthlyTax', label: 'Estimated monthly tax (recommended regime)' },
  ],
}

// Exported so formula.js (same folder — not a shared component) can use
// the exact same numbers this file documents, with no duplication.
export { RULES }