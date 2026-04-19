# Micro Slab: MI-023 Add a quality rubric for Codex-suggested micro slabs

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Operating Model

## Tool Surface

Markdown, Templates

## Goal

Add a small quality rubric that future automation runs can use to keep
Codex-suggested micro slabs distinct, one-session-sized, and grounded in current
project work.

## Working Context

The automation now creates real micro slabs directly, which raises the bar for
their quality. Slabs needs a reusable rubric that checks session size,
distinctness against unsuperseded micro slabs, parent-macro linkage,
`Codex suggested` origin marking, and the no-new-`SG-...` rule before a run
writes anything back.

## Done Criteria

- a repo-owned rubric describes the minimum quality bar for automation-created
  micro slabs
- the rubric covers one-focused-session scope, duplicate avoidance, grounded
  context, origin marking, and required tracking updates
- the rubric is referenced from the hourly prompt-pack guidance or template so
  it can shape live automation output
- the rubric reuses existing micro-slab structure instead of inventing a second
  artifact format

## Artifacts

- `docs/automation/hourly-project-suggestions.md`
- `templates/micro-slab-template.md`
- `templates/proactive-suggestions-template.md`

## Notes

This should be a tight acceptance checklist, not a long taxonomy. The goal is
to improve output quality without slowing down hourly runs.

## Memory Delta

Capture the minimum acceptance bar future Codex-suggested micro slabs must meet
before they are written into a project.
