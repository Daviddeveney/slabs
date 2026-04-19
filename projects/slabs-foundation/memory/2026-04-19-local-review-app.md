# Memory: 2026-04-19 Local Review App

## Date

2026-04-19

## Context Snapshot

Slabs needed a more approachable review surface for non-technical users. The framework already had local Markdown storage and a canonical project structure, so the next step was a simple local web app that reads those files and turns them into a cleaner project review experience.

## What Changed

- Added a local Next.js review app under `apps/slabs-reviewer/`.
- Built a project index view plus project review pages for macro and micro slabs.
- Implemented local filesystem reads of the `projects/` workspace.
- Added run instructions for the local app.

## Decisions

- Keep Markdown as the source of truth.
- Make the first app review-first rather than editable.
- Use a local server-rendered app so project files can be read directly on disk.

## Artifacts

- [`../../../apps/slabs-reviewer/README.md`](../../../apps/slabs-reviewer/README.md)
- [`../../../apps/slabs-reviewer/app/page.tsx`](../../../apps/slabs-reviewer/app/page.tsx)
- [`../../../apps/slabs-reviewer/app/project/[slug]/page.tsx`](../../../apps/slabs-reviewer/app/project/[slug]/page.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)

## Open Threads

- How much editing should the local review app support versus leaving edits in Docs and Markdown?
- Should future versions show memory and context notes directly in the same project view?
- What is the right structured metadata shape if the app needs richer filtering and status logic?

## Likely Next Actions

- Add project-level filters and sorting.
- Decide whether macro and micro files should gain explicit machine-readable metadata.
- Prototype write-back editing for a small safe subset of fields.
