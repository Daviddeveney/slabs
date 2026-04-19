# Memory: 2026-04-19 Local Project Structure

## Date

2026-04-19

## Context Snapshot

Slabs is intended to be local to each user, so the repo now needs an explicit multi-project workspace structure instead of leaving project layout implicit in the `slabs-foundation` example.

## What Changed

- Positioned `projects/` as the canonical local workspace root.
- Defined a standard per-project layout with `work-brief.md`, `tracking-hub.md`, `macro-slabs/`, `micro-slabs/`, `memory/`, `context/`, and `suggestions/`.
- Added `projects/README.md` as the user-facing guide for local project folders.
- Added `scripts/scaffold_project.sh` to create new project folders quickly.
- Added `templates/context-note-template.md` for longer-lived supporting context notes.

## Decisions

- Keep one folder per initiative under `projects/`.
- Separate dated session memory from broader supporting context.
- Make the local filesystem layout a first-class part of Slabs, not just an example pattern.

## Artifacts

- [`../../../projects/README.md`](../../../projects/README.md)
- [`../../../scripts/scaffold_project.sh`](../../../scripts/scaffold_project.sh)
- [`../../../templates/context-note-template.md`](../../../templates/context-note-template.md)

## Open Threads

- Which project subdirectories should remain mandatory over time versus optional?
- Should future scaffolds generate starter macro and micro slab files automatically?
- How should project-local artifacts beyond Markdown be organized if users attach a lot of files?

## Likely Next Actions

- Use the scaffold script to create a second example project.
- Tighten naming and ID conventions for macro and micro slab files.
- Decide how proactive suggestion outputs should be named inside `suggestions/`.
