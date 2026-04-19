# Micro Slab: MI-011 Add Review App Creation Surfaces

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)

## Type

Product Implementation

## Tool Surface

Next.js, Local Markdown

## Goal

Tighten the local review app by removing extra instructional UI copy, adding
create flows for macro slabs and shared global-context notes, and simplifying
project creation so users do not have to manage slugs by hand.

## Working Context

The reviewer app had become more capable, but a few surfaces still explained
themselves too much or dead-ended when a user reached an empty state. The next
pass should make the behavior feel more obvious by trimming copy and giving
users direct creation actions where they naturally expect them.

## Done Criteria

- collapsed macro editing no longer shows explanatory placeholder copy
- project creation no longer exposes a manual slug field
- project pages can create a new macro slab directly from the macro section
- global-context source previews can create new shared-context notes
- new macros and shared-context notes are scaffolded from the repo templates

## Artifacts

- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/components/project-macro-panel.tsx`](../../../apps/slabs-reviewer/components/project-macro-panel.tsx)
- [`../../../apps/slabs-reviewer/components/global-context-creator.tsx`](../../../apps/slabs-reviewer/components/global-context-creator.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/macro/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/macro/route.ts)
- [`../../../apps/slabs-reviewer/app/api/global-context/route.ts`](../../../apps/slabs-reviewer/app/api/global-context/route.ts)
- [`../../../apps/slabs-reviewer/app/source/page.tsx`](../../../apps/slabs-reviewer/app/source/page.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)

## Notes

Create flows should feel like a natural extension of the existing local-file
model, not a second content system. Template-backed creation keeps the on-disk
structure consistent even when users begin work from the UI.
