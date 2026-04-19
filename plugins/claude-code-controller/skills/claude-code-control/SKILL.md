---
name: claude-code-control
description: Control the locally installed Claude Code CLI on this machine through the bundled wrapper script. Use when the user wants Codex to check Claude Code availability, run a one-shot Claude Code prompt, continue the latest Claude session for a workspace, or resume a named Claude session without manually assembling CLI flags.
---

# Claude Code Control

Use this skill to operate the local `claude` CLI through the wrapper script at [../../scripts/claude_code_control.sh](../../scripts/claude_code_control.sh).

Prefer this wrapper over hand-writing raw `claude` commands when the task is about controlling Claude Code from Codex.

## Workflow

1. Check local availability first when needed.
- Use `version` or `help` mode to confirm the CLI exists and is reachable.
- If `claude` is missing, stop and report that clearly.

2. Default to non-interactive control.
- Prefer `ask` mode for one-shot prompts.
- This wrapper uses `claude -p` for deterministic output instead of dropping into an interactive TUI.

3. Use session-aware modes when the user wants continuity.
- Use `continue` to continue the most recent Claude Code session in a workspace.
- Use `resume` when the user provides a specific session ID.

4. Keep the workspace grounded.
- Pass `--cwd` when the Claude task should run against a specific repo or folder.
- Pass `--add-dir` for extra Claude tool access directories only when needed.

5. Summarize the Claude result back to the user.
- Return the meaningful output, not just that the command ran.
- Call out when a Claude invocation was only a smoke test versus a real delegated task.

## Wrapper Commands

```bash
./plugins/claude-code-controller/scripts/claude_code_control.sh version
./plugins/claude-code-controller/scripts/claude_code_control.sh help
./plugins/claude-code-controller/scripts/claude_code_control.sh ask --cwd /path/to/repo --prompt "Summarize this repo"
./plugins/claude-code-controller/scripts/claude_code_control.sh continue --cwd /path/to/repo --prompt "Pick up where we left off"
./plugins/claude-code-controller/scripts/claude_code_control.sh resume --session <session-id> --prompt "Continue the task"
```

## Rules

- Do not default to fully interactive Claude sessions from Codex.
- Prefer `ask`, `continue`, or `resume` so outputs can be captured and summarized.
- Keep prompts concrete and task-shaped.
- Do not silently add dangerous permission-bypass flags.
- Surface stderr when Claude fails so the user can understand whether the issue is auth, permissions, or the prompt itself.

## Notes

- The script accepts extra Claude CLI flags after `--`.
- Model and effort can be passed through with `--model` and `--effort`.
- This plugin is a local prototype for Slabs itself, not yet a general marketplace-ready integration.
