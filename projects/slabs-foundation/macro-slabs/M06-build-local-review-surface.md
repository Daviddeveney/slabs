# Macro Slab: M06 Build Local Review Surface

## Status

`Done`

## Parent Brief

- [`../work-brief.md`](../work-brief.md)

## Objective

Create a simple local web application that lets non-technical users review macro slabs and their linked micro slabs, then step into a dedicated macro editing flow with clearer navigation, collapsed micro work, and source-aware links without opening raw Markdown files.

## Why It Matters

Markdown works well as durable storage for Codex, but it is not the best human review surface. A local app gives users a more approachable way to inspect and update project structure while keeping the files on disk as the source of truth.

## In Scope

- local project index
- project index view
- macro slab review surface with work-priority sorting
- dedicated macro detail pages
- surface breadcrumbs that make the current screen obvious
- readable list and artifact presentation before edit mode
- linked micro slab editing inside each macro view
- collapsed-by-default micro slab sections
- local source preview routes for repo artifacts
- local write-back for macro and linked micro slab files
- project-level automation profile viewing and editing

## Out of Scope

- full project-wide editing beyond macro-linked work
- authentication
- sync or collaboration workflows

## Dependencies

- canonical local project structure
- stable enough macro and micro slab file conventions

## Linked Micro Slabs

- [`../micro-slabs/MI-008-build-local-review-app.md`](../micro-slabs/MI-008-build-local-review-app.md)
- [`../micro-slabs/MI-009-add-review-app-macro-editor-flow.md`](../micro-slabs/MI-009-add-review-app-macro-editor-flow.md)
- [`../micro-slabs/MI-011-add-review-app-creation-surfaces.md`](../micro-slabs/MI-011-add-review-app-creation-surfaces.md)
- [`../micro-slabs/MI-012-tighten-review-surface-entry-points.md`](../micro-slabs/MI-012-tighten-review-surface-entry-points.md)
- [`../micro-slabs/MI-013-shift-project-briefs-to-google-doc-links.md`](../micro-slabs/MI-013-shift-project-briefs-to-google-doc-links.md)
- [`../micro-slabs/MI-015-add-project-automation-profiles-to-reviewer.md`](../micro-slabs/MI-015-add-project-automation-profiles-to-reviewer.md)

## Done Criteria

- a local app exists under `apps/`
- the app reads the `projects/` workspace directly
- users can review macro slabs and linked micro slabs without opening raw Markdown files
- users can open a macro from the project view and edit the macro plus its linked micro slabs
- users can tell whether they are on a project screen or macro screen at a glance
- artifact references are navigable from the UI
- linked micros stay compact until the user opens one
- macro and linked micro slab changes write back to local Markdown files
- users can create a macro slab directly from a project page
- users can create a shared global-context note from the source preview surface
- project and macro screens can attach and open a Google Doc brief link without
  relying on a local `work-brief.md`
- macro edit controls live with the main hero actions instead of a secondary
  empty shell
- project screens can view and update a repo-backed `automation-profile.md`
  without opening raw Markdown files
- the app is runnable locally with clear instructions

## Artifacts

- [`../../../apps/slabs-reviewer/README.md`](../../../apps/slabs-reviewer/README.md)
- [`../../../apps/slabs-reviewer/app/page.tsx`](../../../apps/slabs-reviewer/app/page.tsx)
- [`../../../apps/slabs-reviewer/app/project/[slug]/page.tsx`](../../../apps/slabs-reviewer/app/project/[slug]/page.tsx)
- [`../../../apps/slabs-reviewer/app/project/[slug]/macro/[macroId]/page.tsx`](../../../apps/slabs-reviewer/app/project/[slug]/macro/[macroId]/page.tsx)
- [`../../../apps/slabs-reviewer/app/source/page.tsx`](../../../apps/slabs-reviewer/app/source/page.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/route.ts)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/macro/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/macro/route.ts)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/route.ts)
- [`../../../apps/slabs-reviewer/app/api/global-context/route.ts`](../../../apps/slabs-reviewer/app/api/global-context/route.ts)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/components/project-macro-panel.tsx`](../../../apps/slabs-reviewer/components/project-macro-panel.tsx)
- [`../../../apps/slabs-reviewer/components/global-context-creator.tsx`](../../../apps/slabs-reviewer/components/global-context-creator.tsx)
- [`../../../apps/slabs-reviewer/components/automation-profile-panel.tsx`](../../../apps/slabs-reviewer/components/automation-profile-panel.tsx)
- [`../../../apps/slabs-reviewer/components/surface-trail.tsx`](../../../apps/slabs-reviewer/components/surface-trail.tsx)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)

## Notes

- An in-app Codex suggestion trigger was prototyped and verified, then later
  removed so the reviewer can stay focused on project review and editing while
  suggestion work moves back into normal Codex context.
