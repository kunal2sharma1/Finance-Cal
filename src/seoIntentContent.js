export const seoIntentContent = {
  sip: {
    intentLabel: 'For regular monthly investors',
    bestFor: 'Use this page when you want to estimate SIP growth, compare monthly contributions or test different investment periods.',
    questions: [
      'How much can a monthly SIP grow over time?',
      'How does investment duration affect SIP returns?',
      'What happens if I increase my SIP contribution?',
    ],
    guideLinks: [['How Does a SIP Work?', '/guides/how-sip-works']],
  },
  ppf: {
    intentLabel: 'For long-term PPF planning',
    bestFor: 'Use this page to estimate PPF maturity under the contribution, rate and time assumptions you enter.',
    questions: [
      'How is PPF maturity calculated?',
      'How do higher yearly contributions affect the estimated balance?',
      'Why can the calculator result differ from an official account value?',
    ],
    guideLinks: [['How PPF Interest and Maturity Work', '/guides/how-ppf-interest-and-maturity-work']],
  },
  fd: {
    intentLabel: 'For fixed-deposit planning',
    bestFor: 'Use this page to estimate FD maturity and interest before comparing deposit amounts, rates or tenures.',
    questions: [
      'How is fixed-deposit maturity calculated?',
      'How do rate and tenure change total interest?',
      'Why can two deposits with the same rate produce different results?',
    ],
    guideLinks: [['How Fixed Deposit Maturity Is Calculated', '/guides/how-fixed-deposit-maturity-is-calculated']],
  },
  emi: {
    intentLabel: 'For loan-payment planning',
    bestFor: 'Use this page to compare monthly EMI, total interest and total repayment before choosing a loan amount or tenure.',
    questions: [
      'How is EMI calculated?',
      'Does a longer tenure always reduce the total cost?',
      'How much can the interest rate change my repayment?',
    ],
    guideLinks: [['How Is Loan EMI Calculated?', '/guides/how-emi-is-calculated']],
  },
  'home-loan': {
    intentLabel: 'For home-loan planning',
    bestFor: 'Use this page to test home-loan affordability and compare repayment trade-offs across rates and tenures.',
    questions: [
      'How much home-loan EMI can I afford?',
      'How much interest will I pay over the loan term?',
      'What changes when I choose a shorter tenure?',
    ],
    guideLinks: [['How Is Loan EMI Calculated?', '/guides/how-emi-is-calculated']],
  },
  'loan-prepayment': {
    intentLabel: 'For early-repayment decisions',
    bestFor: 'Use this page when deciding whether an extra payment could reduce interest or shorten the remaining loan period.',
    questions: [
      'How much interest can a prepayment save?',
      'Should I reduce tenure or EMI after prepaying?',
      'How should I compare prepayment with keeping cash invested?',
    ],
    guideLinks: [['How Is Loan EMI Calculated?', '/guides/how-emi-is-calculated']],
  },
  xirr: {
    intentLabel: 'For irregular investment cash flows',
    bestFor: 'Use this page when investments or withdrawals happen on different dates and a regular-return formula is not appropriate.',
    questions: [
      'When should I use XIRR instead of CAGR?',
      'How do different cash-flow dates affect annualized return?',
      'Why does changing a cash-flow date change the XIRR?',
    ],
    guideLinks: [['How Does a SIP Work?', '/guides/how-sip-works']],
  },
  nps: {
    intentLabel: 'For retirement-corpus scenarios',
    bestFor: 'Use this page to explore how contribution levels, time and return assumptions can change an estimated retirement corpus.',
    questions: [
      'How does contribution size affect NPS corpus?',
      'How does time to retirement change the estimate?',
      'Why should retirement projections be tested across scenarios?',
    ],
    guideLinks: [['How Much Retirement Corpus Do You Need?', '/guides/how-much-retirement-corpus-do-i-need']],
  },
  retirement: {
    intentLabel: 'For long-term retirement planning',
    bestFor: 'Use this page to estimate a target retirement corpus and test how savings, inflation, returns and retirement timing affect the plan.',
    questions: [
      'How much retirement corpus might I need?',
      'How does inflation change the target?',
      'How much does delaying retirement change the calculation?',
    ],
    guideLinks: [['How Much Retirement Corpus Do You Need?', '/guides/how-much-retirement-corpus-do-i-need']],
  },
  'emergency-fund': {
    intentLabel: 'For emergency-reserve planning',
    bestFor: 'Use this page to turn essential monthly expenses into a practical emergency-fund target.',
    questions: [
      'How many months of expenses should an emergency fund cover?',
      'Which expenses should count toward the target?',
      'How long will it take to build the fund?',
    ],
    guideLinks: [['How to Build an Emergency Fund', '/guides/build-an-emergency-fund']],
  },
  'savings-goal': {
    intentLabel: 'For goal-based saving',
    bestFor: 'Use this page when you know the target amount and deadline and want to estimate the monthly saving required.',
    questions: [
      'How much should I save each month to reach a target?',
      'What happens if I extend the goal date?',
      'How does an assumed return affect the monthly amount?',
    ],
    guideLinks: [['How to Build an Emergency Fund', '/guides/build-an-emergency-fund']],
  },
  'compound-interest': {
    intentLabel: 'For compounding scenarios',
    bestFor: 'Use this page to understand how an initial amount, contributions, rate and time interact under a compound-growth assumption.',
    questions: [
      'How does compound interest grow money over time?',
      'How much difference does the investment period make?',
      'How do regular contributions change the ending value?',
    ],
    guideLinks: [['Why Your Savings Rate Matters More Than You Think', '/guides/savings-rate-and-wealth']],
  },
  'net-worth': {
    intentLabel: 'For personal balance-sheet planning',
    bestFor: 'Use this page to calculate net worth by comparing the value of assets with debts and other liabilities.',
    questions: [
      'What should be included in net worth?',
      'Why can income rise while net worth stays flat?',
      'How often should I track net worth?',
    ],
    guideLinks: [['How Much Retirement Corpus Do You Need?', '/guides/how-much-retirement-corpus-do-i-need']],
  },
  'salary-take-home': {
    intentLabel: 'For in-hand salary planning',
    bestFor: 'Use this page when comparing salary offers or estimating the monthly amount that may reach your bank account after deductions.',
    questions: [
      'Why is in-hand salary lower than CTC?',
      'What salary components affect take-home pay?',
      'How should I compare two job offers?',
    ],
    guideLinks: [['CTC vs In-Hand Salary', '/guides/ctc-vs-in-hand-salary']],
  },
  'real-return': {
    intentLabel: 'For inflation-adjusted returns',
    bestFor: 'Use this page when you want to understand investment growth after accounting for inflation and purchasing power.',
    questions: [
      'What is the difference between nominal and real return?',
      'How does inflation change investment results?',
      'Why can a positive return still mean weak purchasing-power growth?',
    ],
    guideLinks: [['Real Return vs Inflation', '/guides/real-return-vs-inflation']],
  },
  'bond-return': {
    intentLabel: 'For bond-return scenarios',
    bestFor: 'Use this page to estimate the combined effect of coupon income, purchase price, sale price and holding period.',
    questions: [
      'How do coupon income and price changes affect bond return?',
      'Why does the purchase price matter?',
      'What changes if I sell the bond before maturity?',
    ],
    guideLinks: [['Bond Returns Explained', '/guides/bond-return-basics']],
  },
  'auto-loan': {
    intentLabel: 'For vehicle-financing decisions',
    bestFor: 'Use this page to compare financed amount, monthly payment and total interest for an auto loan.',
    questions: [
      'How much will my car-loan payment be?',
      'Does a larger down payment reduce total interest?',
      'Is a lower EMI always a cheaper loan?',
    ],
    guideLinks: [['How to Compare the True Cost of an Auto Loan', '/guides/auto-loan-cost']],
  },
  'sip-vs-lumpsum': {
    intentLabel: 'For contribution-strategy comparison',
    bestFor: 'Use this page to compare regular contributions with a lump-sum investment under different return and time assumptions.',
    questions: [
      'Should I compare SIP and lump sum using the same return assumption?',
      'How does investment timing change the result?',
      'Why can market volatility change the outcome?',
    ],
    guideLinks: [['How Does a SIP Work?', '/guides/how-sip-works']],
  },
}
