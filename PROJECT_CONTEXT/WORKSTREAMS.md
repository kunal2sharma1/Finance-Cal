# FinCalc Workstream Plan

## Execution model

The old 88-phase sequence is retained only as historical reference. It is no longer the execution plan.

Work is now delivered through independent workstreams. A workstream contains all tasks that have meaningful dependency on one another. Independent workstreams may proceed in parallel. Each workstream is completed to a coherent milestone, verified GREEN against its exact SHA, and merged to `main` independently.

## Workstream A — Product Experience

Branch: `workstream-product-experience`

Objective: improve the user-facing decision product without depending on unfinished international, commercial, or observability architecture.

### Work packages

1. **Decision homepage**
   - Define primary user intents.
   - Build decision-oriented homepage information architecture.
   - Connect existing search, calculators, guides, and journeys.
   - Verify responsive behavior and route integrity.

2. **Decision graph UX**
   - Connect search → journey → calculator → result → next decision.
   - Reuse existing decision-journey domain contracts.
   - Avoid introducing duplicate content models.

3. **Result-to-journey experience**
   - Add contextual next-step actions from calculator results.
   - Preserve existing result interpretation and certainty policies.

4. **Search/content/calculator integration**
   - Improve cross-navigation using existing intent-aware search and canonical content relationships.
   - Do not redesign the search engine unless evidence requires it.

5. **Browser/mobile product QA**
   - Add product-specific regression coverage for the new flows.

### Dependency rule

Do not start work that requires the international/jurisdiction contract until that contract is stable. Product work may use explicit interfaces and adapters rather than importing unfinished jurisdiction internals.

### Completion criteria

- Core user journeys work end-to-end.
- Existing calculator correctness gates remain GREEN.
- Search/content/decision gates remain GREEN.
- Browser/mobile validation passes.
- No unresolved RED verification for the exact candidate SHA.
