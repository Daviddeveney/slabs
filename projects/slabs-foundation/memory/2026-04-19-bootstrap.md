# Memory: 2026-04-19 Slabs Bootstrap

## Date

2026-04-19

## Context Snapshot

The user wants a new ways-of-working project called Slabs with its own public GitHub repository. The system is intended to organize Codex work through a work brief, macro slabs, micro slabs, work tracking, Markdown memory files, and proactive suggested micro slabs generated during off-hours.

## What Changed

- Created the first docs-first repository structure for Slabs.
- Defined the core concept model and operating model.
- Added starter templates for briefs, slabs, tracking, memory, and proactive suggestions.
- Seeded a live bootstrap project that uses Slabs to build Slabs.
- Published the public GitHub repo at `https://github.com/Daviddeveney/slabs`.

## Decisions

- Start with Markdown rather than a custom application.
- Keep the automation story suggestion-oriented rather than fully autonomous.
- Use the repo itself as the first live demonstration of the framework.

## Artifacts

- `README.md`
- `docs/concepts.md`
- `docs/operating-model.md`
- `templates/`
- `projects/slabs-foundation/`

## Open Threads

- Refine the status model.
- Decide how opinionated IDs and folder structure should become.
- Design the first Codex automation prompt for proactive suggestions.

## Likely Next Actions

- Publish the public repo and link it into the work brief.
- Draft the first automation workflow for suggested micro slabs.
- Add another example project to test whether the model generalizes cleanly.
