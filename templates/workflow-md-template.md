# WORKFLOW.md

## Purpose

This file defines how future Symphony-style automation should run Codex from
Linear issues in this repo.

Linear is the source of truth for active work. GitHub is the source of truth for
code review, CI, and shipped implementation history.

## Tracker

```yaml
tracker:
  kind: linear
  team: "<team-name-or-key>"
  project: "<optional-project-name>"
```

## Issue Eligibility

Automation may pick up an issue only when all are true:

- the issue is in a ready state
- the issue is assigned to Codex or clearly labeled for Codex
- the issue has enough context to act safely
- the issue names verification or points to repo verification
- the issue is not blocked

Do not pick up issues that require product judgment, customer communication,
production deployment, production data changes, or social publishing unless the
issue explicitly grants permission for that action.

## Suggested Status Flow

```text
Backlog -> Todo -> In Progress -> In Review -> Done
Blocked
```

Automation should move completed implementation work to review, not directly to
done.

## Issue Contract

Prefer issues shaped like:

```md
## Goal

## Context

## Done When

## Verification

## Suggested Skills
```

For social/content work:

```md
## Goal

## Audience

## Source Material

## Channel

## Draft Requirements

## Approval Notes

## Suggested Skills
```

## Agent Run Rules

1. Read the Linear issue.
2. Read `AGENTS.md`.
3. Select any matching skills from the issue, labels, repo context, and
   `AGENTS.md`.
4. Create or use a branch named from the Linear issue key.
5. Make the smallest complete change.
6. Run verification.
7. Open or update a PR when code changed.
8. Comment or report with summary, verification, risks, and follow-up issues.
9. Leave the issue in review when human approval is needed.

## Skill Routing

Use the most specific applicable skill.

```md
- content/social draft -> `draft-x-post`
- explicit X publish request -> `x-api-post`
- Supabase inspection -> `supabase-mcp-query`
- explicit security review -> `security-best-practices`
- OpenAI docs/API guidance -> `openai-docs`
- browser verification -> `playwright` or `browser-use:browser`
- frontend polish -> `design-quality-gate` or `design-taste-frontend`
```

Add repo-specific routing below.

```md
- repo scenario -> `skill-name`
```

## Human Approval Required

Always require explicit user approval before:

- publishing social posts
- deploying to production
- changing production data
- deleting data or files outside the scoped task
- sending customer-facing communications
- taking destructive third-party app actions

## Handoff

Every run should produce:

- issue key
- branch or PR link
- summary
- verification run
- risks or unresolved questions
- recommended follow-up Linear issues
