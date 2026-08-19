# FinCalc Project Context

This directory is the durable project memory for FinCalc. A new AI session should read `AI_HANDOFF.md`, `RESPONSE_PROTOCOL.md`, `PARALLEL_WORK_PROTOCOL.md`, `CURRENT_STATE.md`, `ARCHITECTURE.md`, `WORKSTREAMS.md`, and `SESSION_LOG.md` before changing code.

The repository is the source of truth. Chat history is optional context, never the authoritative project state.

## Current execution model

The original 88-phase roadmap is historical reference only. FinCalc is now developed through independent workstreams with explicit dependency boundaries.

Active workstreams:
- `workstream-product-experience`
- `workstream-international-jurisdiction`
- `workstream-platform-quality`
- `workstream-commercial-analytics`

`main` is the canonical production baseline. Workstream branches must not modify `main` directly.
