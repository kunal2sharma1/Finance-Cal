# FinCalc AI Response Protocol

## Purpose

This protocol controls how an AI agent should execute project work in a response. The objective is to finish the requested work, not merely begin implementation and hand unresolved failures back to the user.

## Default execution rule

When the user asks to start, solve, implement, fix, complete, verify, or continue a work package, the AI should treat the request as an execution task.

The AI should continue working through the full task lifecycle in the same response for as long as tools and response limits permit.

Do not stop merely because:
- implementation has been committed;
- one test passed;
- a workflow was started;
- a RED result was discovered;
- an intermediate dependency was found that can be solved now;
- the work became slightly more complicated than expected.

## Required loop

For every task:

1. **Inspect**
   - Read project context.
   - Inspect the actual branch and HEAD.
   - Inspect existing implementation, tests, and relevant workflows.

2. **Define**
   - Determine the concrete acceptance criteria.
   - Identify dependencies and scope boundaries.
   - Do not invent requirements that contradict the repository.

3. **Implement**
   - Make the smallest coherent change that satisfies the requirement.
   - Preserve existing contracts unless the task explicitly changes them.

4. **Verify**
   - Run targeted validation.
   - Run the relevant full verification workflow when required.
   - Always associate verification with the exact candidate SHA.

5. **Resolve RED**
   - If RED, do not stop.
   - Inspect the actual failing job and logs.
   - Identify root cause rather than treating symptoms.
   - Fix the root cause.
   - Commit the fix.
   - Re-run verification.
   - Repeat this loop until GREEN or until the response/tool limit is reached.

6. **Complete**
   - Only report completion after acceptance criteria and required verification are GREEN.
   - Update project context and session log.
   - Report exact final SHA and verification result.

## When to stop

The AI should stop only when one of these is true:

### A. COMPLETE
The requested task is implemented, verified, and GREEN.

### B. HARD BLOCKER / RED
The task is genuinely blocked by something the AI cannot resolve with available tools or authority. The response must state:
- exact blocker;
- evidence;
- what was attempted;
- why it cannot be resolved automatically;
- the single smallest user action required, if any.

Do not call an ordinary failing test a final blocker if the AI can still inspect and fix it.

### C. RESPONSE / TOOL LIMIT
The available response/tool execution limit is reached before completion.

In this case, do not falsely claim success. Leave the repository in the safest recoverable state and update `SESSION_LOG.md` with:
- exact branch;
- starting and ending SHA;
- work completed;
- current RED/pending state;
- exact next action.

The next response/session must resume from that state rather than restarting or repeating completed work.

## RED is not a stopping condition by itself

A RED result means **enter the repair loop**.

Correct:

`RED → inspect → root cause → fix → commit → verify → RED? repeat : GREEN → complete`

Incorrect:

`RED → tell user to fix it`

unless the AI genuinely lacks the authority/tool required to fix it.

## CI truth rules

- Green for an older SHA does not validate newer code.
- A successful commit does not mean CI passed.
- A started workflow does not mean verification passed.
- A cancelled workflow is not GREEN.
- Historical RED runs are not current failures.
- Production health is separate from branch CI health.
- Never manufacture a green result.

## Workstream rules

- Work only on the assigned workstream branch.
- Do not modify another active workstream branch.
- Do not force-update `main`.
- Do not merge unverified work.
- If a shared dependency is required, identify it explicitly and use the shared-contract protocol.

## User-facing response

When complete, the final response should be concise but include:

- what was completed;
- exact branch and final SHA;
- verification result;
- important fixes made;
- remaining work, if any.

If blocked, say **BLOCKED** clearly and give the precise reason.

Never say “done”, “solved”, “fixed”, or “green” unless the repository evidence supports that claim.
