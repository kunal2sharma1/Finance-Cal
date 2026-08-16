import { readFile } from 'node:fs/promises'

const files = [
  'src/commercial.js',
  'src/components/CommercialPlacement.jsx',
  'src/components/CommercialDisclosure.jsx',
]

const failures = []
for (const file of files) {
  const content = await readFile(file, 'utf8')
  if (!content.trim()) failures.push(`Empty commercial file: ${file}`)
}

const commercial = await readFile('src/commercial.js', 'utf8')
if (!commercial.includes('VITE_COMMERCIAL_ENABLED')) failures.push('Commercial feature flag is missing.')
if (!commercial.includes("return null")) failures.push('Commercial placements must be disabled by default.')

const placement = await readFile('src/components/CommercialPlacement.jsx', 'utf8')
if (!placement.includes('Affiliate')) failures.push('Commercial placement component must identify affiliate placement semantics.')

if (failures.length) {
  console.error('Commercial validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('Commercial validation passed.')
