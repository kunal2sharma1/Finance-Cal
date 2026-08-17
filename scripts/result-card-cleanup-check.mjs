import { readFileSync } from 'node:fs'

const panel = readFileSync('src/components/ResultPanel.jsx', 'utf8')
const css = readFileSync('src/components/result-interpretation.css', 'utf8')

const failures = []
const assert = (condition, message) => {
  if (!condition) failures.push(message)
}

assert(panel.includes('result-panel__primary'), 'Primary result block missing')
assert(panel.includes('result-panel__interpretation'), 'Interpretation block missing')
assert(panel.includes('result-panel__bar'), 'Breakdown bar missing')
assert(panel.includes('result-panel__list'), 'Secondary metrics list missing')

const primaryIndex = panel.indexOf('result-panel__primary')
const interpretationIndex = panel.indexOf('result-panel__interpretation')
const breakdownIndex = panel.indexOf('result-panel__bar')
const listIndex = panel.indexOf('result-panel__list')
assert(primaryIndex < interpretationIndex, 'Primary result must precede interpretation')
assert(interpretationIndex < breakdownIndex, 'Interpretation must precede breakdown')
assert(breakdownIndex < listIndex, 'Breakdown must precede secondary metrics')

assert(css.includes('@media (max-width: 560px)'), 'Mobile result-card cleanup styles are missing')
assert(css.includes('padding: 11px 12px'), 'Mobile interpretation card spacing was not reduced')
assert(css.includes('margin-bottom: 16px'), 'Mobile interpretation vertical density was not reduced')

if (failures.length) {
  console.error('Result-card cleanup validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Result-card cleanup validation passed.')
