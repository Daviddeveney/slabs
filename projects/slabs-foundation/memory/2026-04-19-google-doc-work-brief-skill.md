# Memory: 2026-04-19 Google Doc Work Brief Skill

## Date

2026-04-19

## Context Snapshot

The framework now needs a first bundled Codex skill so project briefs can start from a native Google Doc instead of only from local Markdown templates. This should be the default path for now, while leaving room for alternate work-brief surfaces later.

## What Changed

- Added a bundled `google-doc-work-brief` skill under `skills/`.
- Wired the skill to use the [@google-drive](plugin://google-drive@openai-curated) plugin for Google Doc creation and seeding.
- Positioned the local work brief template as the canonical structure that gets copied into the new Google Doc.
- Updated the foundation project artifacts so the first skill is tracked as part of the repo's evolution.
- Tested the skill by creating the first live Google Doc brief for Slabs Foundation: `https://docs.google.com/document/d/1Jmm234DOw6UIK66g-nb-5iEwCpOeLCC6R1_2kz2L5_Q/edit?usp=drivesdk`.

## Decisions

- The first bundled skill will start work briefs in Google Docs through Google Drive.
- This is the default work-brief workflow, not an exclusive requirement for all future users.
- The local Markdown work brief template remains the canonical structure source even when the live brief starts in Google Docs.

## Artifacts

- [`../../../skills/google-doc-work-brief/SKILL.md`](../../../skills/google-doc-work-brief/SKILL.md)
- [`../../../skills/google-doc-work-brief/agents/openai.yaml`](../../../skills/google-doc-work-brief/agents/openai.yaml)
- [`../micro-slabs/MI-005-create-google-doc-work-brief-skill.md`](../micro-slabs/MI-005-create-google-doc-work-brief-skill.md)
- `https://docs.google.com/document/d/1Jmm234DOw6UIK66g-nb-5iEwCpOeLCC6R1_2kz2L5_Q/edit?usp=drivesdk`

## Open Threads

- How should alternate work-brief surfaces be represented once the repo supports more than Google Docs?
- Should future skills create Markdown mirrors automatically, or only on request?
- What is the cleanest handoff from a Google Doc brief into tracking, memory, and downstream slabs?

## Likely Next Actions

- Draft the first automation workflow for proactive suggestions.
- Add a second example project to test the framework outside the bootstrap case.
- Decide how optional brief surfaces should be documented without weakening the default workflow.
