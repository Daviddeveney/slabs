# Micro Slab: MI-020 Add automation memory template and run-summary rules

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Framework Documentation

## Tool Surface

Markdown, Codex Automation

## Goal

Define a reusable automation-memory template and summary convention so recurring
Codex runs record what they reviewed, what they created, and what they skipped
in a consistent place.

## Working Context

The hourly project-suggestions automation already depends on
`$CODEX_HOME/automations/<id>/memory.md`, but the repo does not yet describe
what those memory files should contain or how future automations should write
them. Create a minimal template and convention that captures reviewed projects,
created micro slabs, dedupe decisions, and follow-up watchpoints.

## Done Criteria

- a reusable automation-memory template exists in the repo
- the hourly prompt-pack documentation points to the template and explains when
  it should be updated
- the template captures reviewed projects, created micro slabs, skipped
  duplicates, and the current run timestamp
- repo guidance makes it clear that automation memory is durable context, not a
  transient scratchpad

## Artifacts

- `templates/automation-memory-template.md`
- `docs/automation/hourly-project-suggestions.md`
- `projects/README.md`

## Notes

Keep the template lightweight enough for hourly automations to update quickly
without turning memory into a second tracking hub.

## Memory Delta

Record the canonical structure for future automation memory notes and what each
run must preserve.
