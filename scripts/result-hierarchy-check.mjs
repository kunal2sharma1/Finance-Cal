import { readFileSync } from 'node:fs'

const failures = []
const panelPath = new URL('../src/components/ResultPanel.jsx', import.meta.url)
const cssPath = new URL('../src/components/result-interpretation.css', import.meta.url)
const panel = readFileSync(panelPath, 'utf8')
const css = readFileSync(cssPath, 'utf8')

function assert(condition, message) {
  if (!condition) failures.push(message)
}

const primaryIndex = panel.indexOf('result-panel__primary')
const interpretationIndex = panel.indexOf('result-panel__interpretation')
const breakdownIndex = panel.indexOf('result-panel__bar')
const secondaryIndex = panel.indexOf('result-panel__list')

assert(primaryIndex >= 0, 'Primary result block is missing')
assert(interpretationIndex >= 0, 'Result interpretation block is missing')
assert(breakdownIndex >= 0, 'Result breakdown block is missing')
assert(secondaryIndex >= 0, 'Secondary result list is missing')

if ([primaryIndex, interpretationIndex, breakdownIndex, secondaryIndex].every((value) => value >= 0)) {
  assert(primaryIndex < interpretationIndex, 'Primary result must precede interpretation')
  assert(interpretationIndex < breakdownIndex, 'Interpretation must precede the breakdown')
  assert(breakdownIndex < secondaryIndex, 'Breakdown must precede secondary metrics')
}

assert(panel.includes('Boolean(resultCertainty)'), 'Result certainty must drive the interpretation block')
assert(panel.includes('result-panel__interpretation" aria-label={`Result certainty:'), 'Interpretation block must expose accessible certainty semantics')
assert(panel.includes('resultCertaintyNote &&'), 'Certainty note should be rendered when available')
assert(panel.includes('results.isValid === false'), 'Invalid-result state must suppress normal result hierarchy')
assert(panel.includes('results.loading'), 'Loading state must be handled explicitly')
assert(css.includes('.result-panel__interpretation'), 'Interpretation styles are missing')
assert(css.includes('@media (max-width: 560px)'), 'Interpretation mobile treatment is missing')

if (failures.length) {
  console.error('Result hierarchy validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Result hierarchy validation passed.')
console.log('Primary → interpretation → breakdown → secondary metrics ordering confirmed.')
