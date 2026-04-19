# Micro Slab: MI-013 Shift Project Briefs To Google Doc Links

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)

## Type

Product Implementation

## Tool Surface

Next.js, Local Markdown, Shell Script

## Goal

Shift the local reviewer and project scaffold away from repo-managed
`work-brief.md` files so project briefs are treated as Google Docs with an
optional local `brief-link.txt` pointer instead of Markdown content stored in
the project folder.

## Working Context

The review app had started falling back to local `work-brief.md` previews on
sparse project pages, but that reintroduced the wrong mental model. The repo
needs a simpler contract: the live brief is external in Google Docs, and the
local workspace only stores the link when one is available.

## Done Criteria

- the reviewer no longer treats `work-brief.md` as the live brief surface
- project and macro pages can store a Google Doc brief link directly
- source preview blocks repo-managed project work briefs and points back to the
  external brief-link flow instead
- new projects no longer scaffold a local `work-brief.md`
- project workspace docs describe `brief-link.txt` instead of repo-maintained
  work brief files

## Artifacts

- [`../../../apps/slabs-reviewer/components/brief-link-manager.tsx`](../../../apps/slabs-reviewer/components/brief-link-manager.tsx)
- [`../../../apps/slabs-reviewer/components/project-review-shell.tsx`](../../../apps/slabs-reviewer/components/project-review-shell.tsx)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/brief/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/brief/route.ts)
- [`../../../apps/slabs-reviewer/app/source/page.tsx`](../../../apps/slabs-reviewer/app/source/page.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../../../scripts/scaffold_project.sh`](../../../scripts/scaffold_project.sh)
- [`../../../projects/README.md`](../../../projects/README.md)

## Notes

This keeps the brief model small and honest: Slabs still needs a brief, but the
repo no longer pretends the live brief is another Markdown document that users
should maintain locally.
