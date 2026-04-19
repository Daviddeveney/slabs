# Memory: 2026-04-19 Claude Code Controller Plugin

## Date

2026-04-19

## Context Snapshot

Slabs now needs a local plugin prototype so the project can start embodying operational tooling, not just docs and skills. The first prototype is a repo-local plugin that controls the machine's installed Claude Code CLI.

## What Changed

- Added a repo-local plugin at `plugins/claude-code-controller/`.
- Added a repo-local marketplace entry at `.agents/plugins/marketplace.json`.
- Added a bundled plugin skill for controlling Claude Code through a wrapper script.
- Added a shell wrapper that supports version, help, ask, continue, and resume modes.

## Decisions

- Keep the first Claude-control plugin local to this repo.
- Prefer non-interactive Claude Code control through `claude -p` based flows.
- Avoid defaulting to dangerous permission-bypass flags in the wrapper.

## Artifacts

- [`../../../plugins/claude-code-controller/.codex-plugin/plugin.json`](../../../plugins/claude-code-controller/.codex-plugin/plugin.json)
- [`../../../plugins/claude-code-controller/skills/claude-code-control/SKILL.md`](../../../plugins/claude-code-controller/skills/claude-code-control/SKILL.md)
- [`../../../plugins/claude-code-controller/scripts/claude_code_control.sh`](../../../plugins/claude-code-controller/scripts/claude_code_control.sh)
- [`../../../.agents/plugins/marketplace.json`](../../../.agents/plugins/marketplace.json)

## Open Threads

- Should future local-control plugins expose MCP servers instead of only skills and scripts?
- How should auth and permission expectations be documented for local tool-executing plugins?
- When should a local plugin graduate from repo-only to a broader marketplace distribution?

## Likely Next Actions

- Install and validate the plugin through Claude's local plugin tooling.
- Decide whether local plugin prototypes should also be mirrored in top-level Slabs skills.
- Prototype a second plugin or MCP-backed integration to compare patterns.
