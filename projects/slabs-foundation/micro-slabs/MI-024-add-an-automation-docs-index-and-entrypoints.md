# Micro Slab: MI-024 Add an automation docs index and entrypoints

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Framework Documentation

## Tool Surface

Markdown

## Goal

Create one clear repo entrypoint for automation guidance so prompt packs,
templates, and examples are easy to discover without hunting through tracking
notes or chat history.

## Working Context

`M04` now has several ready micro slabs aimed at prompt-pack and automation
rule documentation, but the repo still has no `docs/automation/` surface at
all. Add a small automation docs index that points to the hourly
project-suggestions prompt pack, related templates, and the operating-model
sections that define human review boundaries.

## Done Criteria

- a `docs/automation/README.md` file exists and explains what belongs in the
  automation docs area
- the new index links to the hourly project-suggestions prompt pack, relevant
  templates, and the core operating-model guidance
- at least one existing top-level doc points readers to the automation docs
  area so it is discoverable from normal repo entry points
- the structure stays lightweight enough to support future automation types
  without inventing a complex taxonomy

## Artifacts

- `docs/automation/README.md`
- `docs/operating-model.md`
- `projects/README.md`

## Notes

Keep this slice on information architecture and discoverability. The hourly
prompt-pack content itself belongs in other slabs.

## Memory Delta

Record where future automation guidance now lives in the repo and how users
should discover it quickly.
