# Global Context

The `global-context/` directory stores workspace-wide reference material that
multiple projects may need to reuse.

In this repo, only `README.md` is version-controlled by default. Additional
notes created under `global-context/` are intentionally ignored by git so each
user can keep shared workspace references locally without publishing personal
context by accident.

Use this directory when a note should exist once for the whole Slabs workspace
instead of being copied into several project-specific `context/` folders.

Good fits include:

- shared GitHub repository registries
- common environments, accounts, or integration references
- durable taxonomy or naming rules used by many projects
- shared vendor, partner, or system notes
- reusable prompt packs or operational checklists that several projects depend on

Use `projects/<project-slug>/context/` when the note only matters to one
project.

When a reference starts project-specific and later becomes useful across
multiple projects, promote it into `global-context/` and update the project
notes to link back here.

If you intentionally want to publish a workspace-wide note as part of the
framework, update `global-context/.gitignore` first.
