# Micro Slab: MI-006 Build Claude Code Controller Plugin

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M05-prototype-tooling-and-plugins.md`](../macro-slabs/M05-prototype-tooling-and-plugins.md)

## Type

Plugin Prototype

## Tool Surface

Codex Plugin Manifest, Skill, Shell Script

## Goal

Create a local Codex plugin that lets Codex control the locally installed Claude Code CLI on the user's machine.

## Working Context

This tests the next stage of Slabs beyond Markdown structure by adding a concrete local tooling primitive inside the repo itself.

## Done Criteria

- plugin manifest exists
- plugin marketplace entry exists
- bundled skill exists
- wrapper script exists and can perform a local smoke test

## Artifacts

- [`../../../plugins/claude-code-controller/.codex-plugin/plugin.json`](../../../plugins/claude-code-controller/.codex-plugin/plugin.json)
- [`../../../plugins/claude-code-controller/skills/claude-code-control/SKILL.md`](../../../plugins/claude-code-controller/skills/claude-code-control/SKILL.md)
- [`../../../plugins/claude-code-controller/scripts/claude_code_control.sh`](../../../plugins/claude-code-controller/scripts/claude_code_control.sh)
- [`../../../.agents/plugins/marketplace.json`](../../../.agents/plugins/marketplace.json)

## Notes

The first version intentionally wraps non-interactive Claude Code flows instead of trying to automate Claude's full interactive UI surface.

## Memory Delta

- Slabs now contains a repo-local plugin prototype.
- The first plugin controls the local Claude Code CLI through a small shell wrapper and bundled skill.
