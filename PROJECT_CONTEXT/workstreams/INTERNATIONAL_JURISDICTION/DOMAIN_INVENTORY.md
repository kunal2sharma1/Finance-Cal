# International & Jurisdiction — Domain Inventory

Branch: `workstream-international-jurisdiction`
Phase: IJ-01 — Domain inventory and separation contract
Starting SHA: `9bc07f8531ee4d89af3d4bc09d36de5060258c83`

## Purpose

This document is the canonical IJ-01 inventory and separation contract. It records the current implementation as found on the branch and defines the ownership boundary that later IJ phases must preserve.

## Canonical concepts

| Concept | Canonical meaning | Owner | Must not own |
| --- | --- | --- | --- |
| **Country** | A geographic/legal market identified by a stable country code, e.g. `IN`, `US`, `GB`. | Country/domain catalog | Locale formatting, currency choice, or calculator rules by implication |
| **Locale** | A presentation/formatting convention, e.g. `en-IN` or `en-US`. | Presentation/localization layer | Calculation rules or legal/jurisdiction eligibility |
| **Currency** | A monetary unit/code, e.g. `INR`, `USD`, `GBP`. | Money presentation/value metadata | Legal rules or locale/number grouping |
| **Number system** | A numeric presentation convention, currently `indian` or `international`. | Number-formatting layer | Calculation jurisdiction |
| **Calculation jurisdiction** | The legal/rule context whose assumptions, limits, eligibility, or methodology determine a calculation. | Jurisdiction/rule registry (future IJ-03) | Browser locale, currency, or number formatting |

## Precedence and non-fallback contract

1. A **country** may provide defaults for presentation metadata, but country identity is not a calculation rule by itself.
2. A **locale** controls presentation only. Changing locale/number grouping must never change a formula's calculation jurisdiction.
3. A **currency** controls monetary representation only. Currency must not be used as a proxy for country or legal rules.
4. A **number system** controls display grouping only. It must never select a jurisdiction.
5. A **calculation jurisdiction** is explicit for jurisdiction-sensitive calculators and owns their rules, sources, and methodology.
6. Unsupported jurisdiction is an explicit state. It must never silently fall back to another jurisdiction's rules.
7. Generic/global calculators may intentionally have no calculation jurisdiction when their formula is not legally or country-rule dependent.

## Current implementation inventory

### Country / presentation coupling

`src/country.js` currently stores country code, name, flag, currency, and locale together in the `countries` array. `getCountry()` also falls back to `DEFAULT_COUNTRY` (`IN`) when an unknown code is supplied. `getInitialCountry()` infers country from local storage/browser locale. `getInitialNumberSystem()` derives the initial number system from country when no stored preference exists. `formatMoney()` combines the selected country's currency with either `en-IN` or `en-US` formatting. This is existing coupling to be separated in IJ-02; IJ-01 does not rewrite it. 

### Calculator country mapping

International calculator configs currently declare `countries`, e.g. `['US']` for the 401(k) calculator. `src/calculatorCatalog.js` uses those arrays for country filtering. The current international validation script also treats `config.countries` as the mapping for localized calculators. In IJ-03 this mapping must be replaced or formalized as an explicit calculation-jurisdiction contract for jurisdiction-sensitive calculators.

### International calculator registry

`src/internationalCalculators.js` is the explicit registry for localized calculators. It joins each calculator's config, formula, and explanation. This registry should remain calculation-discovery infrastructure; it should not become a second jurisdiction registry.

### International SEO

`src/internationalSeo.js` stores calculator SEO metadata keyed by calculator ID. `src/seo.js` selects calculator SEO first from the general calculator SEO registry and then from international SEO. It also integrates search-intent metadata from `seoIntentContent` into page metadata and schema. IJ-05/IJ-06 may consume the jurisdiction contract, but IJ-01 does not change SEO behavior.

### Country pages

`src/countryPages.js` defines country-specific content and priority calculator IDs for the currently represented country pages. The page content explicitly distinguishes local rules from generic calculators. This is useful presentation/content metadata, not a substitute for a calculation jurisdiction registry.

### Existing verification

`npm run international:check` validates localized calculator IDs, country mappings, international SEO metadata, required fields/results, and expected localized calculator coverage. Existing formula/SEO/build workflows remain part of the required regression surface.

## Current coupling / risks

1. Country records currently own currency and locale fields in the same object.
2. `getCountry()` silently maps an unknown country code to India; this is acceptable as a current UI compatibility behavior only and is **not** an acceptable jurisdiction fallback contract.
3. Number-system selection currently derives from country when no explicit preference exists.
4. `config.countries` is overloaded as the localized calculator's legal/rule mapping.
5. There is no explicit calculation-jurisdiction identifier or supported/unsupported jurisdiction state in the current contract.
6. There is no machine-checkable jurisdiction rule ownership registry yet.
7. International SEO metadata is keyed by calculator ID rather than by a jurisdiction contract.

## IJ-01 separation contract

The following identifiers are reserved as the stable public vocabulary for later phases:

- `countryCode`: stable country identity.
- `locale`: presentation locale.
- `currencyCode`: monetary unit.
- `numberSystem`: numeric presentation convention.
- `jurisdictionId`: explicit calculation-rule identity.

The stable direction of dependency is:

`countryCode -> presentation defaults (optional)`

`locale + currencyCode + numberSystem -> presentation only`

`jurisdictionId -> calculation rules / sources / methodology`

A country may map to one or more jurisdiction IDs in a future registry, and a jurisdiction may serve one or more countries where legally appropriate. The mapping must be explicit; it must not be inferred from currency or locale.

## Out of scope for IJ-01

- Changing any calculator formula or mathematical output.
- Adding jurisdiction-specific rules.
- Creating country readiness logic.
- Adding international URL routing or hreflang.
- Rewriting SEO metadata models.
- Removing existing compatibility fallbacks from current country selection before IJ-02/IJ-03 define their replacement contract.
