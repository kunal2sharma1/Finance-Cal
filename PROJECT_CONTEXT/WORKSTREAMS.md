# FinCalc Workstream Plan

## Workstream B — Platform Quality

Branch: `workstream-platform-quality`

Objective: strengthen reliability, observability, accessibility, performance, and automated engineering quality independently of product feature development.

### Work packages

1. **Runtime error telemetry**
   - Establish structured error categories and safe diagnostic payloads.
   - No sensitive financial-input logging.

2. **Analytics/runtime foundations**
   - Define stable event naming and payload contracts where instrumentation is needed.
   - Keep product-specific event consumers decoupled.

3. **Browser regression**
   - Representative desktop/mobile browser coverage for critical routes and calculators.

4. **Accessibility automation**
   - Automated accessibility checks on representative flows.
   - Fix semantic, keyboard, focus, label, and contrast failures found by the gate.

5. **Visual regression**
   - Establish deterministic mobile/desktop visual checks for high-risk UI surfaces.

6. **Performance**
   - Measure LCP, INP, CLS, route load cost, and calculation latency.
   - Convert meaningful regressions into deterministic gates.

7. **CI reliability**
   - Keep verification tied to exact candidate SHAs.
   - Avoid self-triggering remediation loops and speculative workflow automation.

### Dependency rule

This workstream owns shared verification infrastructure. Changes that affect application contracts must remain backward-compatible or expose a clear migration boundary before other workstreams consume them.

### Completion criteria

- Reliability/accessibility/performance gates are deterministic.
- Critical browser flows are covered.
- CI produces trustworthy SHA-matched results.
- No RED gate remains unexplained.
