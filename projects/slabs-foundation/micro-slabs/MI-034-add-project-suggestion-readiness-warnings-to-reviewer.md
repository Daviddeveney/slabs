# Micro Slab: MI-034 Add project suggestion-readiness warnings to reviewer

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

Show lightweight readiness warnings on project pages when the core inputs for
hourly suggestion review are missing or obviously thin, such as no brief link
or an empty automation profile.

## Working Context

The hourly automation now treats `automation-profile.md`, `brief-link.txt`,
tracking, and recent memory as the project review contract, but the reviewer
currently only exposes counts and edit panels. Add a small readiness cue so
users can tell at a glance when a project is not yet ready for
suggestion-heavy automation runs.

## Done Criteria

- project pages surface a concise readiness state or warning when key
  automation inputs are missing
- the warnings point to the existing reviewer controls needed to fix the gap
- the signal stays lightweight enough that healthy projects still feel calm and
  scan-first
- the logic is grounded in the real hourly review contract rather than an
  invented checklist

## Artifacts

- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/components/project-review-shell.tsx`
- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/components/automation-profile-panel.tsx`
- `/Users/daviddeveney/Documents/Slabs/apps/slabs-reviewer/lib/slabs.ts`

## Notes

Keep this as readiness guidance, not as a blocking validator or automation
runner inside the reviewer.

## Memory Delta

Record how the reviewer now signals whether a project is ready for hourly
suggestion review.
