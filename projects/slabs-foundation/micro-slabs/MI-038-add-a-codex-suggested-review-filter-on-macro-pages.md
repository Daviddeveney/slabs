# Micro Slab: MI-038 Add a Codex-suggested review filter on macro pages

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Implementation

## Tool Surface

Next.js, TypeScript, UI

## Goal

Add one quick filter or grouping mode on macro pages so users can review only
Codex-suggested linked micro slabs when triaging automation output.

## Working Context

Macro pages already label `Codex suggested` slabs and offer an ignore action,
but larger batches still force users to scan through every linked micro slab in
one long list. Add a small review filter so the automation-created queue is
fast to inspect without changing the underlying slab model.

## Done Criteria

- macro pages support a quick way to focus on Codex-suggested micro slabs
- the filtered view still makes it easy to save, inspect, or ignore those
  slabs
- human-created micro slabs remain visible and easy to return to
- the control fits the existing calm reviewer layout

## Artifacts

- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/components/macro-detail-editor.tsx`
- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/lib/slabs.ts`

## Notes

Keep this slice on review ergonomics for automation output, not on changing the
underlying slab data model.

## Memory Delta

Record how users can now focus macro-page review on Codex-suggested micro slabs
first.
