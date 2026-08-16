import assert from 'node:assert/strict'
import { calculators } from '../src/calculators/registry.js'
import { buildCalculatorPath, findCalculatorByRouteId, isCanonicalCalculatorPath } from '../src/routeUtils.js'

assert.equal(calculators.length, 78, 'Route check expects the current 78-calculator registry')

const seenPaths = new Set()
for (const calculator of calculators) {
  const id = calculator.config.id
  const path = buildCalculatorPath(id)

  assert.ok(id, 'Every calculator must have an ID')
  assert.ok(!seenPaths.has(path), `Duplicate canonical calculator route: ${path}`)
  seenPaths.add(path)

  assert.equal(findCalculatorByRouteId(calculators, id)?.config.id, id)
  assert.equal(findCalculatorByRouteId(calculators, id.toUpperCase())?.config.id, id)
  assert.equal(isCanonicalCalculatorPath(path, id), true)
}

assert.equal(findCalculatorByRouteId(calculators, 'does-not-exist'), null)
assert.equal(isCanonicalCalculatorPath('/calculators/EMI', 'emi'), false)
assert.equal(buildCalculatorPath('sip-vs-lumpsum'), '/calculators/sip-vs-lumpsum')

console.log(`Route checks passed for ${calculators.length} calculators.`)
