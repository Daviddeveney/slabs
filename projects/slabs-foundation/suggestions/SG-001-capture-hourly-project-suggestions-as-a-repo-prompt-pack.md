# Suggested Micro Slab: SG-001 Capture the hourly project-suggestions automation as a repo prompt pack

## Status

`Superseded`

## Parent Macro Slab

`M04`

## Why Now

The first live hourly project-suggestions automation now exists in Codex
context, but Slabs still lacks a repo-owned artifact that captures the prompt,
review rules, and persistence contract behind it. Turning that live behavior
into a durable prompt pack would satisfy the most concrete missing output in
`M04` without drifting into scheduler implementation work.

## Goal

Add a repo-backed prompt-pack artifact for the hourly project review flow so
future automations can reliably read `automation-profile.md`, gather the right
project context, avoid duplicate suggestions, and write back durable memory.

## Working Context

Use `projects/slabs-foundation/macro-slabs/M04-design-proactive-suggestion-loop.md`,
the live tracking hub, the proactive suggestions template, and the current
hourly automation behavior as the contract. Keep the scope on the automation
prompt pack and review loop documentation, not on building a new scheduler or
reintroducing suggestion generation into the reviewer app.

## Suggested Done Criteria

- A repo-owned prompt-pack document exists for the hourly project suggestion
  automation.
- The prompt pack tells Codex to read automation memory first and treat each
  project's `automation-profile.md` as the context contract.
- The prompt pack defines the minimum context bundle to review per project,
  including tracking hub, live brief link, relevant macro slabs, recent memory,
  and project context notes.
- The prompt pack includes explicit duplicate-avoidance rules for unreviewed
  suggestions and describes how new suggestion files should be written back.
- The related Slabs docs or tracking notes point to the new prompt-pack
  artifact so it is discoverable from the repo itself.

## Suggested Artifacts

- `docs/automation/hourly-project-suggestions.md`
- `templates/proactive-suggestions-template.md`
- `projects/slabs-foundation/tracking-hub.md`

## Notes

This should stay tightly focused on capturing the live automation contract in a
portable repo artifact. It does not need to define every future automation type
or solve scheduler management.

Superseded on 2026-04-19 after this slice was promoted into
[`MI-019`](../micro-slabs/MI-019-capture-hourly-project-suggestions-as-a-repo-prompt-pack.md).

## Source Context

- `projects/slabs-foundation/tracking-hub.md`
- `projects/slabs-foundation/macro-slabs/M04-design-proactive-suggestion-loop.md`
- `projects/slabs-foundation/micro-slabs/MI-004-outline-proactive-suggestion-loop.md`
- `projects/slabs-foundation/memory/2026-04-19-codex-suggested-micro-flow.md`
- `projects/slabs-foundation/memory/2026-04-19-project-automation-profiles.md`
- `templates/proactive-suggestions-template.md`
- Work brief: `projects/slabs-foundation/work-brief.md`
