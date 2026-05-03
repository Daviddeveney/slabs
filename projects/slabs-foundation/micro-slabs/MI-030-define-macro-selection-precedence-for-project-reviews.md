# Micro Slab: MI-030 Define macro selection precedence for project reviews

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

Spell out how an hourly review should choose one parent macro slab when a
project has several `Active`, `Ready`, `Backlog`, `Done`, or `Superseded`
options in play.

## Working Context

The live automation currently prefers `Active` or `Ready` macros and falls back
to one clearly current backlog item tied to the brief or tracking hub, but that
decision logic still lives mostly in prompt text. Slabs needs repo-side rules
for tie-breaks so future runs stay consistent across projects.

## Done Criteria

- the automation docs define a clear macro priority order for hourly reviews
- the guidance explains how to break ties between multiple plausible `Ready` or
  `Backlog` macros
- the rules clarify when a project should keep using the same macro across
  several runs versus switching to a different one
- at least one live example from Slabs Foundation or RoundReserve is referenced

## Artifacts

- `docs/automation/hourly-project-suggestions.md`
- `docs/operating-model.md`
- `projects/slabs-foundation/tracking-hub.md`
- `projects/roundreserve/tracking-hub.md`

## Notes

This is about parent-macro choice for suggestion runs, not about human planning
in general.

## Memory Delta

Capture the stable macro-selection order hourly reviews should follow.
