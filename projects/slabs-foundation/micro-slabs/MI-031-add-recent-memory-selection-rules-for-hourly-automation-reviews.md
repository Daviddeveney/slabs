# Micro Slab: MI-031 Add recent-memory selection rules for hourly automation reviews

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Operating Model

## Tool Surface

Markdown

## Goal

Define how hourly suggestion runs should choose a small, relevant subset of
project memory files instead of re-reading every note on every pass.

## Working Context

The automation already depends on memory for dedupe and continuity, and the
prompt now says to read recent memory files. What still is not codified is how
many notes to review, how to weigh recency versus topical relevance, and when
automation memory can stand in for re-opening older project memory.

## Done Criteria

- the automation guidance defines a lightweight recent-memory selection rule
  suitable for hourly runs
- the rules explain when to prefer the newest project memory, when to reach for
  an older topical note, and when to stop reading more
- the guidance distinguishes project memory from automation memory cleanly
- at least one current memory example is referenced from each live project

## Artifacts

- `docs/automation/hourly-project-suggestions.md`
- `docs/operating-model.md`
- `projects/slabs-foundation/memory/2026-04-19-project-automation-profiles.md`
- `projects/roundreserve/memory/2026-04-19-codex-created-first-real-micro-slab.md`

## Notes

Favor a small rule set that preserves speed. This should reduce context sprawl,
not create another checklist wall.

## Memory Delta

Record the bounded memory-selection rule future hourly reviews should reuse.
