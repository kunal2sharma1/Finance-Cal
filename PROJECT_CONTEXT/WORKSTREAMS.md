# FinCalc Workstream Plan

## Workstream C — International & Jurisdiction

Branch: `workstream-international-jurisdiction`

Objective: establish a clean separation between presentation locale, country, currency, number system, and calculation jurisdiction so future country expansion does not create hidden coupling.

### Work packages

1. **Conceptual separation**
   - Define country, locale, currency, number system, and calculation jurisdiction as distinct concepts.
   - Document precedence and fallback rules.

2. **Jurisdiction model**
   - Establish explicit jurisdiction identifiers and metadata.
   - Define which calculations require jurisdiction-specific rules.
   - Keep unsupported jurisdictions explicit rather than silently falling back.

3. **International routing and SEO contracts**
   - Connect country/jurisdiction metadata to indexable routes only where supported.
   - Preserve canonical URL and indexability policies.

4. **Country readiness model**
   - Define required data, source, methodology, and calculation coverage before a country is marked ready.
   - Add deterministic readiness validation.

5. **Search-intent metadata integration**
   - Connect existing search-intent metadata to SEO without duplicating search/content models.

6. **International regression gates**
   - Validate route, locale, currency, jurisdiction, and country-readiness invariants.

### Dependency rule

This workstream owns the jurisdiction contract. Other workstreams may consume the stable public contract but must not create parallel country/currency/jurisdiction representations.

### Completion criteria

- Concepts are explicitly separated in code and documentation.
- Unsupported jurisdiction behavior is deterministic.
- Country readiness is machine-checkable.
- SEO/indexability remains correct.
- Existing calculator and trust gates remain GREEN.
