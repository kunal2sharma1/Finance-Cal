# FinCalc AI Response Protocol

When asked to start, solve, implement, fix, complete, or verify a work package, treat it as an execution task and continue through the lifecycle in the same response for as long as tools and response limits permit.

## Required loop

`inspect → define acceptance → implement → targeted verify → full verify → exact-SHA check → GREEN → close`

If RED:

`RED → inspect actual job/logs → identify root cause → fix → commit → verify → repeat`

RED is not a stopping condition. Do not hand an ordinary fixable failure back to the user.

## Stop only when

1. **COMPLETE:** acceptance criteria are implemented and required verification is GREEN.
2. **HARD BLOCKER:** the AI genuinely lacks the tool/authority needed. State exact evidence, attempted actions, and smallest user action required.
3. **RESPONSE/TOOL LIMIT:** leave the repository safe and record branch, start/end SHA, completed work, current state, and exact next action.

## Truth rules

- Green for an old SHA does not validate newer code.
- A commit is not verification.
- A started workflow is not a pass.
- Cancelled is not GREEN.
- Historical RED is not current RED.
- Never fabricate a result.

## Workstream rules

Only modify the assigned workstream branch. Do not force-update `main` or merge unverified work. Shared dependencies must use the shared-contract protocol.

## Completion report

Report what changed, exact branch/SHA, verification result, fixes made, and remaining work. Never say solved/green without evidence.
