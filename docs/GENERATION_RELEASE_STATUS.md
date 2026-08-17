# Generational Release Status

Release branch: `fincalc-generational-release`

Status: **IN PROGRESS — calculator contract foundation implemented**

Baseline: `main` at `78ce323de82c9a884bfae0dca7aa342b00fc6578`.

## Execution policy

- Do not merge feature work directly to `main` during this release.
- Keep each implementation change reviewable and independently testable.
- Update this checklist as phases are completed.
- No production deployment until the final qualification and release gates are complete.

## Current checkpoints

- [x] Release branch created.
- [x] Master 88-phase plan committed.
- [x] Current production baseline recorded.
- [x] PR #10 UI cleanup incorporated into the generation branch.
- [ ] Phase 3 release identity implemented.
- [x] Phase 4 final calculator schema definitions added.
- [x] Phase 5 field schema definitions added.
- [x] Phase 6 result schema definitions added.
- [x] Phase 7 calculator class definitions added to the contract.
- [x] Phase 8 portfolio metadata required by the contract.
- [ ] Phase 9 scattered calculator/country exceptions removed.
- [ ] Phases 10–15 formula reliability implemented.
- [ ] Phases 16–21 trust governance implemented.
- [ ] Phases 22–28 UX/mobile implementation completed.
- [ ] Phases 29–34 search/discovery implementation completed.
- [ ] Phases 35–40 content/decision implementation completed.
- [ ] Phases 41–47 SEO/international implementation completed.
- [ ] Phases 48–56 analytics/runtime/engineering implementation completed.
- [ ] Phases 57–60 commercial architecture completed.
- [ ] Phases 61–66 product integration completed.
- [ ] Phases 67–78 release qualification completed.
- [ ] Phases 79–84 final QA/release freeze completed.
- [ ] Phase 85 single merge to main completed.
- [ ] Phase 86 single production deployment completed.
- [ ] Phases 87–88 production verification/sign-off completed.

## Latest implementation

- Added `src/calculatorSchema.js` as the canonical source for supported calculator field/result types and portfolio metadata enums.
- Strengthened `scripts/validate-calculator-contract.mjs` so the full catalogue must expose valid domain, intent, model type, calculator class, risk level, journey and financial-question metadata.
- The pre-existing malformed related-calculator URL is verified clean on the generation branch.

CI for the latest commits is not yet reported by the GitHub workflow-run lookup, so no local/remote test pass is claimed here.
