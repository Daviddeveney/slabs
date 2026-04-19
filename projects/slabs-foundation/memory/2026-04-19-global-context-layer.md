# Memory: 2026-04-19 Global Context Layer

## Date

2026-04-19

## Context Snapshot

Slabs already had project-level `context/` folders, but there was no workspace
level place for references that several projects might share. GitHub
repositories were the clearest gap: repeating repo context across multiple
projects would drift quickly without a single shared source.

## What Changed

- Added `global-context/` as a first-class workspace directory for shared
  references that span multiple projects.
- Added `global-context/README.md` to explain when something belongs in global
  context instead of a project-specific `context/` note.
- Seeded the layer with `global-context/shared-github-repositories.md` as the
  first concrete example.
- Added `templates/global-context-note-template.md` so future shared references
  follow a clearer structure.
- Updated the framework docs to distinguish project context from workspace-wide
  global context.
- Surfaced global context notes on the local reviewer homepage.
- Removed `Superseded` from writable slab status options in the reviewer app.
- Collapsed the macro editor by default so macro pages lead with the working
  summary and linked micro slabs.

## Decisions

- Keep project-specific reference notes in `projects/<slug>/context/`.
- Promote shared references into `global-context/` when several projects need
  the same durable note.
- Treat shared GitHub repository registries as a canonical example of global
  context.
- Stop offering `Superseded` as a writable status while keeping legacy support
  readable if old files ever appear.

## Artifacts

- [`../../../global-context/README.md`](../../../global-context/README.md)
- [`../../../global-context/shared-github-repositories.md`](../../../global-context/shared-github-repositories.md)
- [`../../../templates/global-context-note-template.md`](../../../templates/global-context-note-template.md)
- [`../../../apps/slabs-reviewer/app/page.tsx`](../../../apps/slabs-reviewer/app/page.tsx)
- [`../../../apps/slabs-reviewer/components/global-context-shell.tsx`](../../../apps/slabs-reviewer/components/global-context-shell.tsx)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../../../apps/slabs-reviewer/lib/slab-statuses.ts`](../../../apps/slabs-reviewer/lib/slab-statuses.ts)

## Open Threads

- Which other global-context note archetypes should ship first after shared GitHub
  repositories?
- Should global context eventually get its own dedicated editor instead of
  source-preview-only access from the homepage?
- Should projects be able to pin specific global-context notes on their overview
  screens?

## Likely Next Actions

- Add more global-context examples for systems, environments, or shared
  operational references.
- Decide whether project pages should surface linked global-context notes
  directly.
- Tighten the human-facing status vocabulary across the framework now that
  `Superseded` is no longer writable in the app.
