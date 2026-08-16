import { config as savingsRateConfig } from './calculators/savings-rate/config.js'
import { calculate as savingsRateCalculate } from './calculators/savings-rate/formula.js'
import { explanation as savingsRateExplanation } from './calculators/savings-rate/explanation.js'
import { config as realReturnConfig } from './calculators/real-return/config.js'
import { calculate as realReturnCalculate } from './calculators/real-return/formula.js'
import { explanation as realReturnExplanation } from './calculators/real-return/explanation.js'
import { config as bondReturnConfig } from './calculators/bond-return/config.js'
import { calculate as bondReturnCalculate } from './calculators/bond-return/formula.js'
import { explanation as bondReturnExplanation } from './calculators/bond-return/explanation.js'
import { config as autoLoanConfig } from './calculators/auto-loan/config.js'
import { calculate as autoLoanCalculate } from './calculators/auto-loan/formula.js'
import { explanation as autoLoanExplanation } from './calculators/auto-loan/explanation.js'
import { config as debtToIncomeConfig } from './calculators/debt-to-income/config.js'
import { calculate as debtToIncomeCalculate } from './calculators/debt-to-income/formula.js'
import { explanation as debtToIncomeExplanation } from './calculators/debt-to-income/explanation.js'

export const phase3Calculators = [
  { config: savingsRateConfig, calculate: savingsRateCalculate, explanation: savingsRateExplanation },
  { config: realReturnConfig, calculate: realReturnCalculate, explanation: realReturnExplanation },
  { config: bondReturnConfig, calculate: bondReturnCalculate, explanation: bondReturnExplanation },
  { config: autoLoanConfig, calculate: autoLoanCalculate, explanation: autoLoanExplanation },
  { config: debtToIncomeConfig, calculate: debtToIncomeCalculate, explanation: debtToIncomeExplanation },
]
