# AI Handoff — Read This First

## If you are a new ChatGPT session

You are continuing work on **FinCalc**, repository `kunal2sharma1/Finance-Cal`.

Do not assume the previous conversation is available. Use this repository context as the durable source of truth.

### First actions

1. Read `PROJECT_CONTEXT/README.md`.
2. Read `PROJECT_CONTEXT/CURRENT_STATE.md`.
3. Read `PROJECT_CONTEXT/ARCHITECTURE.md`.
4. Read `PROJECT_CONTEXT/ROADMAP.md`.
5. Read the latest entries of `PROJECT_CONTEXT/SESSION_LOG.md`.
6. Inspect the actual GitHub branch and current HEAD before modifying anything.
7. Compare documentation claims against the code/CI; do not blindly trust stale status text.

## Current assignment

Active branch: `fincalc-jurisdiction-v1`

Current milestone: **SEO and International Architecture**

Current target phases: **44–47**

### Immediate work

Start with **Phase 44** only after inspecting the existing search-intent SEO implementation and its verification gate.

Do not implement Phase 45–47 prematurely. Finish one phase, verify it, then proceed.

## Operating protocol

For every phase:

### START

- Read the phase acceptance criteria.
- Inspect current implementation and existing tests.
- Identify affected files and architectural invariants.

### IMPLEMENT

- Make the smallest coherent change that satisfies the phase.
- Preserve existing behavior unless the phase explicitly changes it.
- Add/update a deterministic verification gate when one is missing.

### VERIFY

- Run the relevant checks.
- Run the full Verify workflow when appropriate.
- Match the result to the exact candidate SHA.

### RED LOOP

If anything is RED:

1. identify the failing job/step;
2. read the actual logs;
3. find the root cause;
4. fix it;
5. commit the fix;
6. rerun verification;
7. repeat until GREEN.

Never stop at “implementation complete” while verification is RED or missing.

### COMPLETE

Only then:

- mark the phase complete;
- update `PROJECT_CONTEXT/CURRENT_STATE.md`;
- update `PROJECT_CONTEXT/ROADMAP.md` if status changed;
- append to `PROJECT_CONTEXT/SESSION_LOG.md`;
- update this file with the next immediate action.

## Truth rules

- A green run for an older SHA does not validate newer code.
- A successful commit operation does not mean CI passed.
- A green branch CI result does not automatically mean production is healthy.
- Historical RED runs should not be treated as current failures.
- If a tool cannot verify something, say so rather than guessing.
- Do not create speculative commits just to make CI run.
- Do not force-update `main`.
- Do not merge unverified work.

## Branch policy

- `main` is the canonical production baseline.
- `fincalc-jurisdiction-v1` is the active development branch.
- Milestone branches are merged only after their verification is green.
- The old `fincalc-generational-release` branch is historical and supplied Milestone 1.

## Session close protocol

At the end of each session, append a concise entry to `SESSION_LOG.md` containing:

- date/time;
- active branch;
- starting HEAD and ending HEAD;
- work completed;
- verification result and exact SHA;
- unresolved issues;
- next action.

The next ChatGPT session should be able to continue without relying on chat history.
