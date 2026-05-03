# Micro Slab: MI-026 Define tracking-hub write-back rules for Codex-suggested micros

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Operating Model

## Tool Surface

Markdown, Templates

## Goal

Codify exactly how tracking hubs should record newly created Codex-suggested
micro slabs so automation write-back stays consistent across projects.

## Working Context

The live hourly automation now appends real `MI-...` slabs into tracking hubs,
but the repo still does not define how those rows should be phrased, when they
belong in active-or-recent work, or what session-log note should accompany a
batch creation pass. Turn the current live behavior into a small rule set and
template update.

## Done Criteria

- the tracking-hub template explains how to add Codex-suggested micro slabs to
  the active-or-recent table
- the guidance defines the minimum row note, including the Codex-suggested
  marker and a short scope summary
- the guidance explains when to add a session-log entry for a batch automation
  run
- the rules fit the existing tracking-hub format instead of inventing a second
  automation-only tracking surface

## Artifacts

- `templates/tracking-hub-template.md`
- `docs/automation/hourly-project-suggestions.md`
- `docs/operating-model.md`

## Notes

Keep this slice on tracking write-back conventions, not on broader micro-slab
quality rules.

## Memory Delta

Record the standard tracking-hub update pattern for future Codex-suggested
micro-slab batches.
