# Generational Release Baseline

Recorded at release-branch initialization.

- Base branch: `main`
- Baseline production commit: `78ce323de82c9a884bfae0dca7aa342b00fc6578`
- Dedicated release branch: `fincalc-generational-release`
- Release objective: Decision Platform Foundation
- Production deployment policy: no production merge/deploy until final qualification is complete
- PR #10 UI cleanup is incorporated directly into this release branch rather than deployed separately

## Baseline architectural facts

- React + Vite static client-side application
- Browser-side financial calculations
- No backend/database required for core calculation flow
- Shared configuration-driven calculator engine
- Existing SEO, trust, analytics, international and commercial subsystems
- Existing calculator-contract and golden-formula validation scripts

## Release boundaries

The generation release will harden and connect the existing systems. It will not introduce a backend, banking integrations, trading execution, social/community features, a mass calculator-count expansion, or an AI source-of-truth calculation engine.
