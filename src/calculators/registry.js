// This file is the single place that "installs" a calculator into the app.
// To add a new calculator: create its folder (config.js, formula.js,
// explanation.js), import the three pieces below, then add one object
// to the `calculators` array. Nothing else in the app needs to change.

import { config as sipConfig } from './sip/config.js'
import { calculate as sipCalculate } from './sip/formula.js'
import { explanation as sipExplanation } from './sip/explanation.js'

import { config as lumpsumConfig } from './lumpsum/config.js'
import { calculate as lumpsumCalculate } from './lumpsum/formula.js'
import { explanation as lumpsumExplanation } from './lumpsum/explanation.js'

import { config as cagrConfig } from './cagr/config.js'
import { calculate as cagrCalculate } from './cagr/formula.js'
import { explanation as cagrExplanation } from './cagr/explanation.js'

import { config as emiConfig } from './EMI/config.js'
import { calculate as emiCalculate } from './EMI/formula.js'
import { explanation as emiExplanation } from './EMI/explanation.js'

import { config as fdConfig } from './fd/config.js'
import { calculate as fdCalculate } from './fd/formula.js'
import { explanation as fdExplanation } from './fd/explanation.js'

import { config as ppfConfig } from './ppf/config.js'
import { calculate as ppfCalculate } from './ppf/formula.js'
import { explanation as ppfExplanation } from './ppf/explanation.js'

import { config as rdConfig } from './rd/config.js'
import { calculate as rdCalculate } from './rd/formula.js'
import { explanation as rdExplanation } from './rd/explanation.js'

import { config as swpConfig } from './swp/config.js'
import { calculate as swpCalculate } from './swp/formula.js'
import { explanation as swpExplanation } from './swp/explanation.js'

export const calculators = [
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
    config: emiConfig,
    calculate: emiCalculate,
    explanation: emiExplanation,
  },
  {
    config: fdConfig,
    calculate: fdCalculate,
    explanation: fdExplanation,
  },
  {
    config: ppfConfig,
    calculate: ppfCalculate,
    explanation: ppfExplanation,
  },
  {
    config: rdConfig,
    calculate: rdCalculate,
    explanation: rdExplanation,
  },
  {
    config: swpConfig,
    calculate: swpCalculate,
    explanation: swpExplanation,
  },
]
