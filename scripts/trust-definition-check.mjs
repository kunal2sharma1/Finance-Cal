import { trustDefinitions } from '../src/trustDefinitions.js'
import { trustMetadata } from '../src/trustMetadata.js'
import { isValidTrustDefinition } from '../src/trustDefinition.js'

const failures = []

for (const [calculatorId, metadata] of Object.entries(trustMetadata)) {
  const definition = trustDefinitions[calculatorId]
  if (!definition) {
    failures.push(`Missing TrustDefinition: ${calculatorId}`)
    continue
  }

  if (!isValidTrustDefinition(definition)) {
    failures.push(`Invalid TrustDefinition: ${calculatorId}`)
  }

  if (definition.sources[0]?.url !== metadata.sourceUrl) {
    failures.push(`Trust source mismatch: ${calculatorId}`)
  }

  if (definition.reviewedAt !== metadata.reviewed) {
    failures.push(`Trust review-date mismatch: ${calculatorId}`)
  }
}

if (failures.length > 0) {
  console.error('TrustDefinition validation failed:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`TrustDefinition validation passed: ${Object.keys(trustDefinitions).length} normalized definitions.`)
