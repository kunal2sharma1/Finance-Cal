# FinCalc Product V2 Roadmap

Development branch: `product-v2-development`

Production remains unchanged until all nine phases are complete and the final regression review passes.

## Phase 1 — Production QA
- Validate all existing calculator routes.
- Validate international calculator routes.
- Test country selector and persistence.
- Test Indian vs international number formatting.
- Test currency exchange and API failure handling.
- Check mobile and desktop layouts.
- Check sitemap, canonical URLs, metadata and broken links.

## Phase 2 — Architecture cleanup
- Consolidate calculator catalogs and shared utilities.
- Reduce duplicated calculation/form/result code.
- Formalize global vs country-specific metadata.
- Standardize error handling and API loading states.
- Make adding a calculator predictable and low-risk.

## Phase 3 — High-value calculator expansion
- Add missing global calculators based on usefulness/search demand.
- Add high-value country-specific calculators only where rules are genuinely local.
- Avoid adding calculators solely to increase the count.

## Phase 4 — SEO growth system
- Build reusable calculator content sections.
- Strengthen internal linking between calculators, guides, topics and countries.
- Expand country/category content clusters.
- Improve metadata, canonical handling and sitemap coverage.
- Add FAQ and methodology content where it genuinely helps users.

## Phase 5 — Search & discovery
- Improve global calculator search.
- Add country and category filtering.
- Add popular/recent/related calculator discovery.
- Create decision-oriented pathways between related tools.

## Phase 6 — Trust & transparency
- Add calculation methodology and formulas.
- Add assumptions and estimate disclaimers where appropriate.
- Add source and last-updated information for country-specific rules.
- Clearly distinguish estimates from official calculations.

## Phase 7 — Analytics
- Add privacy-conscious usage measurement.
- Track calculator usage, country, search terms and completion patterns.
- Use the data to prioritize future product work.

## Phase 8 — Performance
- Audit bundle size and loading behavior.
- Lazy-load where useful.
- Improve Core Web Vitals and mobile performance.
- Remove unnecessary client-side work.

## Phase 9 — Monetization preparation
- Identify viable monetization paths.
- Design non-intrusive ad/affiliate/lead-generation placements.
- Do not activate monetization until traffic, user behavior and trust requirements justify it.

## Final release gate
Before merging into `main`:
1. International validation passes.
2. SEO validation passes.
3. Formula regression tests pass.
4. Production build passes.
5. Route/link checks pass.
6. Mobile/desktop regression review passes.
7. One final review of all changed systems.

Then merge once and deploy once.
