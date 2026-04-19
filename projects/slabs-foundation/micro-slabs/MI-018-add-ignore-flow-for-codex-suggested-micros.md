# Micro Slab: MI-018 Add Ignore Flow For Micro Slabs

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Type

Product Surface

## Tool Surface

Next.js, Markdown, Codex Automation

## Goal

Let users dismiss any micro slab directly from the reviewer, while still making
Codex-suggested slabs visibly distinct, and expand the hourly automation so
each run creates five distinct real micro slabs per project instead of
stopping after one.

## Working Context

Once automation output started landing as real `MI-...` files, the reviewer
needed a fast way to remove weak suggestions without manual Markdown cleanup.
That same quick-dismiss behavior also needs to work for human-created micro
slabs when a user wants to clear outdated work without opening raw Markdown.
At the same time, the hourly review flow needed a larger batch size so the
automation produces a more useful review queue each time it wakes up.

## Done Criteria

- all linked micro slabs show an `Ignore` action in the reviewer
- ignoring a micro slab marks it `Superseded` in Markdown and
  removes it from normal reviewer counts and macro lists
- the live hourly automation is updated to target five distinct real micro
  slabs per project on each run
- Slabs Foundation tracking and memory capture the new ignore flow and
  multi-slab automation behavior

## Artifacts

- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/ignore/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/ignore/route.ts)
- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../tracking-hub.md`](../tracking-hub.md)

## Notes

The live automation configuration still lives in Codex's automation store, so
the repo records the expected batch behavior while the automation entry carries
the actual runtime prompt. Codex-suggested slabs still keep their visible
origin badge; the ignore action is simply no longer limited to them.
