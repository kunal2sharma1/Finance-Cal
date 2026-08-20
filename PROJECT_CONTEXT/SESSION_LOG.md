# FinCalc Session Log

## 2026-08-19 — Workstream transition

- Milestone 1 (Phases 1–43) was merged to `main` after Verify #485 was GREEN for the release candidate.
- The old 88-phase roadmap was retired as the active execution model.
- Four independent workstreams were designed: Product Experience, International & Jurisdiction, Platform Quality, Commercial & Analytics.
- Product Experience and International & Jurisdiction are the first active streams.
- Durable AI response and parallel-work protocols were defined.
- A context-sync branch was used to establish the durable `PROJECT_CONTEXT` foundation on `main` before active work proceeded.
- The context foundation was then merged to `main`, after which active workstream branches were refreshed from the resulting baseline.
- Durable `PROJECT_CONTEXT` was merged to `main` as PR #12 at merge SHA `c03975f579647ad4e36fef4997fd0b949f08f4af`.
- Product Experience was synchronized with the canonical context baseline without replacing its workstream roadmap.

## 2026-08-20 — PX-01 inventory and PX-02 closeout

- Starting branch: `workstream-product-experience`.
- Starting SHA: `b3c86b0eb48360dc4eb94b0b507cc1a45f1643e2`.
- Branch HEAD was rechecked before work and matched the recorded infrastructure candidate exactly.
- PX-01 inventory was completed from the actual repository. No product UI redesign was performed.
- Added `PROJECT_CONTEXT/workstreams/PRODUCT_EXPERIENCE/PX-01-INVENTORY.md` documenting existing, partial, gap, risk, preserve and evidence-backed change findings.
- Validated the earlier journey-routing hypothesis: `/journeys/:slug` is implemented through `AppSeo`; the actual confirmed gap is the missing `/journeys` index route and missing first-class journey discovery.
- Confirmed five canonical journey slugs and found stale journey mappings in search intent and calculator metadata.
- Confirmed `calculatorCatalog.js` is the canonical combined calculator catalog, while `AppSeo` direct topic rendering still consumes the core registry, creating a route/data-source divergence risk.
- Confirmed guide/calculator relationships are centralized in `contentModel.js`; no duplicate content model is proposed.
- PX-02 decision-oriented entry experience work was completed without introducing a second search, catalog, content, or journey architecture.
- The Product Experience workflow reached GREEN for exact candidate SHA `53e50a4029aeea590d5e57d787c876a9d1a98539` after the search-intent and zero-result recovery expectations were aligned with the canonical `home-buying` journey slug.
- PX-01 and PX-02 are now closed. PX-03 — Decision graph integration — is the next phase and has not started.

## Verification rule

Exact-SHA GREEN is required before a phase is considered complete. Older GREEN results are not reused for newer candidates.
