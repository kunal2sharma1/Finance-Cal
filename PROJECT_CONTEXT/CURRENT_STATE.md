# FinCalc Current State

## International & Jurisdiction

- Branch: `workstream-international-jurisdiction`
- IJ-01 status: **IMPLEMENTED BUT UNVERIFIED**
- Current completed phase: **none release-qualified** for this workstream
- Next executable phase: **IJ-02 — Country/locale/currency/number separation**, blocked until IJ-01 is GREEN
- IJ-01 starting SHA: `9bc07f8531ee4d89af3d4bc09d36de5060258c83`
- Current audit head before verification changes: `531dc69e4150b0ebce664fb41de159a035c11a66`

### Canonical IJ vocabulary

- `countryCode` — geographic/legal market identity.
- `locale` — presentation locale.
- `currencyCode` — monetary unit.
- `numberSystem` — numeric presentation convention.
- `jurisdictionId` — calculation-rule identity.

### Important invariant

Presentation metadata must not select or silently change calculation jurisdiction. Unsupported calculation jurisdictions must be explicit; they must never silently fall back to another jurisdiction.

### IJ-01 audit finding

The domain inventory and separation contract are present and the implementation diff from the IJ-01 starting SHA contains only project-context/verification-infrastructure changes; no calculator formula/config/explanation implementation or international calculator registry change was found.

The existing application still stores some presentation metadata together in `src/country.js` and uses calculator `countries` arrays as localized calculator mappings. The inventory correctly identifies the country fallback behavior as a UI compatibility fallback rather than a jurisdiction fallback, and identifies `config.countries` as an overloaded mapping to be separated in later phases.

### Verification state

A focused `scripts/ij01-domain-contract-check.mjs` was added. The existing international workflow was updated to run on `workstream-international-jurisdiction` and to execute the IJ-01 contract check before international, SEO, formula, and build checks.

The exact current branch SHA has not yet produced an observable GREEN workflow result through the available GitHub tooling. Local repository execution remains blocked because the environment cannot resolve `github.com`. Therefore IJ-01 remains IMPLEMENTED BUT UNVERIFIED.
