# FinCalc Current State

## International & Jurisdiction

- Branch: `workstream-international-jurisdiction`
- Current completed phase: **IJ-01 — Domain inventory and separation contract**
- Next phase: **IJ-02 — Country/locale/currency/number separation**
- IJ-01 starting SHA: `9bc07f8531ee4d89af3d4bc09d36de5060258c83`
- IJ-01 final SHA: recorded in `SESSION_LOG.md` after final verification.

### Canonical IJ vocabulary

- `countryCode` — geographic/legal market identity.
- `locale` — presentation locale.
- `currencyCode` — monetary unit.
- `numberSystem` — numeric presentation convention.
- `jurisdictionId` — calculation-rule identity.

### Important invariant

Presentation metadata must not select or silently change calculation jurisdiction. Unsupported calculation jurisdictions must be explicit; they must never silently fall back to another jurisdiction.

### Current implementation note

The existing application still stores some presentation metadata together in `src/country.js` and uses calculator `countries` arrays as localized calculator mappings. These are documented as IJ-02/IJ-03 separation targets rather than duplicated in IJ-01.

### Verification limitation

The repository's international workflow is configured to run on `global-development`, not this workstream branch. The GitHub connector reports no workflow run associated with the IJ-01 final SHA. Local execution was attempted but the execution environment could not resolve `github.com`, so npm-based verification could not be run locally. No GREEN CI result is claimed for the final SHA.
