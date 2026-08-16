# FinCalc Product V2 Roadmap

This branch contains the next product-development cycle. Production `main` remains unchanged until all phases are complete and the full regression pass succeeds.

## Phase 1 — Production QA
- Test all existing calculators after the international release.
- Test country selector and country pages.
- Test Indian vs international number formatting.
- Test dynamic currency exchange and error states.
- Validate routes, sitemap, metadata, canonical URLs and console errors.

## Phase 2 — Architecture Cleanup
- Simplify calculator registry/catalog boundaries.
- Consolidate shared calculation and formatting utilities.
- Improve error handling and API boundaries.
- Remove unnecessary duplication.
- Make adding a new calculator predictable and low-risk.

## Phase 3 — High-Value Calculator Expansion
- Identify missing global calculators by usefulness and demand.
- Expand priority country-specific calculators in existing markets.
- Avoid adding calculators only to increase the headline count.

## Phase 4 — SEO Growth System
- Build calculator content clusters.
- Add methodology, formulas, examples, assumptions, FAQs and related tools.
- Strengthen internal links between country, category, calculator and guide pages.
- Improve structured data and metadata where useful.

## Phase 5 — Search & Discovery
- Upgrade global search across calculators and guides.
- Improve country/category filtering.
- Add popular/recently used and related-calculator discovery.
- Introduce decision-oriented entry points such as “What are you trying to calculate?”.

## Phase 6 — Trust & Transparency
- Add calculation methodology and assumptions.
- Add last-updated/source information for rules-based calculators.
- Clearly distinguish estimates from official calculations.
- Add appropriate financial-use disclaimers.

## Phase 7 — Analytics
- Add privacy-conscious measurement of calculator usage, search behavior, country/category usage and key exits.
- Use data to decide what to improve next.

## Phase 8 — Performance
- Reduce unnecessary JavaScript and CSS.
- Lazy-load where beneficial.
- Improve Core Web Vitals and mobile performance.
- Verify route and calculator loading performance.

## Phase 9 — Monetization Preparation
- Prepare, but do not prematurely activate, monetization surfaces.
- Define ad/affiliate/lead-generation boundaries and compliance requirements.
- Only activate monetization after meaningful usage data exists.

## Final Gate
Before merging to `main`:
1. Full calculator regression tests.
2. SEO validation.
3. International validation.
4. Production build.
5. Route/link/sitemap validation.
6. Desktop and mobile QA.
7. Final review of the complete diff.

## Merge Rule
All work may use multiple commits on `product-v2-development`, but `main` should receive the completed cycle through one final merge/deployment.