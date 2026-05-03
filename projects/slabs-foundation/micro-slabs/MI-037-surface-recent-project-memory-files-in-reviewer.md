# Micro Slab: MI-037 Surface recent project memory files in reviewer

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Implementation

## Tool Surface

Next.js, TypeScript, Markdown

## Goal

Show the most recent project memory files directly on reviewer project pages so
manual review can see the same durable context that hourly suggestion runs are
expected to read first.

## Working Context

Project pages currently surface only a memory-file count, even though recent
memory is part of the automation contract and often holds the sharpest
next-step context. Add a compact recent-memory section with titles or links so
project review is more context-rich without opening the raw filesystem every
time.

## Done Criteria

- project pages show a small list of recent memory files instead of only a
  count
- each entry is easy to open in the existing source view
- the section stays compact enough that macro review remains the dominant focus
- the recent-memory order matches the practical needs of suggestion review

## Artifacts

- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/components/project-review-shell.tsx`
- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/lib/slabs.ts`
- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/app/source/page.tsx`

## Notes

Keep this scoped to visibility of existing memory files, not inline editing or
new memory authoring flows.

## Memory Delta

Capture how recent project memory is now exposed in the reviewer for suggestion
review.
