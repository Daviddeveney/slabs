# Micro Slab: MI-029 Define live-brief resolution and fallback rules for hourly reviews

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Operating Model

## Tool Surface

Markdown, Google Docs

## Goal

Define the canonical order for resolving a project's live brief during hourly
review so automations know when to use `brief-link.txt`, when to fall back to a
local `work-brief.md`, and how to proceed when the external brief is missing or
unavailable.

## Working Context

Slabs has already moved active briefs toward `brief-link.txt`, but older
projects may still carry repo-local `work-brief.md` files and future projects
may briefly have neither. The live automation prompt encodes fallback behavior,
yet the repo does not document that contract in one durable place.

## Done Criteria

- the automation guidance defines the precedence between `brief-link.txt`,
  Google Docs, repo-local briefs, and tracking-hub fallback
- the rules explain what to do when a brief link is stale, broken, private, or
  intentionally absent
- the guidance makes it clear that missing brief access should narrow the review
  rather than stall the whole run
- at least one current project example is referenced so the rule stays grounded

## Artifacts

- `docs/automation/hourly-project-suggestions.md`
- `docs/operating-model.md`
- `projects/slabs-foundation/brief-link.txt`
- `projects/slabs-foundation/context/legacy-work-brief.md`

## Notes

Keep this focused on brief resolution only. Project-context bundling and macro
selection are separate slices.

## Memory Delta

Record the canonical live-brief lookup order for hourly suggestion runs.
