# Micro Slab: MI-036 Add duplicate-aware micro creation warnings in reviewer

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

Warn reviewer users when a newly created micro slab looks too close to an
existing unsuperseded micro slab so the suggestion loop can avoid easy
duplication.

## Working Context

The hourly automation now creates five real `MI-...` slabs per project and the
reviewer also supports manual linked-micro creation, but neither path surfaces
a duplicate warning before another near-clone enters the queue. Add a
lightweight similar-title or similar-goal warning in the reviewer create flow
so users catch obvious overlap early.

## Done Criteria

- the new-micro flow checks for obvious similarity against active or recent
  unsuperseded micro slabs in the same project
- the reviewer shows a clear warning without blocking deliberate creation
- the warning is grounded in practical duplicate risk rather than fuzzy
  over-matching
- the behavior stays compatible with Codex-suggested and human-authored micros

## Artifacts

- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/components/macro-detail-editor.tsx`
- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/lib/slabs.ts`

## Notes

Keep this slice on warning and visibility, not on fully automatic duplicate
merging.

## Memory Delta

Record how the reviewer now warns about near-duplicate micro slabs during
creation.
