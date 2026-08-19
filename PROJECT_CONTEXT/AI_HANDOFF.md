# AI Handoff

## Current workstream

- Branch: `workstream-international-jurisdiction`
- Workstream: International & Jurisdiction
- Current phase: **IJ-01 — Domain inventory and separation contract**
- Starting SHA for this phase: `9bc07f8531ee4d89af3d4bc09d36de5060258c83`
- Phase delivery SHA: recorded in `SESSION_LOG.md`

## Important repository-state note

At the start of IJ-01, the branch did **not** contain several context files referenced by the work request (`README.md` under `PROJECT_CONTEXT`, `RESPONSE_PROTOCOL.md`, `PARALLEL_WORK_PROTOCOL.md`, `CURRENT_STATE.md`, `ARCHITECTURE.md`, and `SESSION_LOG.md`). The live repository tree was treated as authoritative. The available `PROJECT_CONTEXT/WORKSTREAMS.md` and IJ roadmap were used as the workstream contract.

## IJ-01 result

`PROJECT_CONTEXT/workstreams/INTERNATIONAL_JURISDICTION/DOMAIN_INVENTORY.md` is now the canonical IJ-01 inventory and separation contract. It documents current coupling and reserves the public vocabulary:

- `countryCode`
- `locale`
- `currencyCode`
- `numberSystem`
- `jurisdictionId`

No calculator formula was changed. No jurisdiction-specific rule implementation was introduced.

## Next phase

**IJ-02 — Country/locale/currency/number separation.** Separate presentation concepts in code while preserving current calculator outputs and compatibility behavior until the new contracts are verified.
