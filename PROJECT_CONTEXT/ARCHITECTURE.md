# Architecture and Product Model

## Product thesis

FinCalc is being built as a financial decision platform, not merely a collection of calculators.

The product should help a user move through:

`intent → discovery → calculation → interpretation → next decision`

Trust is a product feature. Calculations must be reproducible, scoped, explicit about certainty/precision, and connected to methodology/provenance where applicable.

## Core layers

### 1. Calculator domain

The calculator catalog and schema define calculator identity, inputs, outputs, classification, scope, and contract expectations.

Important supporting modules include:

- `src/calculatorSchema.js`
- `src/calculatorMeta.js`
- `src/calculatorScope.js`
- `src/phase3Calculators.js`
- `src/calculatorCertainty.js`
- `src/precisionPolicy.js`
- `src/calculatorInputGroups.js`
- `src/inputControlPolicy.js`
- `src/inputValidation.js`

### 2. Trust and methodology

Trust is represented explicitly rather than being hidden in UI copy. The project has rules/definitions for provenance, methodology, model scope, result certainty, and precision.

Key files:

- `src/trustDefinition.js`
- `src/trustDefinitions.js`
- `src/trustRules.js`
- `src/calculatorScope.js`
- `src/calculatorCertainty.js`
- `src/precisionPolicy.js`

### 3. Search and discovery

Search is a first-class product layer. It includes a structured index, intent-aware ranking, intent detection, synonym/typo recovery, and zero-result recovery.

Key files:

- `src/searchCatalog.js`
- `src/searchIndex.js`
- `src/searchIntent.js`
- `src/searchRecovery.js`

### 4. Content model

Content is modeled canonically so guides and decision content do not drift into duplicated, separately sourced versions.

Key files:

- `src/contentModel.js`
- `src/decisionJourneys.js`

### 5. Decision journeys

Decision journeys connect user intent to relevant calculators/content and can suggest the next calculation. They are intended to turn FinCalc from a calculator directory into a decision system.

Key files:

- `src/decisionJourneys.js`
- `src/pages/DecisionJourney.jsx`
- `src/components/NextCalculatorSection.jsx`

### 6. SEO/indexability

SEO is generated from the same product/content model rather than maintained as an unrelated static layer.

Key files:

- `src/seo.js`
- `src/siteConfig.js`
- `src/indexabilityPolicy.js`
- `scripts/canonical-url-check.mjs`
- `scripts/indexability-check.mjs`
- `scripts/seo-crawl-check.mjs`
- `scripts/generate-global-sitemap.mjs`

The production-like crawl validates sitemap routes against the built preview and has per-route request timeouts so one hung route cannot stall the entire verification indefinitely.

### 7. UI/runtime

The application is React/Vite. UI work includes calculator forms, result panels, decision journeys, mobile-specific behavior, and responsive styling.

Primary areas:

- `src/App.jsx`
- `src/AppSeo.jsx`
- `src/pages/`
- `src/components/`

## Current engineering principles

1. Prefer centralized metadata/policy over scattered conditionals.
2. Keep calculation logic separate from presentation.
3. Do not silently mix country, currency, locale, number formatting, and calculation jurisdiction.
4. Never represent an unsupported financial assumption as universal truth.
5. Do not call a phase complete without the corresponding verification.
6. Verification must target the exact candidate SHA.
7. Production `main` is the canonical baseline; feature work happens on milestone branches.
8. Milestones should be small enough to deploy and rollback safely.
9. Historical failed CI runs do not describe the current code; current verification must be tied to the current SHA.
10. Commercial functionality must not silently alter financial calculations or trust semantics.
