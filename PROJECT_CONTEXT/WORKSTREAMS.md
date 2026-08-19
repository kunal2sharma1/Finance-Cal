# FinCalc Workstream Plan

## Workstream D — Commercial & Analytics

Branch: `workstream-commercial-analytics`

Objective: establish measurable product funnels and a safe commercial architecture without coupling commercial behavior to core calculation correctness.

### Work packages

1. **Analytics taxonomy**
   - Define stable event names, required properties, and ownership.
   - Separate product analytics from diagnostics.

2. **Calculator funnel instrumentation**
   - Measure meaningful funnel transitions without logging sensitive financial inputs.

3. **Search and journey funnels**
   - Instrument search intent, result selection, journey progression, and calculator completion.

4. **Commercial intent metadata**
   - Define explicit commercial intent states without altering calculation outputs.

5. **Partner eligibility model**
   - Define auditable eligibility criteria and explicit partner metadata.

6. **Commercial safety gates**
   - Ensure unsupported, unsafe, or unverified commercial behavior cannot silently enter production.
   - Keep commercial behavior disabled until explicitly qualified.

7. **Commercial analytics**
   - Measure partner/commercial interactions separately from core product usage.

### Dependency rule

Commercial code must not become a dependency of calculator correctness, trust, search, or jurisdiction calculations. Core product behavior must remain fully functional with commercial features disabled.

### Completion criteria

- Analytics contracts are stable and privacy-conscious.
- Critical funnels are measurable.
- Commercial eligibility is explicit and auditable.
- Commercial behavior is safely disabled unless qualified.
- Existing calculation/trust/SEO gates remain GREEN.
