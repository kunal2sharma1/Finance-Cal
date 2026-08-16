export const guides = [
  {
    slug: 'how-sip-works',
    topic: 'investing',
    title: 'How Does a SIP Work? A Plain-English Guide',
    metaTitle: 'How Does a SIP Work? | SIP Guide | FinCalc',
    metaDescription: 'Understand SIP investing, monthly contributions, time and return assumptions with a simple example.',
    intro: 'A SIP is a repeatable way to invest a fixed amount regularly. The useful question is not whether a SIP is magical, but how your contribution, time and return assumptions interact.',
    sections: [
      ['What a SIP does', 'You invest a fixed amount at regular intervals. The money already invested can potentially grow, while new contributions continue to be added. Returns are assumptions, not guarantees.'],
      ['Why time matters', 'A longer investment period gives contributions more time to potentially grow. Starting earlier can therefore matter even when the monthly amount is modest.'],
      ['Use the calculator', 'Enter your monthly contribution, expected annual return and investment period. A step-up SIP calculator is useful when you expect to increase contributions over time.'],
    ],
    calculatorLinks: [['SIP Calculator','/calculators/sip'],['Step-Up SIP Calculator','/calculators/step-up-sip'],['SIP vs Lump Sum Calculator','/calculators/sip-vs-lumpsum']],
  },
  {
    slug: 'how-emi-is-calculated',
    topic: 'loans',
    title: 'How Is Loan EMI Calculated? A Simple Explanation',
    metaTitle: 'How Is Loan EMI Calculated? | EMI Guide | FinCalc',
    metaDescription: 'Learn how loan amount, interest rate and tenure affect EMI and total interest.',
    intro: 'An EMI is the regular payment used to repay a loan. A lower monthly payment can still mean a more expensive loan when the tenure is longer.',
    sections: [
      ['The three core inputs', 'Loan amount, interest rate and tenure are the main drivers. Increasing the amount or rate generally increases cost; increasing tenure can reduce the monthly payment but usually increases total interest.'],
      ['Why interest changes over time', 'Interest is based on the outstanding balance. Early payments can contain a larger interest component because the balance is still high.'],
      ['Use the result carefully', 'A calculator is an estimate. Actual lender schedules can differ because of fees, rate resets, insurance and other loan terms.'],
    ],
    calculatorLinks: [['EMI Calculator','/calculators/EMI'],['Personal Loan Calculator','/calculators/personal-loan'],['Loan Prepayment Calculator','/calculators/loan-prepayment']],
  },
  {
    slug: 'ctc-vs-in-hand-salary',
    topic: 'salary',
    title: 'CTC vs In-Hand Salary: What Your Salary Really Means',
    metaTitle: 'CTC vs In-Hand Salary | Salary Guide | FinCalc',
    metaDescription: 'Understand CTC, gross salary, deductions and take-home pay when comparing job offers.',
    intro: 'The number in a job offer is not necessarily the number that reaches your bank account each month.',
    sections: [
      ['CTC', 'Cost to Company is a broad employer-side figure. It can include salary components, employer contributions, bonuses and benefits depending on the compensation structure.'],
      ['Gross vs take-home', 'Gross salary is before employee deductions. Take-home or in-hand pay is the amount left after applicable deductions and payroll adjustments.'],
      ['Compare offers correctly', 'Look beyond headline CTC. Compare fixed pay, variable pay, expected take-home, benefits, commute, working hours and role quality.'],
    ],
    calculatorLinks: [['Salary Take-Home Calculator','/calculators/salary-take-home'],['CTC to In-Hand Calculator','/calculators/ctc-to-in-hand'],['Job Offer Comparison Calculator','/calculators/job-offer-comparison']],
  },
  {
    slug: 'how-much-retirement-corpus-do-i-need',
    topic: 'retirement',
    title: 'How Much Retirement Corpus Do You Need?',
    metaTitle: 'How Much Retirement Corpus Do I Need? | FinCalc',
    metaDescription: 'Estimate retirement needs using spending, inflation, time horizon and withdrawal assumptions.',
    intro: 'There is no universal retirement number. A useful estimate starts with your expected spending and the length of time your assets may need to support you.',
    sections: [
      ['Start with spending', 'Estimate annual retirement spending and separate essential costs from flexible lifestyle spending where useful.'],
      ['Include inflation', 'Future costs can be much higher than today's costs. Ignoring inflation can make an apparently comfortable plan look better than it really is.'],
      ['Treat withdrawal rates as scenarios', 'A withdrawal rate is an assumption, not a guarantee. Use different scenarios and review the plan as your income, assets and goals change.'],
    ],
    calculatorLinks: [['Retirement Calculator','/calculators/retirement'],['Retirement Gap Calculator','/calculators/retirement-gap'],['Retirement Income Calculator','/calculators/retirement-income']],
  },
  {
    slug: 'build-an-emergency-fund',
    topic: 'budgeting',
    title: 'How to Build an Emergency Fund',
    metaTitle: 'How to Build an Emergency Fund | FinCalc',
    metaDescription: 'Estimate an emergency-fund target, identify essential expenses and calculate a realistic monthly saving plan.',
    intro: 'An emergency fund is money kept available for unexpected costs or income disruption. The right size depends on your essential spending and circumstances.',
    sections: [
      ['Start with essential expenses', 'Focus on the costs you would still need to cover if discretionary spending stopped: housing, food, utilities, transport and required debt payments are common examples.'],
      ['Choose a coverage period', 'Think in months of essential expenses rather than one universal rupee amount. A more unstable income or larger responsibilities may justify a larger buffer.'],
      ['Turn the target into action', 'Subtract current emergency savings from the target and divide the gap by a realistic monthly contribution.'],
    ],
    calculatorLinks: [['Emergency Fund Calculator','/calculators/emergency-fund'],['Monthly Savings Calculator','/calculators/monthly-savings'],['Budget Calculator','/calculators/budget']],
  },
  {
    slug: 'rent-vs-buy',
    topic: 'financial-planning',
    title: 'Rent vs Buy: How to Think About the Decision',
    metaTitle: 'Rent vs Buy Calculator Guide | FinCalc',
    metaDescription: 'Compare renting and buying using financing, ownership costs, time horizon and opportunity cost.',
    intro: 'Rent vs buy is a financial trade-off, not a universal rule. The right comparison includes cash flow, financing, flexibility and the alternative use of your money.',
    sections: [
      ['Look beyond the down payment', 'Buying can involve interest, maintenance, insurance, taxes and transaction costs in addition to the purchase price.'],
      ['Consider your time horizon', 'A short expected holding period can make upfront transaction costs more important. Longer ownership can spread some costs over more years.'],
      ['Compare the alternative', 'Money used for a property cannot simultaneously be invested elsewhere. Make the opportunity-cost assumption explicit rather than assuming it away.'],
    ],
    calculatorLinks: [['Rent vs Buy Calculator','/calculators/rent-vs-buy'],['Home Loan Affordability Calculator','/calculators/home-loan-affordability'],['Down Payment Calculator','/calculators/down-payment']],
  },
]

export function getGuide(slug) {
  return guides.find((guide) => guide.slug === slug)
}

export function getGuidesByTopic(topic) {
  return guides.filter((guide) => guide.topic === topic)
}
