# Macro Slab: M05 Prototype Tooling And Plugins

## Status

`Done`

## Parent Brief

- [`../work-brief.md`](../work-brief.md)

## Objective

Prototype the first lightweight tooling layer for Slabs by creating repo-local Codex plugins that embody practical workflows beyond plain Markdown documents.

## Why It Matters

Slabs is intended to evolve beyond static documentation. A concrete local plugin shows how the framework can move into reusable operational tooling without waiting for a larger application.

## In Scope

- first repo-local Codex plugin scaffold
- first plugin marketplace entry for this repo
- local Claude Code control workflow

## Out of Scope

- polished public plugin distribution
- remote infrastructure
- multi-plugin architecture decisions

## Dependencies

- stable enough Slabs repo structure
- clear local use case worth prototyping

## Linked Micro Slabs

- [`../micro-slabs/MI-006-build-claude-code-controller-plugin.md`](../micro-slabs/MI-006-build-claude-code-controller-plugin.md)

## Done Criteria

- a repo-local plugin exists under `plugins/`
- a repo-local marketplace entry exists under `.agents/plugins/`
- the plugin can invoke the local Claude Code CLI through a bundled workflow

## Artifacts

- [`../../../plugins/claude-code-controller/.codex-plugin/plugin.json`](../../../plugins/claude-code-controller/.codex-plugin/plugin.json)
- [`../../../plugins/claude-code-controller/skills/claude-code-control/SKILL.md`](../../../plugins/claude-code-controller/skills/claude-code-control/SKILL.md)
- [`../../../plugins/claude-code-controller/scripts/claude_code_control.sh`](../../../plugins/claude-code-controller/scripts/claude_code_control.sh)
- [`../../../.agents/plugins/marketplace.json`](../../../.agents/plugins/marketplace.json)
