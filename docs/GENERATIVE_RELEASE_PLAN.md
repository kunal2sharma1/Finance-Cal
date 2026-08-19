# FinCalc Generational Release — Decision Platform Foundation

## Delivery model

The original 88-phase plan remains the product roadmap, but it is delivered through smaller production milestones. Each milestone is implemented on a dedicated branch, verified green, merged to `main`, and production-verified before the next milestone branches from the resulting `main`.

## Current milestone — Platform Foundation

Phases 1–43 are complete for this milestone.

- [x] 1–42. Foundation, calculator hardening, financial correctness, trust governance, UX/mobile, search, content and decision architecture.
- [x] 41. Central canonical site URL.
- [x] 42. Explicit indexability policy.
- [x] 43. Production-like SEO crawl test.

Verified candidate before milestone documentation commits:

- Branch: `fincalc-generational-release`
- Verified commit: `fd8a0eeff146bf2cc2db923c68f3aece356f7893`
- Verify workflow: #485
- Result: GREEN

The milestone documentation commits must be included in the final merge-candidate verification before merge.

## Next milestone — SEO and international architecture

- [ ] 44. Search-intent metadata connected to SEO.
- [ ] 45. Separate UI country, currency, number system, locale, and calculation jurisdiction.
- [ ] 46. Explicit jurisdiction architecture.
- [ ] 47. Country quality/readiness gates.

## Remaining roadmap

### 48–56 — Analytics, runtime and engineering quality

- [ ] 48. Formal analytics event taxonomy.
- [ ] 49. Calculator funnel instrumentation.
- [ ] 50. Structured runtime error telemetry.
- [ ] 51. Search funnel instrumentation.
- [ ] 52. Journey analytics.
- [ ] 53. Representative browser regression suite.
- [ ] 54. Mobile visual regression.
- [ ] 55. Accessibility automation.
- [ ] 56. Real performance testing: LCP, INP, CLS, calculation latency.

### 57–60 — Commercial architecture

- [ ] 57. Commercial intent metadata.
- [ ] 58. Partner definition/eligibility model.
- [ ] 59. Commercial safety gates.
- [ ] 60. Commercial analytics.

### 61–66 — Product integration

- [ ] 61. Decision-oriented homepage.
- [ ] 62. Decision graph integration across search, journeys, calculators and content.
- [ ] 63. Result-to-journey integration.
- [ ] 64. Country-specific journey integration.
- [ ] 65. Search/content/calculator integration.
- [ ] 66. Analytics-driven product roadmap loop.

### 67–78 — Release qualification

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

### 79–88 — Final release

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
