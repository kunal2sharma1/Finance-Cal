# FinCalc Session Log

## 2026-08-19 — Workstream transition

- Milestone 1 (Phases 1–43) was merged to `main` after Verify #485 was GREEN for the release candidate.
- The old 88-phase roadmap was retired as the active execution model.
- Four independent workstreams were designed: Product Experience, International & Jurisdiction, Platform Quality, Commercial & Analytics.
- Product Experience and International & Jurisdiction are the first active streams.
- Durable AI response and parallel-work protocols were defined.
- Durable `PROJECT_CONTEXT` was merged to `main` as PR #12 at merge SHA `c03975f579647ad4e36fef4997fd0b949f08f4af`.
- Product Experience was synchronized with the canonical context baseline without replacing its workstream roadmap.

## 2026-08-20 — PX-01 inventory

- Starting branch: `workstream-product-experience`.
- Starting SHA: `b3c86b0eb48360dc4eb94b0b507cc1a45f1643e2`.
- Branch HEAD was rechecked before work and matched the recorded infrastructure candidate exactly.
- PX-01 inventory was completed from the actual repository. No product UI redesign was performed.
- Added `PROJECT_CONTEXT/workstreams/PRODUCT_EXPERIENCE/PX-01-INVENTORY.md` documenting existing, partial, gap, risk, preserve and evidence-backed change findings.
- Validated the earlier journey-routing hypothesis: `/journeys/:slug` is implemented through `AppSeo`; the actual confirmed gap is the missing `/journeys` index route and missing first-class journey discovery.
- Confirmed five canonical journey slugs and found stale journey mappings in search intent and calculator metadata.
- Confirmed `calculatorCatalog.js` is the canonical combined calculator catalog, while `AppSeo` direct topic rendering still consumes the core registry, creating a route/data-source divergence risk.
- Confirmed guide/calculator relationships are centralized in `contentModel.js`; no duplicate content model is proposed.
- Updated PX roadmap and current state to record inventory completion with verification pending.
- Exact candidate SHA: `2bf45b28b85ea116722557834c716cf37b2708a5`.
- Verification status: exact-SHA Product Experience workflow still required; no older GREEN run is being reused.

PX-02 has not started.
