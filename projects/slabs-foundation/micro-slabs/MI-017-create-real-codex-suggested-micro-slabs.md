# Micro Slab: MI-017 Create Real Codex-Suggested Micro Slabs

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Type

Framework Design

## Tool Surface

Markdown, Next.js, Codex Automation

## Goal

Shift the hourly Codex automation from writing suggestion-only notes into
creating real `MI-...` micro slabs, and label those slabs clearly in the
reviewer UI as Codex suggested.

## Working Context

The first hourly automation proved the context gathering worked, but it still
created `SG-...` suggestion documents instead of actual execution units. That
left the project page empty even though the automation had already done useful
work. The framework now needs the automation and the UI to agree on one durable
artifact: real micro slabs with a visible Codex-origin marker.

## Done Criteria

- the hourly automation creates real `MI-...` micro slabs instead of new
  `SG-...` suggestion files
- Codex-created micro slabs carry a durable origin marker in Markdown
- the reviewer UI shows a clear `Codex suggested` label for those slabs
- RoundReserve has a real Codex-created micro slab as the first proof point

## Artifacts

- [`../../../apps/slabs-reviewer/lib/slabs.ts`](../../../apps/slabs-reviewer/lib/slabs.ts)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../templates/micro-slab-template.md`](../../../templates/micro-slab-template.md)
- [`../../../projects/roundreserve/micro-slabs/MI-001-add-a-reminder-smoke-test-verifier.md`](../../../projects/roundreserve/micro-slabs/MI-001-add-a-reminder-smoke-test-verifier.md)

## Notes

The automation prompt was updated in Codex itself, so the repo records the
surface and artifact changes while the automation configuration carries the live
runtime behavior.
