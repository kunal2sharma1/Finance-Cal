# Parallel ChatGPT Work Protocol

## Purpose

Two ChatGPT accounts may work on two different FinCalc workstream branches simultaneously. The repository, not either chat, is the source of truth.

## Before starting

The account must read:

1. `PROJECT_CONTEXT/README.md`
2. `PROJECT_CONTEXT/AI_HANDOFF.md`
3. `PROJECT_CONTEXT/CURRENT_STATE.md`
4. `PROJECT_CONTEXT/WORKSTREAMS.md`
5. its workstream `README.md` and `ROADMAP.md`
6. latest `SESSION_LOG.md`

Then inspect the actual branch HEAD.

## Branch isolation

An account may modify only its assigned workstream branch and the files/components explicitly within its scope.

Never:
- force-update `main`;
- modify another active workstream branch;
- merge another workstream into the current branch;
- duplicate a shared domain concept because another branch has not finished it;
- assume another branch's unmerged code exists.

## Shared dependency protocol

If work requires an unfinished contract from another stream:

1. record the dependency in the workstream roadmap;
2. continue all independent work;
3. do not invent a competing contract;
4. if the contract is genuinely shared, propose the smallest stable foundation for `main`;
5. verify that foundation before downstream branches consume it.

## Phase execution

Every workstream phase follows:

`inspect → plan → implement → targeted tests → full verification → exact-SHA verification → GREEN → close phase`

If RED:

`read logs → identify root cause → fix → commit → rerun → repeat until GREEN`

Do not stop at implementation.

## Completion record

When a phase/work package is complete, update:

- workstream `ROADMAP.md`;
- workstream `CURRENT_STATE.md` if present;
- root `CURRENT_STATE.md` when the branch status changes materially;
- `SESSION_LOG.md`.

Record:
- exact branch;
- starting SHA;
- ending SHA;
- tests run;
- verification run and exact SHA;
- RED issues and fixes;
- remaining work;
- next phase.

## Merge protocol

A workstream may open a PR only when:

- its acceptance criteria are complete;
- required targeted tests pass;
- full verification is GREEN;
- the green result matches the exact candidate SHA;
- no unresolved dependency is hidden in the branch.

After merge, production verification is separate from branch CI verification.

## Simultaneous work

Two accounts can work concurrently because branches are isolated. If both need the same file or contract, stop that conflicting portion and coordinate through `main` rather than resolving the conflict by guesswork.

The objective is parallel progress without parallel definitions of the same architecture.
