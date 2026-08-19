# PX-01 Product Inventory & Decision Architecture

Branch: `workstream-product-experience`
Starting SHA: `b3c86b0eb48360dc4eb94b0b507cc1a45f1643e2`
Scope: inventory only; no PX-02 redesign or new UX system proposed.

## Acceptance criteria

- Map the current homepage, discovery, search, calculator, guide, journey, result, routing and SEO flows from the actual code.
- Classify findings as EXISTING, PARTIAL, GAP, RISK, PRESERVE or CHANGE.
- Identify critical user journeys and where they currently connect or disconnect.
- Reuse canonical calculator, content and decision-journey contracts; do not propose duplicate systems.
- Record concrete changes only where repository evidence justifies them.

## 1. Primary entry / homepage

**EXISTING** — `/` is rendered by `App` through `AppSeo`. The header provides the FinCalc mark, global `SiteSearch`, and `CountrySelector`. `Home` presents the calculator portfolio, country-aware availability, calculator search, category tabs and topic-hub links.

**EXISTING** — Home calculator filtering delegates text search to the canonical `searchSite()` implementation rather than maintaining a second search index.

**PARTIAL** — The primary entry experience is calculator-first rather than decision-first. The homepage copy says users can choose a tool based on the decision, but there is no first-class journey/intent entry surface. Decision journeys exist elsewhere in the codebase but are not linked from Home.

**PRESERVE** — Existing Home search, category filtering, country-aware calculator availability and shared calculator cards should remain the foundation.

## 2. Calculator discovery and catalog

**EXISTING** — `src/calculatorCatalog.js` is the canonical discovery registry. It combines core, international and Phase 3 calculators and exposes lookup/category/country helpers.

**EXISTING** — `Home`, topic hubs, country pages and calculator pages consume calculator catalog data.

**RISK** — Some older surfaces still import the core `src/calculators/registry.js` directly. `AppSeo` uses the core registry when rendering direct topic-hub routes, while the normal `App` path passes the full `calculatorCatalog`. This creates a potential surface-specific catalog divergence.

**CHANGE** — Treat `calculatorCatalog.js` as the sole user-facing discovery source and audit direct-route consumers before any redesign. Do not replace the registry during PX-01.

## 3. Search, intent and recovery

**EXISTING** — `SiteSearch` searches calculators and guides using `searchSite()` and supports Ctrl/Cmd-K keyboard focus.

**EXISTING** — Search has a dedicated index, intent detection, scoring, vocabulary recovery, typo correction, synonym expansion and zero-result recovery.

**EXISTING** — Calculator search ranking uses calculator metadata including intent, domain and primary journey.

**PARTIAL** — Search returns only calculator and guide results. Decision journeys are not first-class search results even though search intent can infer a `journey` value.

**RISK** — `searchIntent.js` maps several domains to journey slugs that do not match the five canonical `decisionJourneys.js` slugs (for example `home-and-borrowing`, `debt-free`, `career-finance`, `tax-planning`, `education-planning`, `risk-protection`, `financial-health`). This makes journey metadata unreliable as a navigational contract.

**RISK** — `calculatorMeta.js` contains the same stale journey mapping pattern. Its `primaryJourney` values do not consistently resolve to the canonical decision journey definitions.

**PRESERVE** — Existing search engine, index, intent detection, recovery and scoring architecture. PX-01 does not justify a search rewrite.

## 4. Topic/category hubs

**EXISTING** — Six canonical topic hubs exist: investing, loans, salary, retirement, budgeting and financial planning. Each declares calculator IDs, SEO metadata and explanatory copy.

**EXISTING** — Topic hubs expose related guides before calculator cards.

**PARTIAL** — Direct special-route rendering in `AppSeo` passes `src/calculators/registry.js` into `TopicHub`, while normal `App` routing passes the full `calculatorCatalog`. This can cause direct topic URLs to expose a narrower calculator set than the application homepage.

**PRESERVE** — Topic hub domain model and calculator ID lists.

## 5. Decision journeys

**EXISTING** — `decisionJourneys.js` defines five canonical journeys: wealth-building, retirement-planning, home-buying, debt-management and job-offer-comparison. Each resolves real calculator steps and guide content through canonical contracts.

**EXISTING** — `DecisionJourney.jsx` renders the journey question, ordered calculator steps and supporting guides. Each step links to the canonical calculator URL.

**EXISTING** — `AppSeo` recognizes `/journeys/:slug`, resolves the journey through `getDecisionJourney()`, renders `DecisionJourney`, and applies journey-specific SEO metadata. `main.jsx` imports `AppSeo`, so this is the active runtime route layer.

**VALIDATED CANDIDATE** — The earlier hypothesis that journey routes were entirely absent from the runtime router is no longer true. The confirmed runtime supports `/journeys/:slug`.

**PARTIAL / GAP** — There is no `/journeys` index route. Journey pages link their breadcrumb to `/journeys`, but that route is not handled by either `AppSeo` or `App`. This is a real navigation dead end for the breadcrumb target.

**PARTIAL** — Journeys are not linked from the homepage, topic hubs or global search. They are discoverable primarily through direct URLs or result metadata/next-step components.

**EXISTING** — The global sitemap generator includes all five canonical journey URLs.

## 6. Calculator → result flow

**EXISTING** — `CalculatorView` owns the form/result loop, validates inputs, executes the calculator, handles calculation errors, records calculator open/complete events and renders result certainty metadata.

**EXISTING** — Result presentation is config-driven through `ResultPanel` and preserves calculator-specific certainty/interpretation policy.

**PRESERVE** — Mathematical calculation contracts and result certainty policies.

## 7. Result → next action

**EXISTING** — `getNextCalculatorRecommendations()` derives ordered next-calculator edges directly from canonical journey definitions.

**EXISTING** — `NextCalculatorSection` renders “What should I calculate next?” on calculator pages and records the selected journey edge.

**EXISTING** — The next-calculator validation checks every journey edge, prevents self-recommendations and confirms terminal steps do not create next edges.

**PARTIAL** — The next action is currently a link to the next calculator, not a navigable journey state. Journey context is displayed but progress is not preserved as a journey page/state.

**PRESERVE** — Journey-derived deterministic recommendation edges.

## 8. Calculator → related calculator

**EXISTING** — `CalculatorView` separately computes up to six related calculators using shared metadata: primary journey, domain, intent, model type, category, country overlap and textual similarity.

**RISK** — This is a second recommendation system alongside deterministic journey next-step recommendations. It is useful for exploratory discovery, but its metadata-driven scoring can overlap with or diverge from the canonical decision graph.

**CHANGE** — Future PX work should distinguish “next decision” (canonical journey edge) from “related tools” (exploratory similarity) and avoid merging them into a new third system.

## 9. Calculator ↔ content / guides

**EXISTING** — `guides.js` stores explicit calculator links.

**EXISTING** — `contentModel.js` converts guide calculator links into canonical bidirectional relationships: guide → calculator (`explains`) and calculator → guide (`explained-by`).

**EXISTING** — Calculator pages render supporting guides; guide pages render calculator links; topic hubs expose guides; journey definitions resolve supporting guides through the same content model.

**PRESERVE** — `contentModel.js` as the canonical content relationship layer. Do not create a second guide/calculator relationship model.

## 10. Routing / navigation

**EXISTING** — Canonical calculator, guide, country, topic-hub and information routes are handled by the application. Legacy `#calculator/:id` URLs are normalized to `/calculators/:id`.

**EXISTING** — Journey routes are handled by `AppSeo` at `/journeys/:slug`.

**PARTIAL / GAP** — `/journeys` is referenced as a breadcrumb destination but has no route.

**RISK** — There are two route layers: `AppSeo` special routing and `App` normal routing. This works today for implemented special routes, but increases the chance that direct-route and in-app navigation paths use different data sources or behavior.

## 11. SEO landing pages

**EXISTING** — Calculator, guide, topic, country and information pages have runtime metadata and canonical URL handling.

**EXISTING** — Calculator SEO can include search-intent metadata. Guide pages emit Article schema; calculator pages emit WebApplication schema; breadcrumbs emit BreadcrumbList schema.

**EXISTING** — `generate-global-sitemap.mjs` uses the full calculator catalog, guides, topic hubs, countries and decision journeys and explicitly includes all five journey URLs.

**PARTIAL** — Journey pages have runtime SEO metadata and sitemap inclusion, but no journey index/landing page exists at `/journeys`, so there is no canonical browsable hub for the journey set.

## 12. Mobile / browser behavior

**EXISTING** — The repository contains dedicated home mobile styling, calculator view styling, topic-hub styling and a multi-viewport Playwright audit workflow.

**EXISTING** — Product Experience CI includes production build and performance gates plus discovery/search/content/journey/result/SEO validations.

**PARTIAL** — PX-01 inventory does not establish a new visual/browser pass for the post-infrastructure SHA because this task makes no UI change and the available connector cannot dispatch the workflow. This is a verification limitation, not evidence of a product regression.

## Critical user journeys mapped

1. **Search → calculator → result → next calculator:** works through existing search, calculator result and deterministic next-calculator edges.
2. **Search → guide → calculator:** works through search results and guide calculator links.
3. **Topic → calculator → result:** works through topic hub calculator IDs and calculator routes; direct topic routes have a catalog-source divergence risk.
4. **Journey → calculator → result → next calculator:** journey pages resolve and link to calculators; next actions are available from calculator pages.
5. **Journey → guide:** journey guide links resolve through canonical content.
6. **Homepage → journey:** not currently exposed as a first-class path.
7. **Search → journey:** intent can infer journeys, but journeys are not search result types.
8. **Journey breadcrumb → journey index:** broken because `/journeys` has no route.

## Classification summary

### EXISTING
- Canonical calculator catalog.
- Country-aware calculator discovery.
- Global calculator/guide search.
- Search intent and recovery.
- Topic hubs.
- Five decision journeys.
- Calculator result/certainty flow.
- Deterministic next-calculator edges.
- Related-calculator exploration.
- Bidirectional guide/calculator content relationships.
- Runtime SEO and global sitemap coverage.
- Mobile/viewport audit infrastructure.

### PARTIAL
- Decision journeys are implemented but not first-class discovery surfaces.
- `/journeys/:slug` works, but `/journeys` does not.
- Search understands journey intent but does not return journey objects.
- Result next-step UX exposes journey-derived edges but does not preserve journey progress as a navigable state.
- Direct topic routes and normal app routes can use different calculator catalogs.

### GAP
- A browsable journey index at `/journeys`.
- A coherent first-class journey discovery entry point from the primary product experience.
- A single canonical journey identifier mapping shared by search intent and calculator metadata.
- A route-level regression check proving canonical journey URLs and the journey index behave consistently.

### RISK
- Stale journey mappings in search intent and calculator metadata.
- Two route/data layers (`AppSeo` and `App`) with different calculator imports.
- Separate “related calculators” and “next calculator” recommendation systems can drift if their purposes are not kept explicit.
- Journey pages are sitemap-indexed without an index page, weakening discoverability and navigation coherence.

### PRESERVE
- `calculatorCatalog.js` as calculator discovery source.
- `decisionJourneys.js` as the canonical decision graph.
- `contentModel.js` as the canonical guide/calculator relationship layer.
- Existing search/recovery architecture.
- Deterministic next-calculator recommendations.
- Calculator mathematical/result/certainty contracts.
- Existing SEO and sitemap infrastructure.

### CHANGE — evidence-backed future work
1. Make journey discovery first-class without replacing `decisionJourneys.js`.
2. Add the missing `/journeys` index and route validation.
3. Normalize search-intent and calculator metadata journey IDs to the canonical five journey slugs, or explicitly represent non-journey planning domains without pretending they resolve to a journey.
4. Consolidate user-facing topic/calculator route data consumption on `calculatorCatalog.js`.
5. Keep deterministic journey next-steps separate from exploratory related-calculator recommendations.

## PX-01 scope decision

No product UI redesign was performed in PX-01. The inventory establishes the existing architecture and identifies the minimum evidence-backed changes for later phases. PX-02 should address the entry/discovery problem only after this record and its verification state are accepted.
