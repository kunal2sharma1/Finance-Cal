# FinCalc Workstream Execution Plan

The original 88-phase roadmap is retained as historical context only. It is no longer the active execution sequence.

## Delivery model

FinCalc is now developed through independent workstreams. Work that has a real dependency relationship stays together. Independent workstreams are developed separately so one slow stream does not block another.

Each workstream follows:

`scope → dependency audit → implement → verify exact SHA → GREEN → PR → merge to main → production verification`

No workstream is considered complete because code was committed. It is complete only when its acceptance criteria and verification are GREEN.

## Active workstreams

### A — Product Experience

Branch: `workstream-product-experience`

Focus:
- decision-oriented homepage
- decision graph UX
- result-to-journey experience
- search/content/calculator integration
- product browser/mobile QA

Depends on: stable existing search/content/decision contracts. Must not depend on unfinished jurisdiction internals.

### B — Platform Quality

Branch: `workstream-platform-quality`

Focus:
- runtime error telemetry
- analytics/runtime foundations where shared
- browser regression
- accessibility automation
- visual regression
- real performance measurement
- CI reliability

Owns shared verification infrastructure and must keep its contracts stable for other streams.

### C — International & Jurisdiction

Branch: `workstream-international-jurisdiction`

Focus:
- country/currency/number-system/locale separation
- calculation jurisdiction architecture
- international SEO contracts
- country readiness
- search-intent metadata → SEO
- international regression gates

This stream owns the canonical jurisdiction contract. Other streams consume it rather than creating duplicate representations.

### D — Commercial & Analytics

Branch: `workstream-commercial-analytics`

Focus:
- analytics taxonomy
- calculator/search/journey funnels
- commercial intent metadata
- partner eligibility
- commercial safety gates
- commercial analytics

Commercial functionality must never become a dependency of core calculation correctness and must remain disabled until explicitly qualified.

## Integration policy

Workstreams do not need to merge in a fixed sequence. A stream can merge when its contracts are stable and its verification is GREEN.

If two streams discover a shared prerequisite, create the smallest shared contract/foundation on `main` first, then rebase/recreate the affected workstream from that baseline. Do not solve repeated conflicts by duplicating the same concept in both branches.

## Current order of execution

The workstreams are independent enough to develop in parallel, but we will complete them one at a time operationally to keep review and verification manageable:

1. Product Experience
2. International & Jurisdiction
3. Platform Quality
4. Commercial & Analytics

This order is not a dependency claim. It is an operational sequencing choice. If a later stream becomes independently ready earlier, it may be completed first.

## Branch rules

- `main` is the canonical production baseline.
- Workstream branches start from `main` and are never based on another unfinished workstream.
- Do not force-update `main`.
- Do not merge unverified work.
- Do not treat historical RED runs as current failures.
- Always match verification to the exact candidate SHA.
- After a workstream merges, the next workstream should be refreshed from the resulting `main` if it needs changes introduced by the merge.
