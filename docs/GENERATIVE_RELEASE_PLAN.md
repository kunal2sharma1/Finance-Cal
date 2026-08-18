# FinCalc Generational Release — Decision Platform Foundation

## Purpose

This document is the source of truth for the next major FinCalc release. The release converts the current calculator platform into the foundation of a transparent financial decision platform.

## Release rule

- Production `main` stays untouched during implementation.
- All work happens on the dedicated generation-release branch.
- Work is split into small, reviewable commits.
- CI and browser regression run throughout development.
- After release candidate freeze, only release-blocking fixes are allowed.
- The completed release is merged to `main` once and deployed to production once.

## Product north star

FinCalc should help users move from:

`financial question -> intent -> calculator -> result -> explanation -> scenario/comparison -> next decision -> optional commercial action`

## 88-phase implementation checklist

### Wave 0 — Release preparation

- [x] 1. Freeze and record current production baseline.
- [x] 2. Include PR #10 UI cleanup: compact breadcrumb/back row and remove crowded result-card sentence.
- [x] 3. Define release version, commit identity, deployment identity, and build timestamp.

### Wave 1 — Calculator engine hardening

- [x] 4. Formalize `CalculatorDefinition` schema.
- [x] 5. Formalize field schema and supported input types.
- [x] 6. Formalize result-field schema and presentation types.
- [x] 7. Formalize calculator classes.
- [x] 8. Complete calculator portfolio metadata.
- [x] 9. Remove scattered hardcoded calculator-country exceptions.

### Wave 2 — Financial correctness

- [x] 10. Golden-test framework.
- [x] 11. Golden tests for core calculators.
- [x] 12. High-risk formula regression suites.
- [x] 13. Boundary/invalid/stress testing.
- [x] 14. Numerical-solver testing, especially XIRR.
- [x] 15. Live-data failure/caching testing.

### Wave 3 — Trust and financial governance

- [x] 16. Formal `TrustDefinition` framework.
- [x] 17. Rule-level source provenance.
- [x] 18. Explicit calculator methodology metadata.
- [x] 19. Model-scope cleanup for simplified calculators.
- [x] 20. Result certainty classification: exact, estimate, projection, scenario, live-data.
- [x] 21. Precision policy aligned with model certainty.

### Wave 4 — Calculator UX and mobile

- [x] 22. Input grouping system.
- [x] 23. Explicit numeric/slider control policy.
- [x] 24. Contextual input-validation messaging.
- [x] 25. Mobile-first XIRR cash-flow redesign.
- [x] 26. Multi-viewport calculator audit.
- [x] 27. Result interpretation hierarchy.
- [x] 28. Final result-card cleanup integration.

### Wave 5 — Search and discovery

- [x] 29. One unified search engine for homepage and global search.
- [x] 30. Structured search index.
- [x] 31. Intent/journey-aware ranking.
- [x] 32. Synonyms and typo recovery.
- [x] 33. Zero-result recovery.
- [x] 34. Search-intent detection.

### Wave 6 — Content and decision architecture

- [x] 35. Canonical content model.
- [x] 36. Explicit content relationships.
- [x] 37. Reduce duplicated explanation/SEO/FAQ content.
- [ ] 38. First-class decision-journey framework.
- [ ] 39. First decision journeys: wealth, retirement, home buying, debt, job comparison.
- [ ] 40. “What should I calculate next?” system.

### Wave 7 — SEO and international architecture

- [ ] 41. Central canonical site URL.
- [ ] 42. Explicit indexability policy.
- [ ] 43. Production-like SEO crawl test.
- [ ] 44. Search-intent metadata connected to SEO.
- [ ] 45. Separate UI country, currency, number system, locale, and calculation jurisdiction.
- [ ] 46. Explicit jurisdiction architecture.
- [ ] 47. Country quality/readiness gates.

### Wave 8 — Analytics, runtime and engineering quality

- [ ] 48. Formal analytics event taxonomy.
- [ ] 49. Calculator funnel instrumentation.
- [ ] 50. Structured runtime error telemetry.
- [ ] 51. Search funnel instrumentation.
- [ ] 52. Journey analytics.
- [ ] 53. Representative browser regression suite.
- [ ] 54. Mobile visual regression.
- [ ] 55. Accessibility automation.
- [ ] 56. Real performance testing: LCP, INP, CLS, calculation latency.

### Wave 9 — Commercial architecture

- [ ] 57. Commercial intent metadata.
- [ ] 58. Partner definition/eligibility model.
- [ ] 59. Commercial safety gates.
- [ ] 60. Commercial analytics.

### Wave 10 — Product integration

- [ ] 61. Decision-oriented homepage.
- [ ] 62. Decision graph integration across search, journeys, calculators and content.
- [ ] 63. Result-to-journey integration.
- [ ] 64. Country-specific journey integration.
- [ ] 65. Search/content/calculator integration.
- [ ] 66. Analytics-driven product roadmap loop.

### Wave 11 — Release qualification

- [ ] 67. Full calculator-contract gate.
- [ ] 68. Full formula gate.
- [ ] 69. High-risk trust gate.
- [ ] 70. Full route gate.
- [ ] 71. Full mobile gate.
- [ ] 72. Accessibility gate.
- [ ] 73. Full SEO gate.
- [ ] 74. Full international gate.
- [ ] 75. Full analytics gate.
- [ ] 76. Full performance gate.
- [ ] 77. Commercial-disabled production gate.
- [ ] 78. Immutable production-candidate build and freeze.

### Wave 12 — Final release

- [ ] 79. Full manual QA.
- [ ] 80. Cross-browser QA.
- [ ] 81. Production-environment verification.
- [ ] 82. Deployment dry run.
- [ ] 83. Release freeze: fixes only.
- [ ] 84. Final clean-checkout regression.
- [ ] 85. Merge generation release into `main` once.
- [ ] 86. Deploy to Cloudflare once.
- [ ] 87. Immediate production verification.
- [ ] 88. Post-deployment monitoring and release sign-off.

## Explicitly out of scope

- AI financial advisor
- Banking integrations
- Trading execution
- Social/community features
- Full finance media/blog expansion
- Large-scale country expansion
- Mobile app
- Backend/database migration for the core product
- Aggressive display advertising
- AI-generated financial calculations
- Mass calculator-count expansion

## Release success definition

The release is successful only when:

1. Core calculators are contract-valid and mathematically regression-tested.
2. High-risk calculators have explicit trust/source governance.
3. Representative calculators work in real browsers on mobile and desktop.
4. Search is unified and intent-aware.
5. Content and calculator relationships are explicit.
6. Jurisdiction is separated from UI country/currency/number formatting.
7. Runtime errors and useful product funnels are measurable without collecting financial inputs.
8. SEO is governed by one canonical site URL and validated through crawl-level checks.
9. The product can support decision journeys without rebuilding the calculator engine.
10. The release candidate passes the full qualification matrix before the single production merge/deployment.
