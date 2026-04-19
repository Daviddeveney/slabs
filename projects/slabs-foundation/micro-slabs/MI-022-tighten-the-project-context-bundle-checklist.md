# Micro Slab: MI-022 Tighten the project context bundle checklist

## Status

`Superseded`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Framework Documentation

## Tool Surface

Markdown, Codex Automation

## Goal

Expand the repo guidance for hourly suggestion runs so each project review uses
the same minimum context bundle and knows when to invoke
`primary-repository-finder`.

## Working Context

The live hourly automation already reads tracking hubs, brief links, relevant
macro slabs, memory, and context notes, but that bundle is only described in
the live prompt. The repo should define the minimum review bundle and the repo
selection fallback so future automations and humans can reason about project
context consistently.

## Done Criteria

- the proactive-suggestions template or adjacent docs list the minimum per-run
  context bundle for each project
- the guidance explains when to prefer ready or active macros and when to fall
  back to a clearly current backlog macro
- the guidance tells future runs when to use `primary-repository-finder` to
  clean up stale or ambiguous `Primary Repositories`
- the checklist stays small enough to support fast hourly review instead of
  exhaustive repo analysis

## Artifacts

- `templates/proactive-suggestions-template.md`
- `templates/automation-profile-template.md`
- `projects/README.md`

## Notes

This should tighten context gathering, not expand it indefinitely. The main win
is a sharper minimum bundle and a clearer repo-selection escape hatch.

Ignored from the reviewer after the user dismissed the Codex suggestion.

## Memory Delta

Record the minimum project context bundle future suggestion runs should gather
before proposing new work.
