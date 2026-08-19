# AI Handoff — Read This First

## If you are a new ChatGPT session

You are continuing work on **FinCalc**, repository `kunal2sharma1/Finance-Cal`.

Do not assume the previous conversation is available. Use this repository context as the durable source of truth.

### First actions

1. Read `PROJECT_CONTEXT/README.md`.
2. Read `PROJECT_CONTEXT/CURRENT_STATE.md`.
3. Read `PROJECT_CONTEXT/ARCHITECTURE.md`.
4. Read `PROJECT_CONTEXT/WORKSTREAMS.md`.
5. Read `PROJECT_CONTEXT/SESSION_LOG.md`.
6. Inspect the actual GitHub branch and current HEAD before modifying anything.
7. Compare documentation claims against code and CI; do not blindly trust stale status text.

## Current execution model

The old 88-phase roadmap is historical context only. FinCalc is now delivered through independent workstreams. Dependency-coupled work stays together; independent work is isolated so one stream does not block another.

### Active branches

- `main` — canonical production baseline.
- `workstream-product-experience` — Product Experience.
- `workstream-platform-quality` — Platform Quality.
- `workstream-international-jurisdiction` — International & Jurisdiction.
- `workstream-commercial-analytics` — Commercial & Analytics.
- `fincalc-jurisdiction-v1` — transitional planning branch; do not use as the primary feature branch for new work.
- `fincalc-generational-release` — historical Milestone 1 source branch.

## Workstream order

Operationally complete workstreams one at a time, while preserving branch independence:

1. Product Experience
2. International & Jurisdiction
3. Platform Quality
4. Commercial & Analytics

This is sequencing for manageability, not a claim that all four are technically dependent.

## Required workflow

For each work package:

`inspect → define acceptance criteria → implement → targeted verification → full verification → exact-SHA check → GREEN → merge → production verification`

If RED:

1. inspect the exact failing job/step;
2. read actual logs;
3. identify root cause;
4. make the smallest correct fix;
5. commit;
6. rerun verification;
7. repeat until GREEN.

Never stop at implementation while verification is RED or missing.

## Truth rules

- A green run for an older SHA does not validate newer code.
- A successful commit does not mean CI passed.
- A green branch run does not prove production health.
- Historical RED runs are not current failures.
- Do not create speculative commits just to make CI run.
- Do not force-update `main`.
- Do not merge unverified work.
- If a tool cannot verify something, say so rather than guessing.

## Shared-contract rule

If two workstreams discover a shared prerequisite, put the smallest stable contract/foundation on `main`, verify it, then refresh the affected branches from `main`. Do not duplicate the same domain concept across branches.

## Session close protocol

At the end of every meaningful session:

- update `AI_HANDOFF.md` with the current state and next action;
- update `CURRENT_STATE.md` with branch/commit/verification changes;
- append to `SESSION_LOG.md` with date/time, work completed, verification result, unresolved issues, and next action.

A new ChatGPT session must be able to continue from the repository without relying on chat history.