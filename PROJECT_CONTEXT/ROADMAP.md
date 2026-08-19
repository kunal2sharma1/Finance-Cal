# Roadmap and Milestones

The original roadmap contains 88 phases. It is **not** being deployed as one 88-phase big-bang release.

## Delivery strategy

The product is delivered through coherent milestones:

1. Work on a dedicated branch.
2. Complete the milestone's phases.
3. Run the full relevant verification suite.
4. Resolve every RED result before completion.
5. Merge the verified milestone into `main`.
6. Verify the resulting `main`/production state.
7. Create the next milestone branch from the resulting `main`.

This reduces blast radius, makes rollback/debugging easier, and keeps the production baseline trustworthy.

## Milestone 1 — Platform Foundation

**Phases 1–43 — COMPLETE**

Scope delivered:

- calculator architecture and contracts;
- formula/golden/boundary/XIRR regression coverage;
- live-data resilience;
- trust/provenance/methodology/model-scope/certainty/precision architecture;
- calculator input grouping/control/validation;
- XIRR mobile UX and viewport validation;
- result hierarchy and result-card cleanup;
- unified search/index/ranking/recovery/intent detection;
- canonical content model and relationships;
- decision journeys and next-calculator flow;
- canonical URL policy;
- explicit indexability policy;
- production-like SEO crawl.

Verified release candidate:

`fd8a0eeff146bf2cc2db923c68f3aece356f7893`

Verify: **#485 — GREEN**

Merged into `main`:

`05ab76f970610151147a595e3d1fee26f4f3cdc3`

## Milestone 2 — SEO and International Architecture

**Active branch: `fincalc-jurisdiction-v1`**

### Phase 44

Search-intent metadata connected to SEO.

### Phase 45

Separate:

- UI country;
- currency;
- number system;
- locale;
- calculation jurisdiction.

These concepts must not be represented as one overloaded country setting.

### Phase 46

Explicit jurisdiction architecture.

The architecture must make calculation jurisdiction a first-class, testable concept and prevent accidental assumptions from country/locale/currency UI choices.

### Phase 47

Country quality/readiness gates.

Country support should be explicit and testable rather than inferred from superficial localization.

## Milestone 3 — Analytics, Runtime and Engineering Quality

**Phases 48–56**

48 analytics taxonomy
49 calculator funnel instrumentation
50 runtime error telemetry
51 search funnel instrumentation
52 journey analytics
53 browser regression suite
54 mobile visual regression
55 accessibility automation
56 real performance testing

## Milestone 4 — Commercial Architecture

**Phases 57–60**

57 commercial intent metadata
58 partner eligibility model
59 commercial safety gates
60 commercial analytics

## Milestone 5 — Product Integration

**Phases 61–66**

61 decision-oriented homepage
62 decision graph integration
63 result-to-journey integration
64 country-specific journey integration
65 search/content/calculator integration
66 analytics-driven product roadmap loop

## Milestone 6 — Release Qualification

**Phases 67–78**

Full calculator, formula, trust, route, mobile, accessibility, SEO, international, analytics, performance, commercial-disabled production, and immutable-candidate qualification.

## Milestone 7 — Final QA and Release

**Phases 79–88**

Manual QA, cross-browser QA, production verification, deployment dry run, freeze, clean-checkout regression, final merge/deployment, immediate verification, monitoring, and sign-off.

## Source roadmap

The original detailed plan remains at `docs/GENERATIVE_RELEASE_PLAN.md`.
