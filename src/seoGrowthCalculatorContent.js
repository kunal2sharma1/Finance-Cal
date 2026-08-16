export const seoGrowthCalculatorContent = {
  ppf: {
    sections: [
      ['What does the PPF calculator estimate?', 'It estimates how a contribution pattern could grow over time using the rate and period assumptions you enter.'],
      ['What changes the result?', 'Contribution size, contribution timing, interest assumption and investment period can materially change the projected maturity value.'],
      ['How to use the result', 'Compare multiple contribution and time scenarios, then verify the applicable official PPF rules and your account statement before acting.'],
    ],
    faqs: [
      ['Is the PPF result guaranteed?', 'No. The result is a calculation based on the assumptions supplied to the tool. Actual applicable rules and account records are authoritative.'],
      ['Does contribution timing matter?', 'Yes. The timing of contributions can affect how long each contribution participates in the calculation.'],
      ['Can I use this for another country?', 'No. PPF is a country-specific product. Use it only when the assumptions shown by the calculator match your applicable rules.'],
    ],
  },
  fd: {
    sections: [
      ['What does the FD calculator estimate?', 'It estimates maturity value and interest from the deposit, rate, tenure and compounding assumptions you enter.'],
      ['Why compounding matters', 'A quoted annual rate does not fully determine maturity without the interest frequency and product terms.'],
      ['Compare before investing', 'Test different deposit amounts, rates and tenures, then compare the calculator result with the actual product disclosure.'],
    ],
    faqs: [
      ['Does every FD compound the same way?', 'No. Compounding and payout rules vary by product. Use the terms applicable to the deposit you are evaluating.'],
      ['Can I compare two FDs?', 'Yes. Compare the same deposit amount and tenure while changing the rate and compounding assumptions.'],
      ['Is the maturity estimate official?', 'No. It is a planning estimate and does not replace the bank or financial institution statement.'],
    ],
  },
  rd: {
    sections: [
      ['What does the RD calculator estimate?', 'It estimates recurring-deposit maturity from regular contribution, rate and tenure assumptions.'],
      ['Why monthly contribution matters', 'Because the contribution is repeated, increasing the monthly amount can significantly increase the amount accumulated by the end of the tenure.'],
      ['Use it for scenario planning', 'Compare different monthly amounts and periods to find a contribution that fits your budget.'],
    ],
    faqs: [
      ['Is RD interest always calculated identically?', 'No. Product rules can differ. Match the calculator assumptions to the product you are evaluating.'],
      ['Can RD help with a savings goal?', 'Yes. Use the maturity estimate alongside a savings-goal calculator to test whether the contribution fits your target.'],
      ['Should I trust the calculator instead of the provider?', 'No. Use the provider documents and account statement for the final figure.'],
    ],
  },
  emi: {
    sections: [
      ['What does the EMI calculator show?', 'It estimates monthly payment, total interest and total repayment from loan amount, interest rate and tenure.'],
      ['Why tenure matters', 'A longer tenure can lower the monthly payment while increasing the total interest paid over the loan.'],
      ['How to compare loans', 'Keep the loan amount fixed and test different rates and tenures. Compare total repayment instead of looking only at EMI.'],
    ],
    faqs: [
      ['Does EMI include every loan fee?', 'Not necessarily. Processing fees, insurance, taxes and other charges may sit outside the basic EMI formula.'],
      ['Why can two lenders show different EMIs?', 'They may use different rates, compounding conventions, fees or repayment schedules.'],
      ['Is a lower EMI always better?', 'No. A lower EMI can come from a longer tenure and therefore a higher total repayment.'],
    ],
  },
  'home-loan': {
    sections: [
      ['What does the home-loan calculator estimate?', 'It estimates the regular payment, total interest and total repayment for the loan assumptions you enter.'],
      ['Down payment and borrowing', 'A larger down payment reduces the amount borrowed, but it also reduces the cash left available for other needs.'],
      ['Test affordability separately', 'EMI is only one part of affordability. Compare it with household income, existing obligations, emergency savings and other ownership costs.'],
    ],
    faqs: [
      ['Does the calculator include property costs?', 'The basic loan estimate may not include maintenance, taxes, insurance or transaction costs unless those inputs are explicitly provided.'],
      ['Should I compare home loans using EMI alone?', 'No. Compare rate, tenure, total interest, fees and the flexibility of the loan terms.'],
      ['Can this calculator decide if I can afford a home?', 'No. It estimates loan payments. Affordability requires a broader household cash-flow assessment.'],
    ],
  },
  'loan-prepayment': {
    sections: [
      ['What does loan prepayment change?', 'A prepayment reduces principal earlier than the original schedule and can change future interest and the remaining term.'],
      ['Timing matters', 'The earlier a principal reduction happens, the more future periods it may affect under the assumed schedule.'],
      ['Compare the alternative use of cash', 'Interest saved is only one side of the decision. Keep adequate emergency savings and compare the return or value of other uses for the cash.'],
    ],
    faqs: [
      ['Does prepayment always reduce total interest?', 'Under a standard interest-bearing loan, reducing principal earlier generally lowers future interest, but fees and loan terms can affect the net benefit.'],
      ['Should I reduce EMI or tenure after prepayment?', 'That depends on your goal and lender rules. Compare both outcomes if both are available.'],
      ['Is there a prepayment penalty?', 'Some products may have charges or restrictions. Check the actual loan agreement.'],
    ],
  },
  xirr: {
    sections: [
      ['Why use XIRR?', 'XIRR is designed for a series of dated cash flows when deposits and withdrawals do not occur at equal intervals.'],
      ['How to enter cash flows', 'Enter one date and one amount per transaction. Money invested is normally negative and money received is positive.'],
      ['What the percentage means', 'The result is an annualized return estimate based on the timing and size of the cash flows you entered.'],
    ],
    faqs: [
      ['Can XIRR handle monthly investments?', 'Yes. It can handle monthly or irregular investment dates as long as each cash flow has a date.'],
      ['Why can XIRR differ from CAGR?', 'CAGR typically uses a starting and ending value over a period, while XIRR accounts for multiple dated cash flows.'],
      ['What if all cash flows have the same sign?', 'A meaningful investment return generally needs both money going out and money coming back in.'],
    ],
  },
  'compound-interest': {
    sections: [
      ['What does the compound-interest calculator estimate?', 'It estimates future value from principal, rate, time and any additional contribution assumptions included in the calculator.'],
      ['Why time matters', 'The longer money stays invested under the same compounding assumption, the more periods it has to potentially earn growth on earlier growth.'],
      ['Use conservative scenarios', 'Higher return assumptions produce larger projections. Compare several reasonable scenarios rather than treating one rate as a forecast.'],
    ],
    faqs: [
      ['What is the difference between simple and compound interest?', 'Simple interest generally applies the rate to principal, while compound interest can also apply growth to previously accumulated interest.'],
      ['Does compounding guarantee growth?', 'No. A calculator only applies the mathematical assumption you provide. Real investments can vary.'],
      ['Can I add regular contributions?', 'Use the contribution inputs when available to model ongoing additions to the initial amount.'],
    ],
  },
  'net-worth': {
    sections: [
      ['What is net worth?', 'Net worth is the value of assets minus liabilities at a point in time.'],
      ['What belongs on the list?', 'Include the assets and debts that matter to your personal balance sheet, using consistent valuation dates and methods.'],
      ['Track progress over time', 'The trend is usually more useful than a single number. Update the same categories regularly to see whether your balance sheet is improving.'],
    ],
    faqs: [
      ['Is net worth the same as income?', 'No. Income measures flow over a period; net worth measures accumulated assets and liabilities at a point in time.'],
      ['Should I include a home?', 'You can include property if it is part of your asset definition, but use a consistent and realistic valuation method.'],
      ['Can debt reduction increase net worth?', 'Yes. Reducing a liability generally increases net worth when the asset side is unchanged.'],
    ],
  },
  fire: {
    sections: [
      ['What does the FIRE calculator estimate?', 'It models a possible financial-independence timeline using spending, savings, assets and return assumptions.'],
      ['Why spending matters', 'Lower recurring spending can reduce the portfolio income you need to support later, while a higher savings rate can accelerate asset accumulation.'],
      ['Use multiple scenarios', 'Investment returns, inflation and future spending are uncertain. Compare conservative and optimistic cases rather than relying on a single date.'],
    ],
    faqs: [
      ['Is there one correct FIRE number?', 'No. The target depends on spending, time horizon, portfolio assumptions and the type of retirement lifestyle you want.'],
      ['Does higher income guarantee faster FIRE?', 'No. Savings rate and spending can matter as much as gross income.'],
      ['Does FIRE mean stopping work completely?', 'Not necessarily. Financial independence can mean having enough assets to make work optional rather than requiring full retirement.'],
    ],
  },
  nps: {
    sections: [
      ['What does the NPS calculator estimate?', 'It estimates corpus growth and related retirement outcomes from contribution, time and return assumptions.'],
      ['Contribution consistency matters', 'Regular contributions can have a large effect over long periods because more money participates in potential growth for longer.'],
      ['Separate corpus from retirement income', 'The balance accumulated and the income you draw from it are different planning questions and should be evaluated separately.'],
    ],
    faqs: [
      ['Are NPS returns fixed?', 'No. Returns depend on the underlying investments and market performance.'],
      ['Does the calculator include all NPS rules?', 'Only the assumptions explicitly included in the calculator. Official NPS rules and account information remain authoritative.'],
      ['Can I compare NPS with EPF?', 'Yes. Use the NPS vs EPF calculator for a side-by-side scenario comparison.'],
    ],
  },
  'salary-take-home': {
    sections: [
      ['What is take-home salary?', 'Take-home salary is the amount that remains after applicable employee-side deductions and payroll adjustments.'],
      ['Why CTC can be misleading', 'CTC can include employer contributions, benefits and variable components that do not arrive in your bank account each month.'],
      ['Use it for budgeting', 'Take-home pay is usually the better starting point for monthly budgeting, emergency-fund planning and recurring savings targets.'],
    ],
    faqs: [
      ['Is take-home salary the same every month?', 'Not always. Variable pay, bonuses, tax adjustments and other payroll changes can make monthly pay differ.'],
      ['Does the calculator replace a payslip?', 'No. Your actual payroll statement is the authoritative source for your deductions and net pay.'],
      ['Should I compare job offers by CTC?', 'Compare both CTC and expected take-home, plus variable pay, benefits, commute and working conditions.'],
    ],
  },
  'income-tax': {
    sections: [
      ['What does an income-tax calculator do?', 'It estimates tax liability and post-tax income from the income and rule assumptions included in the calculator.'],
      ['Tax-year context matters', 'Tax rules can change, so the applicable year or assessment year should always be checked before relying on an estimate.'],
      ['Treat it as a planning tool', 'Use the output to compare scenarios. Official tax rules, records and filing calculations remain the source of truth for your actual liability.'],
    ],
    faqs: [
      ['Can a calculator guarantee my tax liability?', 'No. The result depends on the assumptions and the rules applicable to your specific circumstances.'],
      ['Why can tax results change?', 'Tax rates, deductions, exemptions, credits and other rules can change by tax year and individual situation.'],
      ['Should I use the result for filing directly?', 'No. Use the calculator for planning and verify the final liability against the applicable official rules and records.'],
    ],
  },
}
