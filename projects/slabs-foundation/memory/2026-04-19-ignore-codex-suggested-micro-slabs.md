# Memory: Ignore Micro Slabs In The Reviewer

## Summary

Added a quick ignore path for any micro slab in the reviewer and expanded the
hourly automation so each project review run aims to create five real micro
slabs instead of only one.

## What Changed

- added an `Ignore` action to all linked micro slabs on macro pages
- made ignored micro slabs write back as `Superseded`
- removed superseded micro slabs from reviewer counts and linked-micro lists
- updated the live hourly automation so it now targets five distinct real
  micro slabs per project on each run

## Why It Matters Later

Project work is now easier to curate in the UI without raw Markdown cleanup,
and the automation can produce a more substantial off-hours review queue for
each project.

## Linked Artifacts

- [`../micro-slabs/MI-018-add-ignore-flow-for-codex-suggested-micros.md`](../micro-slabs/MI-018-add-ignore-flow-for-codex-suggested-micros.md)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/ignore/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/micro/[microId]/ignore/route.ts)
- [`../../../projects/roundreserve/micro-slabs/MI-001-add-a-reminder-smoke-test-verifier.md`](../../../projects/roundreserve/micro-slabs/MI-001-add-a-reminder-smoke-test-verifier.md)

## Next Use

Use the next real project review session to confirm users can quickly dismiss
outdated or weak micro slabs while keeping the stronger work items ready for
review and acceptance.
