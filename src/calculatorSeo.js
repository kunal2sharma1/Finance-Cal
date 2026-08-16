const SEO = {
  sip: {
    title: 'SIP Calculator – Estimate SIP Returns & Investment Growth | FinCalc',
    description: 'Estimate SIP maturity value, total investment and potential returns using your monthly investment, expected return and time period.'
  },
  lumpsum: {
    title: 'Lump Sum Calculator – Estimate Investment Growth & Returns | FinCalc',
    description: 'Estimate how a one-time investment could grow over time using the amount invested, expected return and investment period.'
  },
  cagr: {
    title: 'CAGR Calculator – Calculate Compound Annual Growth Rate | FinCalc',
    description: 'Calculate CAGR from an initial value, final value and investment period to understand annualized growth.'
  },
  fd: {
    title: 'FD Calculator – Estimate Fixed Deposit Maturity & Interest | FinCalc',
    description: 'Estimate fixed deposit maturity amount and interest using deposit amount, rate and tenure.'
  },
  rd: {
    title: 'RD Calculator – Estimate Recurring Deposit Maturity | FinCalc',
    description: 'Estimate recurring deposit maturity and interest from your monthly deposit, interest rate and tenure.'
  },
  ppf: {
    title: 'PPF Calculator – Estimate PPF Maturity & Returns | FinCalc',
    description: 'Estimate PPF maturity and total interest using yearly contribution, expected rate and investment period.'
  },
  EPF: {
    title: 'EPF Calculator – Estimate EPF Corpus & Retirement Savings | FinCalc',
    description: 'Estimate EPF corpus growth from salary, contribution, interest rate and years to retirement.'
  },
  EMI: {
    title: 'EMI Calculator – Calculate Loan EMI & Total Interest | FinCalc',
    description: 'Calculate monthly loan EMI, total interest and total repayment from loan amount, interest rate and tenure.'
  },
  'home-loan': {
    title: 'Home Loan EMI Calculator – Estimate EMI & Interest | FinCalc',
    description: 'Estimate home loan EMI, total interest and repayment for a home loan using amount, rate and tenure.'
  },
  'personal-loan': {
    title: 'Personal Loan EMI Calculator – Estimate Monthly Payment | FinCalc',
    description: 'Estimate personal loan EMI, total interest and repayment from loan amount, interest rate and repayment period.'
  },
  'car-loan': {
    title: 'Car Loan EMI Calculator – Estimate Car Loan Payments | FinCalc',
    description: 'Estimate monthly car loan EMI, total interest and repayment using the loan amount, rate and tenure.'
  },
  'ctc-to-in-hand': {
    title: 'CTC to In-Hand Salary Calculator – Estimate Take-Home Pay | FinCalc',
    description: 'Estimate monthly in-hand salary from CTC and salary components to make job-offer comparisons easier.'
  },
  'salary-take-home': {
    title: 'Take-Home Salary Calculator – Estimate Monthly In-Hand Salary | FinCalc',
    description: 'Estimate monthly take-home pay after common salary deductions using your income and applicable assumptions.'
  },
  gratuity: {
    title: 'Gratuity Calculator – Estimate Gratuity Amount | FinCalc',
    description: 'Estimate gratuity based on salary and years of service using the assumptions provided by the calculator.'
  },
  'income-tax': {
    title: 'Income Tax Calculator – Estimate Tax & Take-Home Income | FinCalc',
    description: 'Estimate income tax and post-tax income using the assumptions available in the calculator.'
  },
  inflation: {
    title: 'Inflation Calculator – Calculate Future Value of Money | FinCalc',
    description: 'See how inflation can change the purchasing power of money over time using amount, inflation rate and years.'
  },
  nps: {
    title: 'NPS Calculator – Estimate NPS Corpus & Retirement Income | FinCalc',
    description: 'Estimate NPS corpus and retirement income from contributions, return assumptions and years to retirement.'
  },
  retirement: {
    title: 'Retirement Calculator – Estimate Retirement Corpus & Savings | FinCalc',
    description: 'Estimate the retirement corpus you may need and the savings required using your spending, horizon and return assumptions.'
  },
  'emergency-fund': {
    title: 'Emergency Fund Calculator – Estimate How Much You Need | FinCalc',
    description: 'Estimate an emergency fund target from monthly essential expenses, income and the number of months you want covered.'
  },
  xirr: {
    title: 'XIRR Calculator – Calculate Annualized Return on Irregular Cash Flows | FinCalc',
    description: 'Calculate annualized investment return when money is invested or withdrawn on different dates.'
  }
}

export function getCalculatorSEO(id) {
  return SEO[id] || null
}
