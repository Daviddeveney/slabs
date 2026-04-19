# Micro Slab: MI-019 Capture hourly project-suggestions as a repo prompt pack

## Status

`Superseded`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Framework Documentation

## Tool Surface

Markdown, Codex Automation

## Goal

Create a repo-owned prompt-pack artifact for the live hourly
`project-suggestions` automation so future runs can follow the same context and
write-back contract without depending on chat history.

## Working Context

The live automation now reads `automation-profile.md`, creates real `MI-...`
micro slabs, and writes to automation memory, but Slabs still lacks a durable
repo artifact that captures that behavior. Convert the existing `SG-001` idea
into a real micro slab by documenting the hourly review flow, expected context
bundle, duplicate-avoidance rules, and write-back steps in a discoverable repo
location.

## Done Criteria

- a repo-owned prompt-pack document exists for the hourly project-suggestions
  automation
- the prompt pack tells Codex to read automation memory first and treat each
  project's `automation-profile.md` as the context contract
- the prompt pack defines the minimum per-project context bundle and the
  five-real-micro-slab output expectation
- Slabs tracking or docs point to the new prompt-pack artifact so it is easy to
  discover from the repo

## Artifacts

- `docs/automation/hourly-project-suggestions.md`
- `templates/proactive-suggestions-template.md`
- [`../tracking-hub.md`](../tracking-hub.md)
- [`../suggestions/SG-001-capture-hourly-project-suggestions-as-a-repo-prompt-pack.md`](../suggestions/SG-001-capture-hourly-project-suggestions-as-a-repo-prompt-pack.md)

## Notes

This converts `SG-001` into a real execution unit. Keep scope on the prompt-pack
artifact and review loop documentation, not on scheduler infrastructure.

Ignored from the reviewer after the user dismissed the Codex suggestion.

## Memory Delta

Record that the live hourly automation contract now has a repo-owned prompt pack
instead of living only in Codex automation config.
