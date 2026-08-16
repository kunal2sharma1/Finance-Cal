# Phase 2 — Architecture Cleanup

Completed architecture cleanup for the next product cycle.

- Centralized all core and international calculators in `src/calculatorCatalog.js`.
- Added shared calculator lookup helpers instead of repeated array construction and linear route lookups.
- Updated the main application to resolve calculator routes through the catalog.
- Updated product QA to validate the centralized catalog.
- Updated global sitemap generation to use the centralized catalog.
- Preserved the existing calculator registries as the registration layer.

The development branch remains separate from `main`; this phase does not merge or deploy production changes.
