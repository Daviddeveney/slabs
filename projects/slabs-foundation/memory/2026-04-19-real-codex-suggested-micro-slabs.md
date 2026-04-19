# Memory: Real Codex-Suggested Micro Slabs

## Summary

Shifted the first hourly Codex automation from writing suggestion-only notes to
creating real `MI-...` micro slabs, and added a visible `Codex suggested`
marker in the reviewer UI.

## What Changed

- added a durable `Origin` field to the micro slab format
- updated the reviewer macro page to display `Codex suggested` on matching
  micro slabs
- updated the hourly automation so it now creates real linked micro slabs
  instead of new `SG-...` suggestion files
- converted RoundReserve's latest automation output into
  `MI-001 Add a reminder smoke-test verifier`

## Why It Matters Later

This makes automation output immediately actionable inside the same project
surface users already review, while still preserving a clear visual distinction
between human-created and Codex-created micro slabs.

## Linked Artifacts

- [`../micro-slabs/MI-017-create-real-codex-suggested-micro-slabs.md`](../micro-slabs/MI-017-create-real-codex-suggested-micro-slabs.md)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../projects/roundreserve/micro-slabs/MI-001-add-a-reminder-smoke-test-verifier.md`](../../../projects/roundreserve/micro-slabs/MI-001-add-a-reminder-smoke-test-verifier.md)

## Next Use

Use the next automation run to confirm new projects receive real linked micro
slabs directly, not just historical suggestion notes.
