# Generational Release Status

Release branch: `fincalc-generational-release`

Status: **IN PROGRESS — Phase 37 complete; Phase 38 next.**

Last reconciled: `2026-08-18`
Current verified release commit: `3134ed585f953721ed048f970fcb65ec89d8aaee`
Latest verified Verify run: **#428 — passed**.

## Source of truth

The authoritative 88-phase roadmap is `docs/GENERATIVE_RELEASE_PLAN.md`. This status file records implementation and verification progress against that plan.

## Execution policy

- Do not merge feature work directly to `main` during this release.
- Keep each implementation change reviewable and independently testable.
- Update this checklist as phases are completed.
- CI and browser regression run throughout development.
- No production deployment until the final qualification and release gates are complete.
- After release-candidate freeze, only release-blocking fixes are allowed.
- Final release intent remains one merge to `main` and one intentional production deployment after qualification.

## Reconciled checkpoints

- [x] Release branch created.
- [x] Master 88-phase plan committed.
- [x] Production baseline recorded.
- [x] PR #10 UI cleanup incorporated into the generation branch.
- [x] Phases 1–16 completed and independently validated.
- [x] Phase 17 rule provenance implemented and independently validated.
- [x] Phase 18 methodology metadata implemented and independently validated.
- [x] Phase 19 modeling scope cleanup implemented and independently validated.
- [x] Phase 20 result certainty classification implemented and independently validated.
- [x] Phase 21 precision policy aligned with result certainty and independently validated.
- [x] Phase 22 input grouping system implemented and independently validated.
- [x] Phase 23 explicit numeric/slider control policy implemented and independently validated.
- [x] Phase 24 contextual input-validation messaging implemented and independently validated.
- [x] Phase 25 mobile-first XIRR cash-flow redesign implemented and covered by the release verification suite.
- [x] Phase 26 multi-viewport calculator audit implemented and passed.
- [x] Phase 27 result interpretation hierarchy implemented and covered by the release verification suite.
- [x] Phase 28 final result-card cleanup integration implemented and covered by the release verification suite.
- [x] Phase 29 unified search engine implemented.
- [x] Phase 30 structured search index implemented.
- [x] Phase 31 intent/journey-aware ranking implemented.
- [x] Phase 32 synonyms and typo recovery implemented.
- [x] Phase 33 zero-result recovery implemented.
- [x] Phase 34 search-intent detection implemented.
- [x] Phase 35 canonical content model implemented and validated.
- [x] Phase 36 explicit content relationships implemented and validated.
- [x] Phase 37 duplicated guide/content sourcing reduced by routing guide rendering through the canonical content model.
- [ ] Phase 38 first-class decision-journey framework.
- [ ] Phase 39 first decision journeys: wealth, retirement, home buying, debt, job comparison.
- [ ] Phase 40 “What should I calculate next?” system.
- [ ] Phases 41–47 SEO/international architecture.
- [ ] Phases 48–56 analytics/runtime/engineering quality.
- [ ] Phases 57–60 commercial architecture.
- [ ] Phases 61–66 product integration.
- [ ] Phases 67–78 release qualification.
- [ ] Phases 79–84 final QA/release freeze.
- [ ] Phase 85 single merge to `main`.
- [ ] Phase 86 single production deployment to Cloudflare.
- [ ] Phase 87 immediate production verification.
- [ ] Phase 88 post-deployment monitoring and release sign-off.

## Recent qualification

Phase 37 commit `3134ed585f953721ed048f970fcb65ec89d8aaee` passed Verify build **#428**. The CI status bridge records the run as passed for the release branch.

The Phase 36 relationship validation requires valid source/target IDs, valid relationship types, no self-references or duplicates, valid guide-to-calculator links, and matching reverse relationships.

The Phase 37 integration routes guide content through the canonical content model while adapting it to the existing `GuideView` interface, preserving the public guide URL shape.

## Security remediation

Vite was pinned to patched `6.4.3`. The temporary dependency-repair workflow was removed after remediation. The historical failed repair workflow runs are not release failures; the current Verify pipeline is green.

## Release objective

Do not treat the phase count as the objective. The objective is the decision-platform foundation defined in `docs/GENERATIVE_RELEASE_PLAN.md`: trustworthy calculators, unified intent-aware discovery, explicit content relationships, decision journeys, jurisdiction-aware international architecture, measurable runtime/product funnels, safe commercial architecture, and a fully qualified single production release.
