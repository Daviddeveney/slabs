# Memory: Review App Creation Surfaces

## Date

2026-04-19

## Summary

Refined the reviewer app by stripping extra helper copy out of the collapsed
macro editor, removing manual slug entry from project creation, adding direct
macro creation on project pages, and adding shared-context note creation from
global-context source previews.

## What Changed

- Added template-backed creation for macro slabs inside the reviewer app.
- Added template-backed creation for shared global-context notes from the
  source preview route.
- Removed the manual slug field from the new-project form so project creation
  is title-first.
- Simplified the collapsed macro editor surface so it no longer explains its
  own behavior.

## Decisions

- Empty or sparse review surfaces should offer creation actions directly where
  the user lands instead of instructing them to go edit files elsewhere.
- Project slugs should stay automatic by default in the local app.
- Shared context can be created from within the global-context source surface
  without turning source preview into a full Markdown editor.

## Artifacts

- [`../../../apps/slabs-reviewer/components/project-macro-panel.tsx`](../../../apps/slabs-reviewer/components/project-macro-panel.tsx)
- [`../../../apps/slabs-reviewer/components/global-context-creator.tsx`](../../../apps/slabs-reviewer/components/global-context-creator.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/macro/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/macro/route.ts)
- [`../../../apps/slabs-reviewer/app/api/global-context/route.ts`](../../../apps/slabs-reviewer/app/api/global-context/route.ts)
- [`../../../apps/slabs-reviewer/app/source/page.tsx`](../../../apps/slabs-reviewer/app/source/page.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)

## Open Questions

- Should the source preview route eventually support direct editing for
  global-context notes as well as note creation?
- Should macro creation also add starter rows into a project's tracking hub
  automatically, or stay file-first for now?

## Next Use

- Test the empty-state macro flow on a non-example project such as
  `roundreserve`.
- Decide whether global-context creation should also be available on the home
  dashboard in addition to source preview surfaces.
