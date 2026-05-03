# Micro Slab: MI-027 Expand the automation-profile template with suggestion-ready guidance

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

Make `automation-profile.md` easier to author correctly by adding compact
guidance for primary repos, tools, and notes that matter specifically for
suggestion-oriented project reviews.

## Working Context

The current automation-profile template names the sections but gives almost no
help on what strong entries look like. That makes hourly review quality depend
too heavily on local intuition. Add concise field guidance and examples that
help a project become suggestion-ready without bloating the template.

## Done Criteria

- the automation-profile template explains what belongs in each section with a
  suggestion-review lens
- the guidance clarifies how to list primary repositories, when to mention
  skills or plugins, and how notes should shape review scope
- the template references the `primary-repository-finder` fallback for stale or
  ambiguous repo lists
- project workspace docs point to the updated template guidance

## Artifacts

- `templates/automation-profile-template.md`
- `projects/README.md`
- `docs/automation/hourly-project-suggestions.md`

## Notes

Keep this lightweight. The goal is a better contract for future project review,
not a large metadata schema.

## Memory Delta

Capture the minimum automation-profile guidance that makes a project ready for
hourly suggestion review.
