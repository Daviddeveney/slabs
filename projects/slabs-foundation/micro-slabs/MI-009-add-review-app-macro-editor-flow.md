# Micro Slab: MI-009 Add Review App Macro Editor Flow

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)

## Type

Frontend Enhancement

## Tool Surface

Next.js, Tailwind CSS, local filesystem write-back routes

## Goal

Resolve the first round of browser comments by simplifying the review app, sorting done work lower, making macro plus linked micro slab content editable from dedicated macro pages, letting the homepage scaffold new local projects, and tightening the macro experience into a clearer working-document surface.

## Working Context

The first review app proved the reading model, but users needed a stronger working-document flow: less dashboard chrome, clearer screen hierarchy, more legible list content, clickable source links, and local editing without dropping into raw Markdown files.

## Done Criteria

- homepage says `Slabs` and drops the stats block
- project pages sort active and ready macros above done macros
- clicking a macro opens a dedicated detail view
- macro detail view shows linked micro slabs
- macro and linked micro edits write back to local Markdown files
- project, macro, and micro surfaces are visually obvious in the UI
- artifact references open as clickable source links
- linked micro slabs stay collapsed until the user expands one
- list-style fields read as bullets or link lists by default instead of raw textarea text
- project views drop extra descriptive copy where it gets in the way of scanning
- macro slabs read as a table-style list instead of stacked descriptive cards
- brief and source links work inside the in-app browser without relying on new tabs
- surface trail chips double as breadcrumbs for navigation
- macro pages can create new linked micro slabs directly from the UI
- homepage can scaffold a new local project folder directly from the review surface
- done macro slabs collapse into an expandable completed-work section by default

## Artifacts

- [`../../../apps/slabs-reviewer/app/page.tsx`](../../../apps/slabs-reviewer/app/page.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/route.ts`](../../../apps/slabs-reviewer/app/api/project/route.ts)
- [`../../../apps/slabs-reviewer/app/project/[slug]/page.tsx`](../../../apps/slabs-reviewer/app/project/[slug]/page.tsx)
- [`../../../apps/slabs-reviewer/app/project/[slug]/macro/[macroId]/page.tsx`](../../../apps/slabs-reviewer/app/project/[slug]/macro/[macroId]/page.tsx)
- [`../../../apps/slabs-reviewer/app/source/page.tsx`](../../../apps/slabs-reviewer/app/source/page.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/route.ts)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/route.ts)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/components/projects-home-shell.tsx`](../../../apps/slabs-reviewer/components/projects-home-shell.tsx)
- [`../../../apps/slabs-reviewer/components/project-review-shell.tsx`](../../../apps/slabs-reviewer/components/project-review-shell.tsx)
- [`../../../apps/slabs-reviewer/components/surface-trail.tsx`](../../../apps/slabs-reviewer/components/surface-trail.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)

## Notes

This pass keeps editing intentionally scoped to macro views and their linked micros while also making the homepage useful as a project-entry surface. It does not yet turn every project document into an editable surface, but it does make the project and macro screens feel more like working views than a dashboard.

## Memory Delta

- The review app now behaves more like a working document than a dashboard.
- Local write-back is in place for macro slabs and their linked micro slabs.
- Macro pages now distinguish project, macro, and micro surfaces more clearly.
- Artifacts and other list-like fields are easier to scan because they render as links or bullets before edit mode.
- The project overview is tighter because the hero no longer repeats long summary text.
- Macro selection now feels more operational because it reads like a sortable table instead of a stack of narrative cards.
- Brief navigation now stays inside the same browsing context, which fits the in-app browser better.
- The surface trail now works as actual breadcrumb navigation instead of a passive label strip.
- Macro pages can spin up a new linked micro slab without leaving the review surface.
- The homepage can now scaffold a new local project and route straight into it.
- Done macro slabs no longer crowd the primary project table because they sit inside an expandable completed-work section.
