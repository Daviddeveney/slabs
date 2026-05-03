# Memory: Project Workspace Cleanup

## Date

2026-05-02

## Context Snapshot

The repo has several local project folders under `projects/`. The intended
setup was documented and scaffoldable, but it was not directly validated, and
the Slabs Foundation example still carried a root-level `work-brief.md` from
before the Google Doc `brief-link.txt` model.

## What Changed

- Added `scripts/validate_project_setups.sh` to check all projects or one
  project for the standard folder and file contract.
- Documented the validator in `README.md` and `projects/README.md`.
- Added root `.gitignore` entries for local scratch output: `.artifacts/`,
  `outputs/`, and `tmp/`.
- Moved the old Slabs Foundation local brief to
  `projects/slabs-foundation/context/legacy-work-brief.md`.
- Added `projects/slabs-foundation/context/project-context.md` so the canonical
  example project now has the same context folder shape as the local projects.

## Decisions

- Treat root-level project `work-brief.md` files as legacy artifacts.
- Preserve useful legacy brief content under `context/` instead of deleting it.
- Make `brief-link.txt` optional for structural validity but warn when it is
  missing because active suggestion workflows work best with a live brief link.

## Artifacts

- [`../../../scripts/validate_project_setups.sh`](../../../scripts/validate_project_setups.sh)
- [`../context/project-context.md`](../context/project-context.md)
- [`../context/legacy-work-brief.md`](../context/legacy-work-brief.md)
- [`../../../projects/README.md`](../../../projects/README.md)
- [`../../../README.md`](../../../README.md)

## Open Threads

- Some local-only projects still have sparse automation profiles. The validator
  reports those as warnings rather than errors so placeholders can exist before
  an initiative becomes active.

## Likely Next Actions

- Run `./scripts/validate_project_setups.sh --strict` before depending on a
  project for proactive suggestion automation.
