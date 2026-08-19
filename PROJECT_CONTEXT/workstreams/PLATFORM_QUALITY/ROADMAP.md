# Platform Quality Roadmap

Branch: `workstream-platform-quality`

## PQ-01 — Quality inventory and observability contract
Status: NOT_STARTED

Goal: inventory current tests, CI, runtime errors, browser checks, performance gates, and diagnostics.

Acceptance: known coverage gaps documented; no duplicate telemetry systems proposed.

## PQ-02 — Runtime error and diagnostics foundation
Depends on: PQ-01

Goal: establish structured, safe runtime diagnostics.

Acceptance: errors are classifiable; sensitive financial inputs are excluded; failures remain actionable.

## PQ-03 — Accessibility qualification
Depends on: PQ-01

Goal: automated accessibility coverage for critical flows.

Acceptance: keyboard/focus/labels/semantics and applicable automated checks pass on representative routes.

## PQ-04 — Browser and visual regression
Depends on: PQ-03

Goal: deterministic desktop/mobile regression for critical surfaces.

Acceptance: representative calculator, search, journey, and content flows pass.

## PQ-05 — Performance engineering
Depends on: PQ-01

Goal: establish reliable performance measurement and regression thresholds.

Acceptance: route performance, LCP/INP/CLS where measurable, and calculation latency are covered by deterministic checks.

## PQ-06 — CI reliability hardening
Depends on: PQ-02 through PQ-05

Goal: ensure verification is trustworthy and cannot silently validate the wrong SHA.

Acceptance: workflow triggers are explicit; status publication is SHA-matched; no self-triggering remediation loop exists.

## PQ-07 — Platform release qualification
Depends on: PQ-06

Goal: qualify the workstream for merge.

Acceptance: full verification GREEN against exact SHA; documentation complete; no unresolved RED.
