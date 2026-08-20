# FinCalc Current State

## Baseline

`main` is the canonical production baseline after Milestone 1 (Phases 1–43). The next development model is workstream-based, not the old 88-phase sequence.

## Active workstreams

- `workstream-product-experience`
- `workstream-international-jurisdiction`
- `workstream-platform-quality`
- `workstream-commercial-analytics`

## Current active work

Product Experience and International & Jurisdiction are the first two streams being actively developed in parallel. Platform Quality and Commercial & Analytics are prepared but not yet active.

## Current Product Experience phase

PX-01 inventory and PX-02 decision-oriented entry experience are complete. PX-03 — Decision graph integration — is the next active Product Experience phase.

The PX-01 inventory identifies existing calculator/search/content/journey infrastructure plus integration gaps around journey discovery, canonical journey identifiers and route/data-layer consistency. PX-02 established the decision-oriented entry experience while preserving the existing search, calculator, content, and journey architecture.

## Rules

Every phase must reach exact-SHA GREEN verification before being considered complete. RED enters the repair loop. Main is never force-updated.

## Verification state

PX-01 and PX-02 were verified GREEN by the Product Experience workflow for exact candidate SHA `53e50a4029aeea590d5e57d787c876a9d1a98539`. Documentation closeout is recorded in the Product Experience roadmap. PX-03 is next and has not started.

## Context synchronization

The durable `PROJECT_CONTEXT` foundation was established through the dedicated context-synchronization work and merged to `main` as PR #12 at merge SHA `c03975f579647ad4e36fef4997fd0b949f08f4af`. Product Experience was subsequently synchronized with the canonical context baseline without replacing its workstream roadmap.
