# Commercial & Analytics Roadmap

Branch: `workstream-commercial-analytics`

## CA-01 — Analytics inventory and taxonomy
Status: NOT_STARTED

Goal: inventory existing analytics/measurement behavior and define canonical events.

Acceptance: event names, ownership, required properties, privacy boundaries, and diagnostic separation are documented.

## CA-02 — Core product funnel instrumentation
Depends on: CA-01

Goal: measure calculator discovery, start, completion, search selection, and journey progression without logging sensitive financial inputs.

Acceptance: critical funnels produce deterministic events with safe payloads.

## CA-03 — Search and decision analytics
Depends on: CA-02

Goal: measure intent, search outcomes, journey entry, progression, and drop-off.

Acceptance: events map to existing intent/search/journey contracts without duplicate concepts.

## CA-04 — Commercial intent architecture
Depends on: CA-01

Goal: define explicit commercial-intent states independently from calculation correctness.

Acceptance: commercial state cannot alter mathematical results; behavior is auditable.

## CA-05 — Partner eligibility and safety
Depends on: CA-04

Goal: establish explicit partner eligibility and safety rules.

Acceptance: unsupported/unverified partners cannot silently become active; eligibility is machine-checkable.

## CA-06 — Commercial measurement
Depends on: CA-03, CA-05

Goal: measure qualified commercial interactions separately from core product usage.

Acceptance: commercial events are attributable, privacy-conscious, and isolated from financial inputs.

## CA-07 — Workstream release qualification
Depends on: CA-01 through CA-06

Goal: qualify commercial/analytics work for merge.

Acceptance: full verification GREEN against exact SHA; commercial safety gates GREEN; documentation complete.
