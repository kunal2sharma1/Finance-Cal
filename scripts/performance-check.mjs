import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const failures = []
const warnings = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function walk(directory) {
  const files = []
  if (!existsSync(directory)) return files
  for (const name of readdirSync(directory)) {
    const path = join(directory, name)
    const stat = statSync(path)
    if (stat.isDirectory()) files.push(...walk(path))
    else files.push({ path, bytes: stat.size })
  }
  return files
}

const files = walk(dist)
assert(files.length > 0, 'Production build directory is empty or missing.')
assert(existsSync(join(dist, 'index.html')), 'Missing dist/index.html.')

const jsBytes = files.filter(({ path }) => /\\.(?:js|mjs)$/.test(path)).reduce((sum, file) => sum + file.bytes, 0)
const cssBytes = files.filter(({ path }) => /\\.css$/.test(path)).reduce((sum, file) => sum + file.bytes, 0)
const assetBytes = files.reduce((sum, file) => sum + file.bytes, 0)

const budgets = {
  javascript: 700 * 1024,
  css: 300 * 1024,
  total: 2 * 1024 * 1024,
}

if (jsBytes > budgets.javascript) failures.push(`JavaScript bundle budget exceeded: ${jsBytes} bytes > ${budgets.javascript} bytes.`)
if (cssBytes > budgets.css) failures.push(`CSS bundle budget exceeded: ${cssBytes} bytes > ${budgets.css} bytes.`)
if (assetBytes > budgets.total) failures.push(`Total build budget exceeded: ${assetBytes} bytes > ${budgets.total} bytes.`)

const largestFiles = [...files].sort((a, b) => b.bytes - a.bytes).slice(0, 5)
for (const file of largestFiles) {
  if (file.bytes > 500 * 1024) warnings.push(`Large asset (${file.bytes} bytes): ${file.path}`)
}

console.log('FinCalc Performance Budget')
console.log(`JavaScript: ${(jsBytes / 1024).toFixed(1)} KB / ${(budgets.javascript / 1024).toFixed(0)} KB`)
console.log(`CSS: ${(cssBytes / 1024).toFixed(1)} KB / ${(budgets.css / 1024).toFixed(0)} KB`)
console.log(`Total build: ${(assetBytes / 1024).toFixed(1)} KB / ${(budgets.total / 1024).toFixed(0)} KB`)

if (warnings.length) {
  console.log('Performance warnings:')
  for (const warning of warnings) console.log(`- ${warning}`)
}

if (failures.length) {
  console.error('Performance validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Performance validation passed.')
