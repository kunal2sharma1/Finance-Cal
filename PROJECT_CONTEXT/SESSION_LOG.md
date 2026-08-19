# FinCalc Session Log

## 2026-08-20 — IJ-01 completion audit + IJ-02 implementation

### IJ-01 closure

- Branch: `workstream-international-jurisdiction`
- IJ-01 implementation starting SHA: `9bc07f8531ee4d89af3d4bc09d36de5060258c83`
- IJ-01 phase-delivery candidate SHA: `6b39020a85cf24626e560a2ed9c0a6c8432c5583`
- IJ-01 verification: manual GitHub Actions **Verify build #488 — GREEN**.
- IJ-01 status: **VERIFIED / GREEN**.
- IJ-02 was unlocked only after this independent verification was supplied.

### IJ-02 starting state

- IJ-02 starting SHA: `6b39020a85cf24626e560a2ed9c0a6c8432c5583`
- Actual branch HEAD matched that SHA before implementation.
- IJ-02 acceptance: each of country, locale, currency, and number system has explicit presentation ownership; formatting cannot silently change calculation jurisdiction; existing calculator behavior remains intact.

### IJ-02 implementation

- Country records in `src/country.js` now contain country identity only (`code`, `name`, `flag`).
- Added `src/locale.js` for country-to-locale ownership.
- Added `src/currency.js` for country-to-currency ownership.
- Added `src/numberSystem.js` for number-system vocabulary, storage, defaults, and number-format locale resolution.
- Added `src/moneyFormat.js` for currency presentation using the explicit currency and number-system modules.
- Updated `src/calculatorLocale.js` so calculator currency no longer reads `country.currency`.
- Updated `src/components/CountrySelector.jsx` to obtain currency and number-system behavior from dedicated presentation modules.
- Updated `src/components/ResultPanel.jsx` to consume the canonical number-system formatter instead of maintaining a duplicate locale mapping.
- Updated `src/useNumberSystem.js` to use the number-system module with an explicit country-driven presentation default.
- Preserved the existing `getCountry()` fallback behavior and did not create a jurisdiction registry.
- Added `scripts/ij02-country-locale-currency-number-check.mjs` for deterministic IJ-02 contract validation.
- Extended the existing international workflow to run the IJ-02 contract check before international, SEO, formula, and build checks.

### Scope audit

GitHub compare from IJ-02 starting SHA shows only presentation/workflow/test files changed. No `src/calculators/*/{formula,config,explanation}.js` files and no `src/internationalCalculators.js` changes were introduced.

### Verification status

Required workflow checks are configured as:

- `node scripts/ij01-domain-contract-check.mjs`
- `node scripts/ij02-country-locale-currency-number-check.mjs`
- `node scripts/international-check.mjs`
- `npm run seo:check`
- `npm run formula:check`
- `npm run build`

Local execution was attempted and is blocked by the execution environment's inability to resolve `github.com`. GitHub tooling available in this session does not expose a branch workflow-dispatch operation, so an exact IJ-02 Actions result cannot be observed from this session.

Therefore IJ-02 is **IMPLEMENTED BUT UNVERIFIED**. It must not be marked GREEN until the workflow is manually run for the exact final SHA and all checks pass.

### Branch-safety correction

During implementation, several new-file writes were initially sent without an explicit branch and landed on `main`. This was detected immediately. `main` was restored to its pre-IJ-02 `c03975f579647ad4e36fef4997fd0b949f08f4af` tree via a normal fast-forward cleanup commit; no force-update was used. The IJ-02 implementation remains on `workstream-international-jurisdiction` only.

### Next phase

IJ-03 must not start automatically. IJ-02 remains the active phase until exact-SHA GREEN verification is obtained.
