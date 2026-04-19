# Micro Slab: MI-010 Define Global Context Layer

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M01-shape-the-model.md`](../macro-slabs/M01-shape-the-model.md)

## Type

Framework Design, Review Surface

## Tool Surface

Markdown, Next.js, local workspace structure

## Goal

Define a workspace-wide global context layer for references shared across several
projects, seed it with a shared GitHub repository registry example, and surface
that layer in the local reviewer app.

## Working Context

Project-level `context/` notes are useful, but they are the wrong home for
references that many projects need at once. Shared GitHub repositories are the
clearest example: duplicating repo metadata across several briefs and context
files will drift quickly unless the workspace has one canonical shared layer.

## Done Criteria

- `global-context/` exists as a first-class workspace directory
- framework docs distinguish project context from workspace-wide global context
- a shared GitHub repository registry example exists
- the local reviewer homepage surfaces global context notes
- writable slab statuses no longer offer `Superseded`
- macro editing stays collapsed by default until the user explicitly opens it

## Artifacts

- [`../../../global-context/README.md`](../../../global-context/README.md)
- [`../../../global-context/shared-github-repositories.md`](../../../global-context/shared-github-repositories.md)
- [`../../../templates/global-context-note-template.md`](../../../templates/global-context-note-template.md)
- [`../../../apps/slabs-reviewer/app/page.tsx`](../../../apps/slabs-reviewer/app/page.tsx)
- [`../../../apps/slabs-reviewer/components/global-context-shell.tsx`](../../../apps/slabs-reviewer/components/global-context-shell.tsx)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../../../apps/slabs-reviewer/lib/slab-statuses.ts`](../../../apps/slabs-reviewer/lib/slab-statuses.ts)
- [`../../../docs/concepts.md`](../../../docs/concepts.md)
- [`../../../docs/operating-model.md`](../../../docs/operating-model.md)
- [`../../../README.md`](../../../README.md)

## Notes

This adds a second scope for durable reference material: project-specific
`context/` notes stay inside each project, while workspace-wide references live
once in `global-context/` and can be linked from many projects.

## Memory Delta

- Slabs now distinguishes project context from workspace-wide global context.
- Shared GitHub repository references have a canonical home outside any one
  project.
- The reviewer app homepage now surfaces global context notes alongside
  projects.
- Macro editing is quieter because the full form stays collapsed until the user
  asks to edit it.
- `Superseded` is no longer a writable slab status in the review app.
