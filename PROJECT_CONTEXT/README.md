# FinCalc — Persistent Project Context

This folder is the durable handoff record for the FinCalc project.

## Purpose

A new ChatGPT session, a different ChatGPT account, or a future developer should be able to read this folder and understand:

- what FinCalc is being built to become;
- what has already been implemented;
- what is verified versus merely implemented;
- which branch is currently active;
- what the current production baseline is;
- what milestone is being worked on;
- what remains on the roadmap;
- important architecture and safety decisions;
- recent problems and how they were resolved;
- exactly what should happen next.

**Read this folder before making project changes.**

## Read order for a new session

1. `AI_HANDOFF.md` — current operating instructions and immediate next action.
2. `CURRENT_STATE.md` — exact repository/branch/verification state.
3. `ARCHITECTURE.md` — product and technical architecture.
4. `ROADMAP.md` — milestone roadmap and phase status.
5. `SESSION_LOG.md` — chronological record of major work and decisions.
6. `docs/GENERATIVE_RELEASE_PLAN.md` — original 88-phase roadmap.

## Update rule

At the end of every meaningful work session, update:

- `AI_HANDOFF.md` with the new current state and next action;
- `CURRENT_STATE.md` with branch/commit/verification changes;
- `SESSION_LOG.md` with what was done, what failed, what was fixed, and what remains.

Do not claim a phase is complete merely because code exists. A phase is complete only when its acceptance criteria are satisfied and the required verification is green against the relevant commit.

## Project identity

**Product:** FinCalc

**Repository:** `kunal2sharma1/Finance-Cal`

**Canonical production branch:** `main`

**Current development branch:** `fincalc-jurisdiction-v1`

**Current product direction:** a trustworthy, decision-oriented financial calculator platform with intent-aware discovery, structured content, decision journeys, explicit jurisdiction architecture, measurable product funnels, and safe commercial architecture.
