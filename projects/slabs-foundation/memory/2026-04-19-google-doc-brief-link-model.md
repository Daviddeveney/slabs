# Memory: Google Doc Brief Link Model

## Date

2026-04-19

## Summary

Shifted the local Slabs project model so live project briefs are treated as
Google Docs, with the repo storing only an optional `brief-link.txt` pointer
instead of maintaining a project-level `work-brief.md` as the active brief.

## What Changed

- The reviewer app now reads project brief links from `brief-link.txt`.
- Project and macro pages can attach a Google Doc brief URL directly from the
  UI instead of falling back to a local brief preview.
- Source preview now blocks project `work-brief.md` files and routes users back
  toward the Google Doc link flow.
- New project scaffolds no longer create `work-brief.md`.
- `projects/README.md` and related docs now describe the brief as an external
  Google Doc with an optional local link pointer.

## Decisions

- The live project brief should be external and editable in Google Docs, not in
  repo Markdown.
- A tiny local pointer file is acceptable because it stores only the brief URL,
  not the brief content itself.
- Existing local `work-brief.md` files should be treated as legacy artifacts,
  not as the current source of truth for the reviewer.

## Artifacts

- [`../../../apps/slabs-reviewer/components/brief-link-manager.tsx`](../../../apps/slabs-reviewer/components/brief-link-manager.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/brief/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/brief/route.ts)
- [`../../../apps/slabs-reviewer/app/source/page.tsx`](../../../apps/slabs-reviewer/app/source/page.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../../../scripts/scaffold_project.sh`](../../../scripts/scaffold_project.sh)
- [`../../../projects/README.md`](../../../projects/README.md)

## Open Questions

- Should the repo eventually delete all legacy project `work-brief.md` files
  once they are no longer referenced?
- Should `brief-link.txt` stay a plain text file, or should project-level
  metadata eventually move into a broader lightweight manifest?

## Next Use

- Attach Google Doc brief links on any active projects that still do not have
  them.
- Decide whether the reviewer should also surface quick links to tracking and
  memory beside the brief link controls.
