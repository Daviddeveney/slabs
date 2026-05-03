# AGENTS.md

## Source Of Truth

Active work lives in Linear. Use Linear issues for goals, priority, status,
review, and follow-up work.

Use GitHub for branches, pull requests, CI, and shipped implementation history.
Do not create parallel planning docs unless the user explicitly asks.

## Working Rules

1. Start from the Linear issue goal, context, done criteria, and verification.
2. Keep changes small, scoped, and reversible.
3. Prefer existing repo patterns over new abstractions.
4. Run the verification named in the issue or the closest relevant repo checks.
5. Report the result with changed files, verification, risks, and suggested
   follow-up issues.
6. Move or recommend moving the Linear issue to review only when the work is
   ready for human review.

## Safety

Require explicit user approval before:

- publishing social posts
- deploying to production
- changing production data
- deleting data or files outside the scoped task
- sending customer-facing communications
- taking destructive third-party app actions

## Issue Shape

Prefer Linear issues with:

```md
## Goal

## Context

## Done When

## Verification

## Suggested Skills
```

For content or social work, prefer:

```md
## Goal

## Audience

## Source Material

## Channel

## Draft Requirements

## Approval Notes

## Suggested Skills
```

## Codex Skills

Use the most specific applicable skill:

- `draft-x-post`: draft X/Twitter or launch copy. Do not publish.
- `x-api-post`: publish to X only when explicitly asked.
- `x-auth-repair`: repair X OAuth/callback issues.
- `browser-agent-instructions`: draft instructions for browser agents.
- `playwright`: browser verification, screenshots, and UI-flow debugging.
- `browser-use:browser`: in-app/local browser inspection when requested.
- `design-quality-gate` or `design-taste-frontend`: frontend/UI quality work.
- `build-web-apps:react-best-practices`: React or Next.js performance work.
- `build-web-apps:shadcn`: shadcn/ui work.
- `build-web-apps:stripe-best-practices`: Stripe work.
- `build-web-apps:supabase-postgres-best-practices`: Postgres/Supabase design.
- `supabase-mcp-query`: Supabase data/schema investigation, read-only by
  default.
- `security-best-practices`: explicit security review or secure coding work.
- `openai-docs`: OpenAI API/product documentation questions.
- Repo-specific skills listed below when this repo owns that domain.

## Repo-Specific Skills

Add repo-specific skills here.

```md
- `skill-name`: use when ...
```

## Handoff Format

When finished, report:

- What changed
- PR or branch link, when applicable
- Verification run
- Risks or unresolved questions
- Follow-up Linear issues worth creating
