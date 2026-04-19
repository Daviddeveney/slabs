# Memory: 2026-04-19 Review App Editor Flow

## Date

2026-04-19

## Context Snapshot

The first local review app was useful for reading project structure, but real usage immediately exposed friction: the homepage felt too loud, done work was mixed with active work, macro cards did not open dedicated views, and the app still stopped short of actual edits.

## What Changed

- Simplified the homepage so it leads with `Slabs` and a cleaner project list.
- Removed the inline selected-macro panel from project pages.
- Sorted macro slabs so ready and active work sits above done work.
- Added dedicated macro detail routes with editable macro fields and linked micro slab editors.
- Added local API routes that write macro and micro changes back to the Markdown source files.
- Added a surface breadcrumb so the UI makes project, macro, and deeper editing context obvious.
- Turned artifact references into clickable source links backed by a local source preview route.
- Switched list-like fields to bullet or link-list presentation by default, with edit mode only when needed.
- Collapsed linked micro slabs by default so macro pages stay scan-friendly until a user opens one.
- Removed repeated descriptive copy from the project header and macro list so the overview reads faster.
- Reframed macro selection as a table-style list with clearer columns for ID, status, title, and linked micro count.
- Changed brief and source actions to stay in the same window so they behave reliably in the in-app browser.
- Made the surface trail clickable so users can navigate back up the project hierarchy from macro pages.
- Added a first-pass micro creation flow that writes a new linked micro slab file from the macro page itself.
- Added a homepage project-creation flow that scaffolds a new local project folder from the review app.
- Moved done macro slabs into an expandable completed-work section so open work stays front and center on project pages.

## Decisions

- Treat the local review app as a working-document surface, not just a read-only dashboard.
- Keep editing scoped to macro pages and their linked micro slabs for now.
- Prefer dedicated routes over inline split-pane state for deeper slab work.
- Default to readable structured display first, then reveal raw inputs only when the user chooses to edit.
- Prefer same-context navigation over new-tab behavior inside the local review app.
- Let macro pages create linked execution units directly instead of forcing users back to raw files.
- Let the homepage scaffold projects so starting work does not require dropping into the terminal first.
- Keep completed macros tucked behind an explicit expand action so project pages bias toward open work.

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

## Open Threads

- Should the project overview also expose editable tracking hub or memory surfaces?
- What are the right guardrails for editing larger text sections or links from the app?
- Should macro and micro status ordering become a reusable shared Slabs convention?
- Should the local source preview stay a lightweight file viewer, or grow into a richer side-by-side inspect mode?
- Should new project scaffolding eventually capture more first-run metadata, like a brief link or starter macro pack?

## Likely Next Actions

- Add review surfaces for memory and context notes.
- Decide whether tracking-hub editing belongs in the same local app.
- Add clearer save-state messaging and changed-field affordances.
- Decide whether micro slabs should eventually support their own dedicated route in addition to the collapsed macro-attached editor.
- Decide whether the homepage should also offer project templates beyond the default scaffold.
