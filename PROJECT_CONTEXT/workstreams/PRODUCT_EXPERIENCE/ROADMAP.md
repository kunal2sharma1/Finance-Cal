# Product Experience Roadmap

Branch: `workstream-product-experience`

## PX-01 — Product inventory and decision architecture
Status: IN_PROGRESS — inventory complete; exact-SHA CI verification pending

Goal: map existing homepage, search, calculators, guides, journeys, result flows, and navigation before changing UX.

Acceptance: documented current flows; no duplicate architecture proposed; critical user journeys identified; baseline browser/CI checks GREEN.

Execution record: `PROJECT_CONTEXT/workstreams/PRODUCT_EXPERIENCE/PX-01-INVENTORY.md` documents the actual repository inventory. No product UI redesign was performed. PX-01 is not marked COMPLETE until the Product Experience workflow is GREEN for the exact final SHA.

## PX-02 — Decision-oriented entry experience
Depends on: PX-01

Goal: make the primary entry experience clearly route users by intent.

Acceptance: key intents lead to existing calculators/content/journeys; responsive; accessible; no regression in canonical/indexable routes.

## PX-03 — Decision graph integration
Depends on: PX-02

Goal: connect search → journey → calculator → result → next decision.

Acceptance: representative journeys complete end-to-end; links are deterministic; existing decision contracts remain intact.

## PX-04 — Result-to-next-action UX
Depends on: PX-03

Goal: make calculator results actionable without changing mathematical outputs.

Acceptance: relevant next actions appear; certainty/interpretation policies remain intact; no misleading recommendation language.

## PX-05 — Search/content/calculator integration
Depends on: PX-03

Goal: improve discovery and cross-navigation using existing intent-aware search and canonical content relationships.

Acceptance: search results, guides, calculators, and journeys cross-link coherently; no duplicate content model.

## PX-06 — Product mobile/browser qualification
Depends on: PX-02 through PX-05

Goal: qualify the complete product experience across representative desktop/mobile viewports.

Acceptance: browser regression, accessibility, route integrity, and critical journey checks GREEN.

## PX-07 — Workstream release qualification
Depends on: PX-06

Goal: freeze the workstream and prepare PR.

Acceptance: full verification GREEN against exact SHA; documentation updated; no unresolved RED; PR ready.
