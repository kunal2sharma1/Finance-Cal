# AI Handoff — Read First

FinCalc is maintained in `kunal2sharma1/Finance-Cal`. The repository is the durable source of truth; do not rely on chat history.

## Required reading

Read:
- `PROJECT_CONTEXT/README.md`
- `PROJECT_CONTEXT/RESPONSE_PROTOCOL.md`
- `PROJECT_CONTEXT/PARALLEL_WORK_PROTOCOL.md`
- `PROJECT_CONTEXT/CURRENT_STATE.md`
- `PROJECT_CONTEXT/ARCHITECTURE.md`
- `PROJECT_CONTEXT/WORKSTREAMS.md`
- `PROJECT_CONTEXT/SESSION_LOG.md`
- the assigned workstream's `ROADMAP.md`

Then inspect the actual branch HEAD and current CI.

## Execution model

The old 88-phase roadmap is historical. Current work is organized into independent workstreams. Dependency-coupled work stays together; independent work can proceed separately.

## Workstreams

- Product Experience: `workstream-product-experience`
- International & Jurisdiction: `workstream-international-jurisdiction`
- Platform Quality: `workstream-platform-quality`
- Commercial & Analytics: `workstream-commercial-analytics`

## Rules

Work only on the assigned branch. Do not force-update `main`. Do not merge unverified work. If RED, inspect logs, fix root cause, commit, and verify again until GREEN or a genuine hard blocker/response limit.

A green result is valid only for the exact candidate SHA. Production verification is separate from branch CI.

At session close update the applicable roadmap, `CURRENT_STATE.md`, and `SESSION_LOG.md` with exact SHA and verification status.
