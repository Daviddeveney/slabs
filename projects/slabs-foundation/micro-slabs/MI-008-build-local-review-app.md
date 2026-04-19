# Micro Slab: MI-008 Build Local Review App

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)

## Type

Frontend Prototype

## Tool Surface

Next.js, Tailwind CSS, local filesystem reads

## Goal

Build a simple local web app that reads Slabs projects from disk and presents macro slabs plus their linked micro slabs in a clean review UI.

## Working Context

The framework now has a strong local file structure, but non-technical users still need a friendlier review surface than raw Markdown. This app is the first step toward that.

## Done Criteria

- app workspace exists under `apps/slabs-reviewer`
- app reads `projects/` directly
- app renders a project index and project review page
- app builds successfully and can be run locally

## Artifacts

- [`../../../apps/slabs-reviewer/package.json`](../../../apps/slabs-reviewer/package.json)
- [`../../../apps/slabs-reviewer/app/page.tsx`](../../../apps/slabs-reviewer/app/page.tsx)
- [`../../../apps/slabs-reviewer/app/project/[slug]/page.tsx`](../../../apps/slabs-reviewer/app/project/[slug]/page.tsx)
- [`../../../apps/slabs-reviewer/components/project-review-shell.tsx`](../../../apps/slabs-reviewer/components/project-review-shell.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)

## Notes

This version is intentionally review-first. Editing and write-back can come later once the reading model feels right.

## Memory Delta

- Slabs now has a local web review surface for macro and micro slabs.
- The app keeps Markdown as the source of truth and layers a friendlier UI on top.
