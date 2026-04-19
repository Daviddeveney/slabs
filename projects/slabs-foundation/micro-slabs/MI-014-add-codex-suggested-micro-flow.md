# Micro Slab: MI-014 Add Codex Suggested Micro Flow

## Status

`Superseded`

## Parent Macro Slab

- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)

## Type

Product Implementation

## Tool Surface

Next.js, Local Markdown, Codex CLI

## Goal

Let a user click from a macro page into a local Codex-powered suggestion flow
that gathers the project context, shared global context, the attached brief
link, and the most relevant implementation materials, then writes a suggested
micro slab back into the project's `suggestions/` folder and renders it in the
review UI.

## Working Context

The local reviewer could already create macros and micros manually, but it did
not yet embody the suggestion loop in an interactive way. The new flow needs to
stay local-first, communicate with the installed Codex runtime, and turn a
macro page into a practical launch point for context-grounded suggested work.

## Done Criteria

- macro pages expose a visible `Suggest with Codex` action near linked micros
- the reviewer gathers the local project brief link, project docs, recent
  memory, global context, and relevant implementation materials before asking
  Codex for a suggestion
- the app invokes local `codex exec` in a stable non-interactive mode
- generated suggestions are written to `projects/<slug>/suggestions/`
- the new suggestion renders back into the macro page without opening raw
  Markdown files
- repeated verification does not leave duplicate test suggestions behind
- unresolved suggested artifact strings no longer render as broken links in the
  review surface

## Artifacts

- [`../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/suggestion/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/macro/[macroId]/suggestion/route.ts)
- [`../../../apps/slabs-reviewer/app/project/[slug]/macro/[macroId]/page.tsx`](../../../apps/slabs-reviewer/app/project/[slug]/macro/[macroId]/page.tsx)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../../../projects/roundreserve/suggestions/SG-003-implement-reminder-worker-eligibility-idempotency-and-audit-gating.md`](../../../projects/roundreserve/suggestions/SG-003-implement-reminder-worker-eligibility-idempotency-and-audit-gating.md)

## Notes

The local Codex CLI was hanging on remote plugin bootstrap until the flow
disabled plugins explicitly. The final path also needed the correct
`model_reasoning_effort` key rather than the shorter `reasoning_effort`
override.

The reviewer-side trigger was later removed so suggestion generation can happen
inside normal Codex work instead of from the app UI. This file remains as the
record of the experiment and the RoundReserve verification artifact it produced.
