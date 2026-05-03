# Micro Slab: MI-028 Document the ignore and supersede lifecycle for automation-created micros

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

Explain what should happen after a user ignores or supersedes an
automation-created micro slab so future runs do not treat dismissed work as
fresh queue again.

## Working Context

The reviewer now lets users ignore micro slabs by marking them `Superseded`,
and some Codex-suggested slabs in Slabs Foundation have already been dismissed.
The repo still does not spell out how future automation runs should interpret
those states, how much history should remain visible, or how tracking notes
should reflect the dismissal.

## Done Criteria

- the operating model explains how ignored or superseded Codex-created micro
  slabs should remain visible without being re-suggested immediately
- the guidance defines how automation dedupe should treat `Superseded` versus
  `Ready` or `Done` micro slabs
- the rule clarifies any tracking-hub or memory updates expected after a user
  dismisses a slab
- at least one live Slabs Foundation example is referenced so the rule is
  grounded in current behavior

## Artifacts

- `docs/operating-model.md`
- `docs/automation/hourly-project-suggestions.md`
- [`../memory/2026-04-19-ignore-codex-suggested-micro-slabs.md`](../memory/2026-04-19-ignore-codex-suggested-micro-slabs.md)

## Notes

This is about the lifecycle after creation, not about SG-to-MI promotion.

## Memory Delta

Record how future automation runs should interpret ignored or superseded
Codex-suggested micro slabs.
