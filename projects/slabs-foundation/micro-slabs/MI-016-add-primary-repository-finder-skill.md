# Micro Slab: MI-016 Add Primary Repository Finder Skill

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)

## Type

Framework Design

## Tool Surface

Markdown, Bash

## Goal

Add a reusable Codex skill that helps users discover the right local repo roots
for a Slabs project and update the `## Primary Repositories` section in
`automation-profile.md`.

## Working Context

Future hourly Codex automations will only be as useful as the repo list they
can open quickly. Users need a simple Codex-side workflow for harvesting repo
roots from project docs, validating them against live implementation context,
and correcting stale or nested paths without guessing.

## Done Criteria

- a bundled skill exists for finding and updating primary repositories
- a helper script can harvest repo-root candidates from project Markdown
- the workflow prefers actual repo roots over nested doc or project paths
- RoundReserve is used as a proof point for the new workflow

## Artifacts

- [`../../../skills/primary-repository-finder/SKILL.md`](../../../skills/primary-repository-finder/SKILL.md)
- [`../../../skills/primary-repository-finder/agents/openai.yaml`](../../../skills/primary-repository-finder/agents/openai.yaml)
- [`../../../skills/primary-repository-finder/scripts/find_primary_repositories.sh`](../../../skills/primary-repository-finder/scripts/find_primary_repositories.sh)
- [`../../../projects/roundreserve/automation-profile.md`](../../../projects/roundreserve/automation-profile.md)

## Notes

The helper script intentionally starts with paths already referenced by the
project so repo discovery stays grounded before widening into broader local
search.
