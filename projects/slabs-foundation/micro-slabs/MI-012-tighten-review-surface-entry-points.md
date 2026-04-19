# Micro Slab: MI-012 Tighten Review Surface Entry Points

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)

## Type

Product Implementation

## Tool Surface

Next.js, Local Markdown

## Goal

Tighten the reviewer app by making key entry points feel more natural: keep
brief access available on sparse project and macro pages, move macro editing
into the hero actions, and enrich shared global context with the main repos
used across active projects.

## Working Context

The app already handled review and editing, but a few surfaces still felt
awkward when a project was new or lightly populated. This pass should smooth
those edges so users can open the right brief, start a macro, or inspect shared
repos without hitting an empty-feeling dead end.

## Done Criteria

- empty or sparse project pages still expose an `Open brief` action
- macro creation uses clearer slab-specific labeling
- macro pages keep the edit control in the hero action row instead of a second
  empty section
- the shared GitHub repository registry includes the main RoundReserve,
  ParagonStrideWeb, DavidDeveney.com, and PAR GOLF GAME repos

## Artifacts

- [`../../../apps/slabs-reviewer/components/project-review-shell.tsx`](../../../apps/slabs-reviewer/components/project-review-shell.tsx)
- [`../../../apps/slabs-reviewer/components/project-macro-panel.tsx`](../../../apps/slabs-reviewer/components/project-macro-panel.tsx)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../global-context/shared-github-repositories.md`](../../../global-context/shared-github-repositories.md)

## Notes

When a local-first tool is working well, the important actions should feel
present even before a project is fully built out. Brief access and editing
entry points should not disappear just because a project has not been connected
to a richer external artifact yet.
