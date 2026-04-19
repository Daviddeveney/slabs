# Memory: Codex Suggested Micro Flow

## Date

2026-04-19

## Summary

The local reviewer can now ask Codex for a suggested micro slab directly from a
macro page. The flow gathers project docs, recent memory, the live brief link,
global context, and the most relevant implementation surfaces, then writes a
durable suggestion into the project's `suggestions/` folder and renders it back
into the page. This experiment was later removed from the reviewer so the app
can stay focused on review surfaces while suggestion work moves back into
normal Codex context.

## What Changed

- Added a `Suggest with Codex` action to macro pages inside the linked-micro
  area.
- Added a local API route that bundles project and global context, calls
  `codex exec`, and persists the result as a suggested micro slab.
- Added suggestion parsing and storage in `lib/slabs.ts`.
- Verified the flow end to end on RoundReserve and kept the final suggestion as
  `SG-003`.
- Tightened suggestion artifact rendering so unresolved short references stay as
  readable text instead of becoming broken source links.

## Decisions

- The reviewer should communicate with the installed local Codex runtime rather
  than pretending suggestions are purely heuristic UI behavior.
- Project suggestion generation should write durable Markdown files to
  `suggestions/` so future sessions can inspect the suggestion history.
- Codex subprocesses for this path should disable plugins explicitly because
  remote plugin bootstrap was hanging local non-interactive runs.
- The correct low-effort config key is `model_reasoning_effort`, not the
  shorter `reasoning_effort`.

## Artifacts

- [`../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/suggestion/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/suggestion/route.ts)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../../../projects/roundreserve/suggestions/SG-003-implement-reminder-worker-eligibility-idempotency-and-audit-gating.md`](../../../projects/roundreserve/suggestions/SG-003-implement-reminder-worker-eligibility-idempotency-and-audit-gating.md)

## Open Questions

- Should a suggested micro slab eventually promote into a real `micro-slabs/`
  file with one explicit accept action in the UI?
- Should long-running suggestion generation move to a background job model so
  the UI does not wait on the Codex subprocess directly?

## Next Use

- Test the suggestion action against a second project with linked micros already
  present.
- Decide whether suggestions should auto-update the project tracking hub or stay
  as advisory artifacts until explicitly accepted.
