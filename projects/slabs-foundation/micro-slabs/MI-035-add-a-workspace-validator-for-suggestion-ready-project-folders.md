# Micro Slab: MI-035 Add a workspace validator for suggestion-ready project folders

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Implementation

## Tool Surface

Bash, Markdown

## Goal

Add one repo-local validator that checks whether Slabs project folders meet the
minimum structure and file contract expected by suggestion-oriented
automations.

## Working Context

`scaffold_project.sh` creates the standard project shape, but there is still no
quick way to verify that an edited or older project remains suggestion-ready.
Add a small workspace check that validates expected directories, key files, and
the most important contract sections before automation or reviewer workflows
depend on them.

## Done Criteria

- a repo-local command can scan one project or the whole workspace for
  suggestion-readiness issues
- the validator checks the minimum folder and file contract plus a few critical
  content gaps such as an empty automation profile
- output is actionable enough that a user can fix the project without reading
  code
- the validator is documented from a normal repo entry point

## Artifacts

- `/Users/daviddeveney/Documents/Slabs/scripts/`
- `/Users/daviddeveney/Documents/Slabs/projects/README.md`
- `/Users/daviddeveney/Documents/Slabs/README.md`

## Notes

Kept this focused on the existing project contract instead of inventing a large
schema or metadata system. The validator reports hard errors for missing setup
files or folders and warnings for suggestion-readiness gaps.

## Memory Delta

2026-05-02: Added `scripts/validate_project_setups.sh`, documented it in the
root and projects README files, normalized the Slabs Foundation project context
folder, and archived the legacy local brief under `context/`.
