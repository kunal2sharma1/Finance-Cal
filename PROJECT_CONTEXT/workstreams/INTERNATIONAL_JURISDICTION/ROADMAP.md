# International & Jurisdiction Roadmap

Branch: `workstream-international-jurisdiction`

## IJ-01 — Domain inventory and separation contract
Status: VERIFIED / GREEN

Goal: inventory existing country, locale, currency, number-format, and jurisdiction behavior and define canonical concepts.

Acceptance: current coupling documented; canonical identifiers defined; no duplicate model introduced; targeted verification and required regression checks GREEN against the exact final SHA.

Delivery: `PROJECT_CONTEXT/workstreams/INTERNATIONAL_JURISDICTION/DOMAIN_INVENTORY.md` defines the canonical separation contract and documents current implementation coupling. No calculator formulas or jurisdiction rules were changed.

Verification: manual GitHub Actions verification **Verify build #488 — GREEN** for phase-delivery candidate `6b39020a85cf24626e560a2ed9c0a6c8432c5583`.

## IJ-02 — Country/locale/currency/number separation
Status: IMPLEMENTED BUT UNVERIFIED

Depends on: IJ-01

Goal: separate presentation locale, country, currency, number system, and calculation jurisdiction.

Acceptance: each concept has explicit ownership; formatting cannot silently change calculation jurisdiction; existing calculator tests remain GREEN.

Implementation: country records now own country identity only; locale, currency, number-system vocabulary/state, and money formatting have dedicated presentation modules; calculator presentation and result formatting consume those modules; existing country fallback compatibility is preserved; no jurisdiction registry was introduced.

Verification candidate: `f8d683f04639a1bda4aebb3cba713b0bcaed50d2` after the final code/test corrections. The established international workflow includes the IJ-02 contract check before international, SEO, formula, and build regression checks.

Verification state: IJ-02 implementation is committed, but the exact final branch SHA has not yet been verified GREEN. Do not begin IJ-03 until exact-SHA verification passes.

## IJ-03 — Calculation jurisdiction architecture
Depends on: IJ-02

Goal: introduce explicit jurisdiction identifiers, supported/unsupported states, and rule ownership.

Acceptance: jurisdiction-sensitive calculators declare requirements; unsupported jurisdictions are explicit; no silent fallback.

## IJ-04 — Country readiness framework
Depends on: IJ-03

Goal: make country support machine-checkable.

Acceptance: readiness covers required rules, sources, methodology, routes, and calculator coverage; incomplete countries cannot be represented as fully ready.

## IJ-05 — International SEO and routing
Depends on: IJ-02, IJ-04

Goal: connect supported country/jurisdiction metadata to routing, canonical URLs, and indexability.

Acceptance: unsupported combinations are not indexed; sitemap and canonical policies remain correct.

## IJ-06 — Search-intent metadata to SEO
Depends on: IJ-05

Goal: connect existing search-intent metadata to SEO without duplicating search/content models.

Acceptance: metadata is deterministic, canonical, and covered by verification.

## IJ-07 — International qualification
Depends on: IJ-01 through IJ-06

Goal: full international/jurisdiction regression qualification.

Acceptance: all international, calculator, trust, SEO, build, and performance gates GREEN against exact SHA.
