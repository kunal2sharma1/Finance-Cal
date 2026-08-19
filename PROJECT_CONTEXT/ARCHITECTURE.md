# FinCalc Architecture Context

FinCalc is a financial calculation and decision product. The existing foundation includes calculator contracts and regression coverage, trust/provenance definitions, search/discovery, content relationships, decision journeys, canonical/indexability SEO controls, production-like SEO validation, build validation, and performance gates.

## Architectural invariants

- Mathematical calculator outputs must remain deterministic and regression-tested.
- Trust/methodology metadata must not be silently weakened.
- Country, locale, currency, number system, and calculation jurisdiction are distinct concepts.
- Search, content, and decision-journey concepts should have canonical representations rather than duplicates.
- Commercial functionality must never become a prerequisite for core calculator correctness.
- Verification must match the exact candidate SHA.
- `main` is the canonical production baseline.

## Workstream ownership

Product Experience owns user-facing flows and decision UX.
International & Jurisdiction owns jurisdiction and country support contracts.
Platform Quality owns reliability, accessibility, browser/visual regression, performance, and CI quality.
Commercial & Analytics owns measurement and commercial architecture.
