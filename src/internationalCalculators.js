import { config as us401kConfig } from './calculators/401k/config.js'
import { calculate as us401kCalculate } from './calculators/401k/formula.js'
import { explanation as us401kExplanation } from './calculators/401k/explanation.js'
import { config as rothIraConfig } from './calculators/roth-ira/config.js'
import { calculate as rothIraCalculate } from './calculators/roth-ira/formula.js'
import { explanation as rothIraExplanation } from './calculators/roth-ira/explanation.js'
import { config as ukIsaConfig } from './calculators/uk-isa/config.js'
import { calculate as ukIsaCalculate } from './calculators/uk-isa/formula.js'
import { explanation as ukIsaExplanation } from './calculators/uk-isa/explanation.js'
import { config as ukPensionConfig } from './calculators/uk-pension/config.js'
import { calculate as ukPensionCalculate } from './calculators/uk-pension/formula.js'
import { explanation as ukPensionExplanation } from './calculators/uk-pension/explanation.js'
import { config as canadaTfsaConfig } from './calculators/canada-tfsa/config.js'
import { calculate as canadaTfsaCalculate } from './calculators/canada-tfsa/formula.js'
import { explanation as canadaTfsaExplanation } from './calculators/canada-tfsa/explanation.js'
import { config as canadaRrspConfig } from './calculators/canada-rrsp/config.js'
import { calculate as canadaRrspCalculate } from './calculators/canada-rrsp/formula.js'
import { explanation as canadaRrspExplanation } from './calculators/canada-rrsp/explanation.js'
import { config as singaporeCpfConfig } from './calculators/singapore-cpf/config.js'
import { calculate as singaporeCpfCalculate } from './calculators/singapore-cpf/formula.js'
import { explanation as singaporeCpfExplanation } from './calculators/singapore-cpf/explanation.js'

export const internationalCalculators = [
  { config: us401kConfig, calculate: us401kCalculate, explanation: us401kExplanation },
  { config: rothIraConfig, calculate: rothIraCalculate, explanation: rothIraExplanation },
  { config: ukIsaConfig, calculate: ukIsaCalculate, explanation: ukIsaExplanation },
  { config: ukPensionConfig, calculate: ukPensionCalculate, explanation: ukPensionExplanation },
  { config: canadaTfsaConfig, calculate: canadaTfsaCalculate, explanation: canadaTfsaExplanation },
  { config: canadaRrspConfig, calculate: canadaRrspCalculate, explanation: canadaRrspExplanation },
  { config: singaporeCpfConfig, calculate: singaporeCpfCalculate, explanation: singaporeCpfExplanation },
]
