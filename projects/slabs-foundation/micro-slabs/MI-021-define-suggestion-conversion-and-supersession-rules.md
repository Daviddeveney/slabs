# Micro Slab: MI-021 Define suggestion conversion and supersession rules

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

Codify when an older `SG-...` suggestion should become a real `MI-...` micro
slab, how the historical suggestion should be marked afterward, and where that
history should remain visible.

## Working Context

Slabs now has real examples of suggestions becoming execution units:
RoundReserve's `SG-004` became `MI-001`, and this run is converting additional
suggestions into real micro slabs. The operating model still does not explain
how those transitions should be recorded, which leaves suggestion history and
tracking-hub cleanup inconsistent.

## Done Criteria

- the operating model explains when to convert a suggestion into a real micro
  slab instead of leaving it as advisory history
- the guidance defines which status to apply to the original `SG-...` file
  after conversion
- the guidance explains how tracking hubs and linked macro sections should be
  updated when a suggestion becomes a real micro slab
- at least one live project example is referenced so the rule is grounded

## Artifacts

- `docs/operating-model.md`
- `docs/automation/hourly-project-suggestions.md`
- [`../tracking-hub.md`](../tracking-hub.md)

## Notes

Preserve history rather than deleting old suggestions, but make the superseded
state unambiguous so automation and humans do not treat the same slice as open
twice.

## Memory Delta

Capture the rule for SG-to-MI promotion and the expected tracking cleanup that
follows.
