# Current State

Last updated: 2026-08-19

## Git state

- `main` is the only canonical production branch.
- Milestone 1 was merged into `main` as commit `05ab76f970610151147a595e3d1fee26f4f3cdc3`.
- The merge preserved both histories: the previous `main` commit and the verified release implementation are parents of the merge commit.
- Current development branch: `fincalc-jurisdiction-v1`.
- Legacy branch: `fincalc-generational-release`. It supplied Milestone 1 and is no longer the active development line.

## Milestone 1

**Platform Foundation — Phases 1–43: complete.**

The release implementation was verified before merge at:

- Commit: `fd8a0eeff146bf2cc2db923c68f3aece356f7893`
- Verify workflow: #485
- Result: GREEN
- Verification included calculator/formula/trust/search/content/decision/international gates, build, production-like SEO crawl, performance budget, and CI-status publication.

The milestone was then merged to `main` as `05ab76f...`.

## What is currently trusted

- Calculator contracts and formula regression coverage are established.
- Trust, provenance, methodology, model-scope, certainty, and precision policies exist.
- Calculator input grouping, control policy, contextual validation, result hierarchy, and mobile XIRR work exist.
- Unified search, structured indexing, intent-aware ranking, synonym/typo recovery, zero-result recovery, and intent detection exist.
- Canonical content relationships and decision journeys exist.
- The next-calculator decision flow exists.
- Canonical URL and explicit indexability policy exist.
- Production-like SEO crawling is an automated gate and passed Verify #485.

## Production state

`main` now contains Milestone 1. Production deployment verification must be treated separately from branch/CI verification. Never infer production success merely from a green branch run.

## Current milestone

**SEO and International Architecture — Phases 44–47**

Active branch: `fincalc-jurisdiction-v1`

Targets:

1. Phase 44 — connect search-intent metadata to SEO.
2. Phase 45 — separate UI country, currency, number system, locale, and calculation jurisdiction.
3. Phase 46 — establish explicit jurisdiction architecture.
4. Phase 47 — establish country quality/readiness gates.

## Working rule

For every phase:

`inspect → define acceptance criteria → implement → verify → if RED inspect logs/root cause → fix → verify again → only then mark GREEN and close the phase.`

Do not stop after implementation. Do not use an older green run to validate newer code. Always match verification to the exact candidate SHA.
