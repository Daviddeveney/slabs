# Micro Slab: MI-032 Define dedupe heuristics for automation-created micro slabs

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

Document the heuristics future automations should use to decide when a proposed
micro slab is too close to an existing unsuperseded micro slab and should be
replaced with a different slice instead.

## Working Context

Slabs now has many real `MI-...` artifacts created by automation, so exact
title matching is no longer enough to avoid duplicate work. The repo needs a
clear rule for comparing goal, artifact set, and execution slice before adding
another Codex-suggested micro slab to the queue.

## Done Criteria

- the automation guidance defines how to compare a new candidate against
  existing `Ready`, `Active`, `Done`, and `Superseded` micro slabs
- the rule explains which overlaps should block creation entirely versus cause
  the candidate to be narrowed or reframed
- the guidance gives at least one live dedupe example from current project
  micro slabs
- the rule stays compact enough for an hourly run to apply quickly

## Artifacts

- `docs/automation/hourly-project-suggestions.md`
- `docs/operating-model.md`
- `templates/micro-slab-template.md`

## Notes

This is the dedupe pass before creation, not the later ignore or supersede
lifecycle after a slab already exists.

## Memory Delta

Capture the similarity checks hourly runs should apply before creating a new
micro slab.
