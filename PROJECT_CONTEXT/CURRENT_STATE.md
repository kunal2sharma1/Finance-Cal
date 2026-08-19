# FinCalc Current State

## International & Jurisdiction

- Branch: `workstream-international-jurisdiction`
- IJ-01 status: **VERIFIED / GREEN**
- IJ-01 verification: manual GitHub Actions **Verify build #488 — GREEN** for candidate `6b39020a85cf24626e560a2ed9c0a6c8432c5583`
- Current phase: **IJ-02 — Country/locale/currency/number separation**
- IJ-02 status: **IMPLEMENTED BUT UNVERIFIED**
- Next phase: **IJ-03 — Calculation jurisdiction architecture**, blocked until IJ-02 is GREEN
- IJ-01 starting SHA: `9bc07f8531ee4d89af3d4bc09d36de5060258c83`
- IJ-02 starting SHA: `6b39020a85cf24626e560a2ed9c0a6c8432c5583`

### Canonical IJ vocabulary

- `countryCode` — geographic/legal market identity.
- `locale` — presentation locale.
- `currencyCode` — monetary unit.
- `numberSystem` — numeric presentation convention.
- `jurisdictionId` — calculation-rule identity.

### Important invariant

Presentation metadata must not select or silently change calculation jurisdiction. Unsupported calculation jurisdictions must be explicit; they must never silently fall back to another jurisdiction.

### IJ-02 implementation state

Country records in `src/country.js` now own country identity only. Locale, currency, number-system state/vocabulary, and money formatting are owned by dedicated presentation modules. Calculator currency and result formatting consume those modules rather than reading presentation metadata from the country object.

Existing country selection fallback behavior remains unchanged for compatibility. No calculator formula/config/explanation implementation and no international calculator registry were changed.

### Verification state

The IJ-02 contract check is included in `.github/workflows/verify-international.yml` before international, SEO, formula, and build regression checks. Local execution is blocked because the environment cannot resolve `github.com`. The exact IJ-02 candidate must receive GREEN through the established manual GitHub Actions workflow before IJ-02 is marked complete and IJ-03 is unlocked.
