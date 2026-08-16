// This file is the single place that "installs" a calculator into the app.
// To add a new calculator: create its folder (config.js, formula.js,
// explanation.js), import the three pieces below, then add one object
// to the `calculators` array. Nothing else in the app needs to change.
// Cloudflare deployment trigger: Lumpsum calculator files are present on main.

import { config as sipConfig } from './sip/config.js'
import { calculate as sipCalculate } from './sip/formula.js'
import { explanation as sipExplanation } from './sip/explanation.js'

import { config as lumpsumConfig } from './lumpsum/config.js'
import { calculate as lumpsumCalculate } from './lumpsum/formula.js'
import { explanation as lumpsumExplanation } from './lumpsum/explanation.js'

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
