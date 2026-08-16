# FinCalc SEO Growth V1

This branch is the pre-indexing SEO growth cycle. The goal is to make the site easier for people to use and easier for search engines to discover and understand, without publishing low-value pages or claiming ranking guarantees.

## Workstreams

1. Calculator page quality: clear intent, inputs, outputs, methodology, assumptions, examples and related tools.
2. Topic architecture: connect calculators, guides and topic hubs into coherent clusters.
3. Internal links: every guide links to tools; every topic hub exposes relevant guides; calculator pages expose related tools.
4. Search-intent guides: add focused guides for high-value calculator intents rather than generic keyword pages.
5. Country SEO: keep country-specific rules localized and connect country landing pages to relevant tools.
6. SERP readiness: keep titles/descriptions specific, readable and aligned with the page's actual purpose.
7. Technical SEO: preserve canonical, robots, sitemap and crawlable navigation; validate them continuously.
8. QA: fail CI for broken guide links, missing coverage for priority calculators, duplicate guide slugs, and malformed metadata.

## Release rule

All SEO Growth V1 work stays on `seo-growth-v1` until the full validation suite passes. Only then should the cycle be merged into `main` in one release batch.

## Success criteria

- Priority calculator intents have useful supporting guides.
- Guides and topic hubs are strongly interlinked.
- No broken internal guide/calculator links.
- Metadata remains valid and intentional.
- Sitemap and robots remain intact.
- Google can crawl representative calculator pages in live tests.
- No promise of rankings or indexing is made; success is measured through crawlability, discoverability and later Search Console impressions/clicks.
