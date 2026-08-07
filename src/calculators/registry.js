// This file is the single place that "installs" a calculator into the app.
// Calculators are grouped by purpose so they appear in a logical order.
//
// Groups:
// 1. Investing
// 2. Savings & Retirement Accounts
// 3. Loans
// 4. Retirement & Financial Planning
// 5. Education Planning

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

import { config as epfConfig } from './epf/config.js'
import { calculate as epfCalculate } from './epf/formula.js'
import { explanation as epfExplanation } from './epf/explanation.js'


// ============================================================
// LOANS
// ============================================================

import { config as emiConfig } from './EMI/config.js'
import { calculate as emiCalculate } from './EMI/formula.js'
import { explanation as emiExplanation } from './EMI/explanation.js'


// ============================================================
// RETIREMENT & FINANCIAL PLANNING
// ============================================================

import { config as fireConfig } from './fire/config.js'
import { calculate as fireCalculate } from './fire/formula.js'
import { explanation as fireExplanation } from './fire/explanation.js'


// ============================================================
// EDUCATION PLANNING
// ============================================================

import { config as educationConfig } from './education/config.js'
import { calculate as educationCalculate } from './education/formula.js'
import { explanation as educationExplanation } from './education/explanation.js'


// ============================================================
// CALCULATOR REGISTRY
// ============================================================

export const calculators = [

  // ----------------------------------------------------------
  // INVESTING
  // ----------------------------------------------------------

  {
    config: sipConfig,
    calculate: sipCalculate,
    explanation: sipExplanation,
  },

  {
    config: lumpsumConfig,
    calculate: lumpsumCalculate,
    explanation: lumpsumExplanation,
  },

  {
    config: cagrConfig,
    calculate: cagrCalculate,
    explanation: cagrExplanation,
  },

  {
    config: swpConfig,
    calculate: swpCalculate,
    explanation: swpExplanation,
  },


  // ----------------------------------------------------------
  // SAVINGS & RETIREMENT ACCOUNTS
  // ----------------------------------------------------------

  {
    config: fdConfig,
    calculate: fdCalculate,
    explanation: fdExplanation,
  },

  {
    config: rdConfig,
    calculate: rdCalculate,
    explanation: rdExplanation,
  },

  {
    config: ppfConfig,
    calculate: ppfCalculate,
    explanation: ppfExplanation,
  },

  {
    config: epfConfig,
    calculate: epfCalculate,
    explanation: epfExplanation,
  },


  // ----------------------------------------------------------
  // LOANS
  // ----------------------------------------------------------

  {
    config: emiConfig,
    calculate: emiCalculate,
    explanation: emiExplanation,
  },


  // ----------------------------------------------------------
  // RETIREMENT & FINANCIAL PLANNING
  // ----------------------------------------------------------

  {
    config: fireConfig,
    calculate: fireCalculate,
    explanation: fireExplanation,
  },


  // ----------------------------------------------------------
  // EDUCATION PLANNING
  // ----------------------------------------------------------

  {
    config: educationConfig,
    calculate: educationCalculate,
    explanation: educationExplanation,
  },

]