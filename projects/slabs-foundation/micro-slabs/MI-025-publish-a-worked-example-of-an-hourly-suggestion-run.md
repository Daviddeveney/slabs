# Micro Slab: MI-025 Publish a worked example of an hourly suggestion run

## Status

`Ready`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Origin

Codex suggested

## Type

Framework Documentation

## Tool Surface

Markdown, Templates

## Goal

Add one concrete worked example of the hourly review flow so future agents can
see what a good five-micro-slab run looks like without inferring it from raw
project history.

## Working Context

The repo now has real automation output across Slabs Foundation and
RoundReserve, plus a ready slab for the automation-memory template, but there
is still no example that shows the context reviewed, dedupe decisions, and the
exact write-back pattern in one place. Create a short example run note that
demonstrates the expected inputs and outputs for an hourly suggestion pass.

## Done Criteria

- a repo-owned example document shows one realistic hourly project-suggestions
  run from context gather through micro-slab creation
- the example includes reviewed project context, created `MI-...` slabs,
  dedupe or supersession decisions, and the memory summary shape
- the example is linked from the hourly automation docs or template so it is
  easy to reuse
- the example stays illustrative rather than turning into a second source of
  truth for automation rules

## Artifacts

- `docs/automation/hourly-project-suggestions-example.md`
- `docs/automation/hourly-project-suggestions.md`
- `templates/automation-memory-template.md`

## Notes

Favor one compact worked example over a long gallery of runs. The goal is to
reduce ambiguity for future automation authors.

## Memory Delta

Capture the canonical example future automation runs should resemble when they
review context and write back new micro slabs.
