# Memory: Primary Repository Finder Skill

## Summary

Added a reusable Codex skill for finding the right local repo roots for a Slabs
project and updating the `Primary Repositories` section in
`automation-profile.md`.

## What Changed

- added `skills/primary-repository-finder/SKILL.md`
- added skill UI metadata in `skills/primary-repository-finder/agents/openai.yaml`
- added a helper script that resolves repo roots from absolute paths already
  referenced in project Markdown
- used the new workflow to tighten RoundReserve's primary repository list to the
  LovableRoundReserve repo plus the Slabs repo root

## Why It Matters Later

This gives users and future Codex automations a cleaner starting point for
opening the right local codebases before gathering implementation context or
proposing new work.

## Linked Artifacts

- [`../micro-slabs/MI-016-add-primary-repository-finder-skill.md`](../micro-slabs/MI-016-add-primary-repository-finder-skill.md)
- [`../macro-slabs/M04-design-proactive-suggestion-loop.md`](../macro-slabs/M04-design-proactive-suggestion-loop.md)
- [`../../../skills/primary-repository-finder/SKILL.md`](../../../skills/primary-repository-finder/SKILL.md)
- [`../../../projects/roundreserve/automation-profile.md`](../../../projects/roundreserve/automation-profile.md)

## Next Use

Use this skill when a project's automation profile needs to be grounded in the
actual local repos on disk before building higher-level automation around it.
