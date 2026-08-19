# FinCalc Workstreams

## Product Experience
Branch: `workstream-product-experience`
Scope: decision-oriented entry experience, decision graph UX, result-to-journey UX, search/content/calculator integration, browser/mobile qualification.

## International & Jurisdiction
Branch: `workstream-international-jurisdiction`
Scope: country/locale/currency/number separation, jurisdiction architecture, country readiness, international routing/SEO, search-intent SEO integration.

## Platform Quality
Branch: `workstream-platform-quality`
Scope: runtime diagnostics, accessibility, browser/visual regression, performance, CI reliability.

## Commercial & Analytics
Branch: `workstream-commercial-analytics`
Scope: analytics taxonomy, product funnels, search/journey analytics, commercial intent, partner eligibility/safety, commercial measurement.

## Operational sequence

Product Experience and International & Jurisdiction are the first active streams. They may work simultaneously because their unfinished code is isolated. Platform Quality and Commercial & Analytics are prepared for later activation.

If a shared prerequisite is discovered, establish the smallest stable shared contract through `main`; do not copy competing versions into separate branches.
