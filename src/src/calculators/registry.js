// This file is the single place that "installs" a calculator into the app.
// To add a new calculator: create its folder and export its config,
// calculate function, and explanation, then add one object to the array.

import { config as sipConfig } from './sip/config.js'
import { calculate as sipCalculate } from './sip/formula.js'
import { explanation as sipExplanation } from './sip/explanation.js'

import {
  config as lumpsumConfig,
  calculate as lumpsumCalculate,
  explanation as lumpsumExplanation,
} from './lumpsum/index.js'

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
]
