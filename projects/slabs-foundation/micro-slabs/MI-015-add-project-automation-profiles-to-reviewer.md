# Micro Slab: MI-015 Add Project Automation Profiles To Reviewer

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)

## Type

Product Surface

## Tool Surface

Next.js, Markdown

## Goal

Add a project-level UI in the local reviewer so users can view and update each
project's `automation-profile.md` without leaving the app.

## Working Context

The proactive suggestion approach is shifting toward Codex-side automations, so
each project needs a durable place to declare which repos, MCP servers, Codex
skills, plugins, and a few guiding notes matter before hourly review jobs are
introduced.

## Done Criteria

- project pages expose an automation profile panel
- the panel writes back to `automation-profile.md`
- automation selectors are split into MCP servers, Codex skills, and plugins
  based on what is enabled locally in Codex
- the profile stays intentionally narrow instead of exposing extra strategy
  fields that are confusing in the reviewer
- new projects scaffold an automation profile file by default
- RoundReserve and Slabs Foundation have seeded automation profiles

## Artifacts

- [`../../../apps/slabs-reviewer/components/automation-profile-panel.tsx`](../../../apps/slabs-reviewer/components/automation-profile-panel.tsx)
- [`../../../apps/slabs-reviewer/app/api/project/[slug]/automation-profile/route.ts`](../../../apps/slabs-reviewer/app/api/project/[slug]/automation-profile/route.ts)
- [`../../../templates/automation-profile-template.md`](../../../templates/automation-profile-template.md)
- [`../../../projects/roundreserve/automation-profile.md`](../../../projects/roundreserve/automation-profile.md)
- [`../../../projects/slabs-foundation/automation-profile.md`](../../../projects/slabs-foundation/automation-profile.md)

## Notes

This keeps automation configuration at the project level while preserving
Markdown as the durable source of truth.
