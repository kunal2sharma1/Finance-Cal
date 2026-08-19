# Parallel Work Protocol

Two ChatGPT accounts may work simultaneously on separate workstream branches.

## Isolation

Each account works only on its assigned branch and scope. Never force-update `main`, modify another active branch, or invent a competing shared domain concept.

## Shared dependency

If a task requires an unfinished contract from another stream, record the dependency, continue independent work, and do not duplicate the contract. A genuinely shared foundation should be introduced through `main`, verified, then consumed by downstream branches.

## Phase lifecycle

`inspect → plan → implement → targeted tests → full verification → exact-SHA verification → GREEN → close`

If RED, inspect actual logs, fix root cause, commit, and repeat until GREEN or a genuine hard blocker/response limit.

## Completion record

Record branch, starting SHA, ending SHA, work completed, verification run/SHA, RED issues and fixes, remaining work, and next phase in the workstream roadmap and session log.

## Merge

A workstream may merge only after its acceptance criteria and exact-SHA verification are GREEN. Production verification follows the merge separately.
