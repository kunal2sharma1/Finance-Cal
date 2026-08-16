// This file is the single place that "installs" a calculator into the app.
// Calculators are grouped by purpose so they appear in a logical order.
//
// Current calculator groups:
// 1. Investing
// 2. Savings & Retirement Accounts
// 3. Loans
// 4. Retirement & Financial Planning
// 5. Tax & Inflation
// 6. Education Planning

// ============================================================
// INVESTING
// ============================================================

import { config as sipConfig } from './sip/config.js'
import { calculate as sipCalculate } from './sip/formula.js'
import { explanation as sipExplanation } from './sip/explanation.js'

import { config as lumpsumConfig } from './lumpsum/config.js'
import { calculate as lumpsumCalculate } from './lumpsum/formula.js'
import { explanation as lumpsumExplanation } from './lumpsum/explanation.js'

import { config as cagrConfig } from './cagr/config.js'
import { calculate as cagrCalculate } from './cagr/formula.js'
import { explanation as cagrExplanation } from './cagr/explanation.js'

import { config as swpConfig } from './swp/config.js'
import { calculate as swpCalculate } from './swp/formula.js'
import { explanation as swpExplanation } from './swp/explanation.js'

import { config as goalBasedConfig } from './goal-based/config.js'
import { calculate as goalBasedCalculate } from './goal-based/formula.js'
import { explanation as goalBasedExplanation } from './goal-based/explanation.js'

// ============================================================
// SAVINGS & RETIREMENT ACCOUNTS
// ============================================================

import { config as fdConfig } from './fd/config.js'
import { calculate as fdCalculate } from './fd/formula.js'
import { explanation as fdExplanation } from './fd/explanation.js'

import { config as rdConfig } from './rd/config.js'
import { calculate as rdCalculate } from './rd/formula.js'
import { explanation as rdExplanation } from './rd/explanation.js'

import { config as ppfConfig } from './ppf/config.js'
import { calculate as ppfCalculate } from './ppf/formula.js'
import { explanation as ppfExplanation } from './ppf/explanation.js'

import { config as epfConfig } from './EPF/config.js'
import { calculate as epfCalculate } from './EPF/formula.js'
import { explanation as epfExplanation } from './EPF/explanation.js'

// ============================================================
// LOANS
// ============================================================

import { config as emiConfig } from './EMI/config.js'
import { calculate as emiCalculate } from './EMI/formula.js'
import { explanation as emiExplanation } from './EMI/explanation.js'

import { config as homeLoanConfig } from './home-loan/config.js'
import { calculate as homeLoanCalculate } from './home-loan/formula.js'
import { explanation as homeLoanExplanation } from './home-loan/explanation.js'

import { config as loanEligibilityConfig } from './loan-eligibility/config.js'
import { calculate as loanEligibilityCalculate } from './loan-eligibility/formula.js'
import { explanation as loanEligibilityExplanation } from './loan-eligibility/explanation.js'

// ============================================================
// RETIREMENT & FINANCIAL PLANNING
// ============================================================

import { config as fireConfig } from './fire/config.js'
import { calculate as fireCalculate } from './fire/formula.js'
import { explanation as fireExplanation } from './fire/explanation.js'

import { config as retirementConfig } from './retirement/config.js'
import { calculate as retirementCalculate } from './retirement/formula.js'
import { explanation as retirementExplanation } from './retirement/explanation.js'

import { config as netWorthConfig } from './net-worth/config.js'
import { calculate as netWorthCalculate } from './net-worth/formula.js'
import { explanation as netWorthExplanation } from './net-worth/explanation.js'

// ============================================================
// TAX & INFLATION
// ============================================================

import { config as incomeTaxConfig } from './income-tax/config.js'
import { calculate as incomeTaxCalculate } from './income-tax/formula.js'
import { explanation as incomeTaxExplanation } from './income-tax/explanation.js'

import { config as inflationConfig } from './inflation/config.js'
import { calculate as inflationCalculate } from './inflation/formula.js'
import { explanation as inflationExplanation } from './inflation/explanation.js'

// ============================================================
// EDUCATION PLANNING
// ============================================================

import { config as educationConfig } from './education/config.js'
import { calculate as educationCalculate } from './education/formula.js'
import { explanation as educationExplanation } from './education/explanation.js'

// ============================================================
// BATCH 1 — CORE PERSONAL FINANCE
// ============================================================
import { config as StepUpSipConfig } from './step-up-sip/config.js'
import { calculate as StepUpSipCalculate } from './step-up-sip/formula.js'
import { explanation as StepUpSipExplanation } from './step-up-sip/explanation.js'
import { config as SipVsLumpsumConfig } from './sip-vs-lumpsum/config.js'
import { calculate as SipVsLumpsumCalculate } from './sip-vs-lumpsum/formula.js'
import { explanation as SipVsLumpsumExplanation } from './sip-vs-lumpsum/explanation.js'
import { config as XirrConfig } from './xirr/config.js'
import { calculate as XirrCalculate } from './xirr/formula.js'
import { explanation as XirrExplanation } from './xirr/explanation.js'
import { config as EmergencyFundConfig } from './emergency-fund/config.js'
import { calculate as EmergencyFundCalculate } from './emergency-fund/formula.js'
import { explanation as EmergencyFundExplanation } from './emergency-fund/explanation.js'
import { config as SavingsGoalConfig } from './savings-goal/config.js'
import { calculate as SavingsGoalCalculate } from './savings-goal/formula.js'
import { explanation as SavingsGoalExplanation } from './savings-goal/explanation.js'
import { config as CompoundInterestConfig } from './compound-interest/config.js'
import { calculate as CompoundInterestCalculate } from './compound-interest/formula.js'
import { explanation as CompoundInterestExplanation } from './compound-interest/explanation.js'
import { config as SimpleInterestConfig } from './simple-interest/config.js'
import { calculate as SimpleInterestCalculate } from './simple-interest/formula.js'
import { explanation as SimpleInterestExplanation } from './simple-interest/explanation.js'
import { config as InvestmentReturnConfig } from './investment-return/config.js'
import { calculate as InvestmentReturnCalculate } from './investment-return/formula.js'
import { explanation as InvestmentReturnExplanation } from './investment-return/explanation.js'
import { config as MonthlySavingsConfig } from './monthly-savings/config.js'
import { calculate as MonthlySavingsCalculate } from './monthly-savings/formula.js'
import { explanation as MonthlySavingsExplanation } from './monthly-savings/explanation.js'
import { config as BudgetConfig } from './budget/config.js'
import { calculate as BudgetCalculate } from './budget/formula.js'
import { explanation as BudgetExplanation } from './budget/explanation.js'

// ============================================================
// BATCH 2 — LOANS & DEBT
// ============================================================
import { config as PersonalLoanConfig } from './personal-loan/config.js'
import { calculate as PersonalLoanCalculate } from './personal-loan/formula.js'
import { explanation as PersonalLoanExplanation } from './personal-loan/explanation.js'
import { config as CarLoanConfig } from './car-loan/config.js'
import { calculate as CarLoanCalculate } from './car-loan/formula.js'
import { explanation as CarLoanExplanation } from './car-loan/explanation.js'
import { config as HomeLoanAffordabilityConfig } from './home-loan-affordability/config.js'
import { calculate as HomeLoanAffordabilityCalculate } from './home-loan-affordability/formula.js'
import { explanation as HomeLoanAffordabilityExplanation } from './home-loan-affordability/explanation.js'
import { config as DownPaymentConfig } from './down-payment/config.js'
import { calculate as DownPaymentCalculate } from './down-payment/formula.js'
import { explanation as DownPaymentExplanation } from './down-payment/explanation.js'
import { config as LoanComparisonConfig } from './loan-comparison/config.js'
import { calculate as LoanComparisonCalculate } from './loan-comparison/formula.js'
import { explanation as LoanComparisonExplanation } from './loan-comparison/explanation.js'
import { config as LoanPrepaymentConfig } from './loan-prepayment/config.js'
import { calculate as LoanPrepaymentCalculate } from './loan-prepayment/formula.js'
import { explanation as LoanPrepaymentExplanation } from './loan-prepayment/explanation.js'
import { config as DebtPayoffConfig } from './debt-payoff/config.js'
import { calculate as DebtPayoffCalculate } from './debt-payoff/formula.js'
import { explanation as DebtPayoffExplanation } from './debt-payoff/explanation.js'
import { config as DebtSnowballConfig } from './debt-snowball/config.js'
import { calculate as DebtSnowballCalculate } from './debt-snowball/formula.js'
import { explanation as DebtSnowballExplanation } from './debt-snowball/explanation.js'
import { config as DebtAvalancheConfig } from './debt-avalanche/config.js'
import { calculate as DebtAvalancheCalculate } from './debt-avalanche/formula.js'
import { explanation as DebtAvalancheExplanation } from './debt-avalanche/explanation.js'
import { config as CreditCardInterestConfig } from './credit-card-interest/config.js'
import { calculate as CreditCardInterestCalculate } from './credit-card-interest/formula.js'
import { explanation as CreditCardInterestExplanation } from './credit-card-interest/explanation.js'

// ============================================================
// BATCH 3 — SALARY & EMPLOYMENT
// ============================================================
import { config as SalaryTakeHomeConfig } from './salary-take-home/config.js'
import { calculate as SalaryTakeHomeCalculate } from './salary-take-home/formula.js'
import { explanation as SalaryTakeHomeExplanation } from './salary-take-home/explanation.js'
import { config as CtcToInHandConfig } from './ctc-to-in-hand/config.js'
import { calculate as CtcToInHandCalculate } from './ctc-to-in-hand/formula.js'
import { explanation as CtcToInHandExplanation } from './ctc-to-in-hand/explanation.js'
import { config as SalaryHikeConfig } from './salary-hike/config.js'
import { calculate as SalaryHikeCalculate } from './salary-hike/formula.js'
import { explanation as SalaryHikeExplanation } from './salary-hike/explanation.js'
import { config as SalaryIncrementConfig } from './salary-increment/config.js'
import { calculate as SalaryIncrementCalculate } from './salary-increment/formula.js'
import { explanation as SalaryIncrementExplanation } from './salary-increment/explanation.js'
import { config as JobOfferComparisonConfig } from './job-offer-comparison/config.js'
import { calculate as JobOfferComparisonCalculate } from './job-offer-comparison/formula.js'
import { explanation as JobOfferComparisonExplanation } from './job-offer-comparison/explanation.js'
import { config as GratuityConfig } from './gratuity/config.js'
import { calculate as GratuityCalculate } from './gratuity/formula.js'
import { explanation as GratuityExplanation } from './gratuity/explanation.js'
import { config as NoticePeriodSalaryConfig } from './notice-period-salary/config.js'
import { calculate as NoticePeriodSalaryCalculate } from './notice-period-salary/formula.js'
import { explanation as NoticePeriodSalaryExplanation } from './notice-period-salary/explanation.js'
import { config as BonusConfig } from './bonus/config.js'
import { calculate as BonusCalculate } from './bonus/formula.js'
import { explanation as BonusExplanation } from './bonus/explanation.js'
import { config as OvertimePayConfig } from './overtime-pay/config.js'
import { calculate as OvertimePayCalculate } from './overtime-pay/formula.js'
import { explanation as OvertimePayExplanation } from './overtime-pay/explanation.js'
import { config as LeaveEncashmentConfig } from './leave-encashment/config.js'
import { calculate as LeaveEncashmentCalculate } from './leave-encashment/formula.js'
import { explanation as LeaveEncashmentExplanation } from './leave-encashment/explanation.js'

// ============================================================
// BATCH 4 — RETIREMENT & WEALTH
// ============================================================
import { config as NpsConfig } from './nps/config.js'
import { calculate as NpsCalculate } from './nps/formula.js'
import { explanation as NpsExplanation } from './nps/explanation.js'
import { config as NpsVsEpfConfig } from './nps-vs-epf/config.js'
import { calculate as NpsVsEpfCalculate } from './nps-vs-epf/formula.js'
import { explanation as NpsVsEpfExplanation } from './nps-vs-epf/explanation.js'
import { config as RetirementWithdrawalConfig } from './retirement-withdrawal/config.js'
import { calculate as RetirementWithdrawalCalculate } from './retirement-withdrawal/formula.js'
import { explanation as RetirementWithdrawalExplanation } from './retirement-withdrawal/explanation.js'
import { config as RetirementIncomeConfig } from './retirement-income/config.js'
import { calculate as RetirementIncomeCalculate } from './retirement-income/formula.js'
import { explanation as RetirementIncomeExplanation } from './retirement-income/explanation.js'
import { config as RetirementAgeConfig } from './retirement-age/config.js'
import { calculate as RetirementAgeCalculate } from './retirement-age/formula.js'
import { explanation as RetirementAgeExplanation } from './retirement-age/explanation.js'
import { config as FiProgressConfig } from './fi-progress/config.js'
import { calculate as FiProgressCalculate } from './fi-progress/formula.js'
import { explanation as FiProgressExplanation } from './fi-progress/explanation.js'
import { config as FutureNetWorthConfig } from './future-net-worth/config.js'
import { calculate as FutureNetWorthCalculate } from './future-net-worth/formula.js'
import { explanation as FutureNetWorthExplanation } from './future-net-worth/explanation.js'
import { config as WealthAccumulationConfig } from './wealth-accumulation/config.js'
import { calculate as WealthAccumulationCalculate } from './wealth-accumulation/formula.js'
import { explanation as WealthAccumulationExplanation } from './wealth-accumulation/explanation.js'
import { config as MonthlyInvestmentRequiredConfig } from './monthly-investment-required/config.js'
import { calculate as MonthlyInvestmentRequiredCalculate } from './monthly-investment-required/formula.js'
import { explanation as MonthlyInvestmentRequiredExplanation } from './monthly-investment-required/explanation.js'
import { config as RetirementGapConfig } from './retirement-gap/config.js'
import { calculate as RetirementGapCalculate } from './retirement-gap/formula.js'
import { explanation as RetirementGapExplanation } from './retirement-gap/explanation.js'

// ============================================================
// BATCH 5 — INVESTING & MARKETS
// ============================================================
import { config as MutualFundReturnConfig } from './mutual-fund-return/config.js'
import { calculate as MutualFundReturnCalculate } from './mutual-fund-return/formula.js'
import { explanation as MutualFundReturnExplanation } from './mutual-fund-return/explanation.js'
import { config as MutualFundSipReturnConfig } from './mutual-fund-sip-return/config.js'
import { calculate as MutualFundSipReturnCalculate } from './mutual-fund-sip-return/formula.js'
import { explanation as MutualFundSipReturnExplanation } from './mutual-fund-sip-return/explanation.js'
import { config as PortfolioReturnConfig } from './portfolio-return/config.js'
import { calculate as PortfolioReturnCalculate } from './portfolio-return/formula.js'
import { explanation as PortfolioReturnExplanation } from './portfolio-return/explanation.js'
import { config as StockProfitLossConfig } from './stock-profit-loss/config.js'
import { calculate as StockProfitLossCalculate } from './stock-profit-loss/formula.js'
import { explanation as StockProfitLossExplanation } from './stock-profit-loss/explanation.js'
import { config as StockAveragePriceConfig } from './stock-average-price/config.js'
import { calculate as StockAveragePriceCalculate } from './stock-average-price/formula.js'
import { explanation as StockAveragePriceExplanation } from './stock-average-price/explanation.js'
import { config as DividendIncomeConfig } from './dividend-income/config.js'
import { calculate as DividendIncomeCalculate } from './dividend-income/formula.js'
import { explanation as DividendIncomeExplanation } from './dividend-income/explanation.js'
import { config as DividendYieldConfig } from './dividend-yield/config.js'
import { calculate as DividendYieldCalculate } from './dividend-yield/formula.js'
import { explanation as DividendYieldExplanation } from './dividend-yield/explanation.js'
import { config as CapitalGainsConfig } from './capital-gains/config.js'
import { calculate as CapitalGainsCalculate } from './capital-gains/formula.js'
import { explanation as CapitalGainsExplanation } from './capital-gains/explanation.js'
import { config as StockCagrConfig } from './stock-cagr/config.js'
import { calculate as StockCagrCalculate } from './stock-cagr/formula.js'
import { explanation as StockCagrExplanation } from './stock-cagr/explanation.js'
import { config as GoldInvestmentReturnConfig } from './gold-investment-return/config.js'
import { calculate as GoldInvestmentReturnCalculate } from './gold-investment-return/formula.js'
import { explanation as GoldInvestmentReturnExplanation } from './gold-investment-return/explanation.js'

// ============================================================
// BATCH 6 — MAJOR FINANCIAL DECISIONS
// ============================================================
import { config as RentVsBuyConfig } from './rent-vs-buy/config.js'
import { calculate as RentVsBuyCalculate } from './rent-vs-buy/formula.js'
import { explanation as RentVsBuyExplanation } from './rent-vs-buy/explanation.js'
import { config as CarLoanVsCashConfig } from './car-loan-vs-cash/config.js'
import { calculate as CarLoanVsCashCalculate } from './car-loan-vs-cash/formula.js'
import { explanation as CarLoanVsCashExplanation } from './car-loan-vs-cash/explanation.js'
import { config as EducationLoanConfig } from './education-loan/config.js'
import { calculate as EducationLoanCalculate } from './education-loan/formula.js'
import { explanation as EducationLoanExplanation } from './education-loan/explanation.js'
import { config as WeddingGoalConfig } from './wedding-goal/config.js'
import { calculate as WeddingGoalCalculate } from './wedding-goal/formula.js'
import { explanation as WeddingGoalExplanation } from './wedding-goal/explanation.js'
import { config as ChildEducationPlanningConfig } from './child-education-planning/config.js'
import { calculate as ChildEducationPlanningCalculate } from './child-education-planning/formula.js'
import { explanation as ChildEducationPlanningExplanation } from './child-education-planning/explanation.js'
import { config as HealthInsuranceRequirementConfig } from './health-insurance-requirement/config.js'
import { calculate as HealthInsuranceRequirementCalculate } from './health-insurance-requirement/formula.js'
import { explanation as HealthInsuranceRequirementExplanation } from './health-insurance-requirement/explanation.js'
import { config as LifeInsuranceRequirementConfig } from './life-insurance-requirement/config.js'
import { calculate as LifeInsuranceRequirementCalculate } from './life-insurance-requirement/formula.js'
import { explanation as LifeInsuranceRequirementExplanation } from './life-insurance-requirement/explanation.js'
import { config as CreditCardEmiConfig } from './credit-card-emi/config.js'
import { calculate as CreditCardEmiCalculate } from './credit-card-emi/formula.js'
import { explanation as CreditCardEmiExplanation } from './credit-card-emi/explanation.js'
import { config as LoanBalanceTransferConfig } from './loan-balance-transfer/config.js'
import { calculate as LoanBalanceTransferCalculate } from './loan-balance-transfer/formula.js'
import { explanation as LoanBalanceTransferExplanation } from './loan-balance-transfer/explanation.js'
import { config as FinancialIndependenceDateConfig } from './financial-independence-date/config.js'
import { calculate as FinancialIndependenceDateCalculate } from './financial-independence-date/formula.js'
import { explanation as FinancialIndependenceDateExplanation } from './financial-independence-date/explanation.js'

// ============================================================
// CURRENCY & EXCHANGE
// ============================================================
import { config as CurrencyExchangeConfig } from './currency-exchange/config.js'
import { calculate as CurrencyExchangeCalculate } from './currency-exchange/formula.js'
import { explanation as CurrencyExchangeExplanation } from './currency-exchange/explanation.js'

// ============================================================
// CALCULATOR REGISTRY
// ============================================================

export const calculators = [
  { config: sipConfig, calculate: sipCalculate, explanation: sipExplanation },
  { config: lumpsumConfig, calculate: lumpsumCalculate, explanation: lumpsumExplanation },
  { config: cagrConfig, calculate: cagrCalculate, explanation: cagrExplanation },
  { config: swpConfig, calculate: swpCalculate, explanation: swpExplanation },
  { config: goalBasedConfig, calculate: goalBasedCalculate, explanation: goalBasedExplanation },
  { config: fdConfig, calculate: fdCalculate, explanation: fdExplanation },
  { config: rdConfig, calculate: rdCalculate, explanation: rdExplanation },
  { config: ppfConfig, calculate: ppfCalculate, explanation: ppfExplanation },
  { config: epfConfig, calculate: epfCalculate, explanation: epfExplanation },
  { config: emiConfig, calculate: emiCalculate, explanation: emiExplanation },
  { config: homeLoanConfig, calculate: homeLoanCalculate, explanation: homeLoanExplanation },
  { config: loanEligibilityConfig, calculate: loanEligibilityCalculate, explanation: loanEligibilityExplanation },
  { config: fireConfig, calculate: fireCalculate, explanation: fireExplanation },
  { config: retirementConfig, calculate: retirementCalculate, explanation: retirementExplanation },
  { config: netWorthConfig, calculate: netWorthCalculate, explanation: netWorthExplanation },
  { config: incomeTaxConfig, calculate: incomeTaxCalculate, explanation: incomeTaxExplanation },
  { config: inflationConfig, calculate: inflationCalculate, explanation: inflationExplanation },
  { config: educationConfig, calculate: educationCalculate, explanation: educationExplanation },
  { config: StepUpSipConfig, calculate: StepUpSipCalculate, explanation: StepUpSipExplanation },
  { config: SipVsLumpsumConfig, calculate: SipVsLumpsumCalculate, explanation: SipVsLumpsumExplanation },
  { config: XirrConfig, calculate: XirrCalculate, explanation: XirrExplanation },
  { config: EmergencyFundConfig, calculate: EmergencyFundCalculate, explanation: EmergencyFundExplanation },
  { config: SavingsGoalConfig, calculate: SavingsGoalCalculate, explanation: SavingsGoalExplanation },
  { config: CompoundInterestConfig, calculate: CompoundInterestCalculate, explanation: CompoundInterestExplanation },
  { config: SimpleInterestConfig, calculate: SimpleInterestCalculate, explanation: SimpleInterestExplanation },
  { config: InvestmentReturnConfig, calculate: InvestmentReturnCalculate, explanation: InvestmentReturnExplanation },
  { config: MonthlySavingsConfig, calculate: MonthlySavingsCalculate, explanation: MonthlySavingsExplanation },
  { config: BudgetConfig, calculate: BudgetCalculate, explanation: BudgetExplanation },
  { config: PersonalLoanConfig, calculate: PersonalLoanCalculate, explanation: PersonalLoanExplanation },
  { config: CarLoanConfig, calculate: CarLoanCalculate, explanation: CarLoanExplanation },
  { config: HomeLoanAffordabilityConfig, calculate: HomeLoanAffordabilityCalculate, explanation: HomeLoanAffordabilityExplanation },
  { config: DownPaymentConfig, calculate: DownPaymentCalculate, explanation: DownPaymentExplanation },
  { config: LoanComparisonConfig, calculate: LoanComparisonCalculate, explanation: LoanComparisonExplanation },
  { config: LoanPrepaymentConfig, calculate: LoanPrepaymentCalculate, explanation: LoanPrepaymentExplanation },
  { config: DebtPayoffConfig, calculate: DebtPayoffCalculate, explanation: DebtPayoffExplanation },
  { config: DebtSnowballConfig, calculate: DebtSnowballCalculate, explanation: DebtSnowballExplanation },
  { config: DebtAvalancheConfig, calculate: DebtAvalancheCalculate, explanation: DebtAvalancheExplanation },
  { config: CreditCardInterestConfig, calculate: CreditCardInterestCalculate, explanation: CreditCardInterestExplanation },
  { config: SalaryTakeHomeConfig, calculate: SalaryTakeHomeCalculate, explanation: SalaryTakeHomeExplanation },
  { config: CtcToInHandConfig, calculate: CtcToInHandCalculate, explanation: CtcToInHandExplanation },
  { config: SalaryHikeConfig, calculate: SalaryHikeCalculate, explanation: SalaryHikeExplanation },
  { config: SalaryIncrementConfig, calculate: SalaryIncrementCalculate, explanation: SalaryIncrementExplanation },
  { config: JobOfferComparisonConfig, calculate: JobOfferComparisonCalculate, explanation: JobOfferComparisonExplanation },
  { config: GratuityConfig, calculate: GratuityCalculate, explanation: GratuityExplanation },
  { config: NoticePeriodSalaryConfig, calculate: NoticePeriodSalaryCalculate, explanation: NoticePeriodSalaryExplanation },
  { config: BonusConfig, calculate: BonusCalculate, explanation: BonusExplanation },
  { config: OvertimePayConfig, calculate: OvertimePayCalculate, explanation: OvertimePayExplanation },
  { config: LeaveEncashmentConfig, calculate: LeaveEncashmentCalculate, explanation: LeaveEncashmentExplanation },
  { config: NpsConfig, calculate: NpsCalculate, explanation: NpsExplanation },
  { config: NpsVsEpfConfig, calculate: NpsVsEpfCalculate, explanation: NpsVsEpfExplanation },
  { config: RetirementWithdrawalConfig, calculate: RetirementWithdrawalCalculate, explanation: RetirementWithdrawalExplanation },
  { config: RetirementIncomeConfig, calculate: RetirementIncomeCalculate, explanation: RetirementIncomeExplanation },
  { config: RetirementAgeConfig, calculate: RetirementAgeCalculate, explanation: RetirementAgeExplanation },
  { config: FiProgressConfig, calculate: FiProgressCalculate, explanation: FiProgressExplanation },
  { config: FutureNetWorthConfig, calculate: FutureNetWorthCalculate, explanation: FutureNetWorthExplanation },
  { config: WealthAccumulationConfig, calculate: WealthAccumulationCalculate, explanation: WealthAccumulationExplanation },
  { config: MonthlyInvestmentRequiredConfig, calculate: MonthlyInvestmentRequiredCalculate, explanation: MonthlyInvestmentRequiredExplanation },
  { config: RetirementGapConfig, calculate: RetirementGapCalculate, explanation: RetirementGapExplanation },
  { config: MutualFundReturnConfig, calculate: MutualFundReturnCalculate, explanation: MutualFundReturnExplanation },
  { config: MutualFundSipReturnConfig, calculate: MutualFundSipReturnCalculate, explanation: MutualFundSipReturnExplanation },
  { config: PortfolioReturnConfig, calculate: PortfolioReturnCalculate, explanation: PortfolioReturnExplanation },
  { config: StockProfitLossConfig, calculate: StockProfitLossCalculate, explanation: StockProfitLossExplanation },
  { config: StockAveragePriceConfig, calculate: StockAveragePriceCalculate, explanation: StockAveragePriceExplanation },
  { config: DividendIncomeConfig, calculate: DividendIncomeCalculate, explanation: DividendIncomeExplanation },
  { config: DividendYieldConfig, calculate: DividendYieldCalculate, explanation: DividendYieldExplanation },
  { config: CapitalGainsConfig, calculate: CapitalGainsCalculate, explanation: CapitalGainsExplanation },
  { config: StockCagrConfig, calculate: StockCagrCalculate, explanation: StockCagrExplanation },
  { config: GoldInvestmentReturnConfig, calculate: GoldInvestmentReturnCalculate, explanation: GoldInvestmentReturnExplanation },
  { config: RentVsBuyConfig, calculate: RentVsBuyCalculate, explanation: RentVsBuyExplanation },
  { config: CarLoanVsCashConfig, calculate: CarLoanVsCashCalculate, explanation: CarLoanVsCashExplanation },
  { config: EducationLoanConfig, calculate: EducationLoanCalculate, explanation: EducationLoanExplanation },
  { config: WeddingGoalConfig, calculate: WeddingGoalCalculate, explanation: WeddingGoalExplanation },
  { config: ChildEducationPlanningConfig, calculate: ChildEducationPlanningCalculate, explanation: ChildEducationPlanningExplanation },
  { config: HealthInsuranceRequirementConfig, calculate: HealthInsuranceRequirementCalculate, explanation: HealthInsuranceRequirementExplanation },
  { config: LifeInsuranceRequirementConfig, calculate: LifeInsuranceRequirementCalculate, explanation: LifeInsuranceRequirementExplanation },
  { config: CreditCardEmiConfig, calculate: CreditCardEmiCalculate, explanation: CreditCardEmiExplanation },
  { config: LoanBalanceTransferConfig, calculate: LoanBalanceTransferCalculate, explanation: LoanBalanceTransferExplanation },
  { config: FinancialIndependenceDateConfig, calculate: FinancialIndependenceDateCalculate, explanation: FinancialIndependenceDateExplanation },
  { config: CurrencyExchangeConfig, calculate: CurrencyExchangeCalculate, explanation: CurrencyExchangeExplanation },
]
