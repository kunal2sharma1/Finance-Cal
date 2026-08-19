# Generational Release Status

Status: **Milestone 1 complete; Milestone 2 in progress.**

Last reconciled: `2026-08-19`

## Current repository state

- Canonical branch: `main`
- Milestone 1 source branch: `fincalc-generational-release` (historical)
- Active development branch: `fincalc-jurisdiction-v1`
- Milestone 1 merge commit on `main`: `05ab76f970610151147a595e3d1fee26f4f3cdc3`
- Milestone 1 verified implementation commit before merge: `fd8a0eeff146bf2cc2db923c68f3aece356f7893`
- Milestone 1 Verify workflow: #485 — GREEN

## Delivery model

The original 88-phase roadmap is delivered through smaller production milestones. Each milestone is implemented on a dedicated branch, verified green against the exact candidate SHA, merged to `main`, and production-verified before the next milestone branches from the resulting `main`.

Do not force-update `main`. Do not merge unverified work. Do not treat an older green CI run as verification of newer code.

## Milestone 1 — Platform Foundation

- [x] Phases 1–42.
- [x] Phase 43 — production-like SEO crawl test.
- [x] Milestone verified by Verify #485.
- [x] Milestone merged to `main`.

## Milestone 2 — SEO and International Architecture

Active branch: `fincalc-jurisdiction-v1`

- [ ] Phase 44 — search-intent metadata connected to SEO.
- [ ] Phase 45 — separate UI country, currency, number system, locale, and calculation jurisdiction.
- [ ] Phase 46 — explicit jurisdiction architecture.
- [ ] Phase 47 — country quality/readiness gates.

## Remaining roadmap

- [ ] Phases 48–56 — analytics, runtime and engineering quality.
- [ ] Phases 57–60 — commercial architecture.
- [ ] Phases 61–66 — product integration.
- [ ] Phases 67–78 — release qualification.
- [ ] Phases 79–84 — final QA and release freeze.
- [ ] Phase 85 — final merge to `main` for the eventual full release milestone.
- [ ] Phase 86 — intentional production deployment.
- [ ] Phase 87 — immediate production verification.
- [ ] Phase 88 — post-deployment monitoring and sign-off.

## Historical implementation checkpoints

- Phases 1–16: calculator foundation and financial correctness.
- Phase 17: rule provenance.
- Phase 18: methodology metadata.
- Phase 19: modeling scope.
- Phase 20: result certainty.
- Phase 21: precision policy.
- Phase 22: input grouping.
- Phase 23: numeric/slider control policy.
- Phase 24: contextual input validation.
- Phase 25: mobile-first XIRR cash-flow redesign.
- Phase 26: multi-viewport calculator audit.
- Phase 27: result interpretation hierarchy.
- Phase 28: result-card cleanup.
- Phase 29: unified search.
- Phase 30: structured search index.
- Phase 31: intent/journey-aware ranking.
- Phase 32: synonyms and typo recovery.
- Phase 33: zero-result recovery.
- Phase 34: search-intent detection.
- Phase 35: canonical content model.
- Phase 36: explicit content relationships.
- Phase 37: reduced duplicated guide/content sourcing.
- Phase 38: decision-journey framework.
- Phase 39: first decision journeys.
- Phase 40: next-calculator flow.
- Phase 41: central canonical site URL.
- Phase 42: explicit indexability policy.
- Phase 43: production-like SEO crawl.

## Source of truth

- Original detailed roadmap: `docs/GENERATIVE_RELEASE_PLAN.md`
- Durable AI handoff: `PROJECT_CONTEXT/AI_HANDOFF.md`
- Durable current state: `PROJECT_CONTEXT/CURRENT_STATE.md`
- Durable architecture: `PROJECT_CONTEXT/ARCHITECTURE.md`
- Durable milestone roadmap: `PROJECT_CONTEXT/ROADMAP.md`
- Durable session history: `PROJECT_CONTEXT/SESSION_LOG.md`
