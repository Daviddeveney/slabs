# Memory: Project Automation Profiles In Reviewer

## Summary

Added a project-level automation profile surface to the local reviewer so users
can manage `automation-profile.md` files without opening raw Markdown.

## What Changed

- added `templates/automation-profile-template.md`
- updated `scripts/scaffold_project.sh` so new projects seed
  `automation-profile.md`
- added a project-level automation profile panel and save route in the reviewer
- seeded automation profiles for `slabs-foundation` and `roundreserve`

## Why It Matters Later

This gives future hourly Codex automations a durable, project-specific place to
discover which repos, MCP servers, Codex skills, plugins, and project notes
matter before suggestion generation is automated.

## Linked Artifacts

- [`../micro-slabs/MI-015-add-project-automation-profiles-to-reviewer.md`](../micro-slabs/MI-015-add-project-automation-profiles-to-reviewer.md)
- [`../macro-slabs/M06-build-local-review-surface.md`](../macro-slabs/M06-build-local-review-surface.md)
- [`../../../apps/slabs-reviewer/components/automation-profile-panel.tsx`](../../../apps/slabs-reviewer/components/automation-profile-panel.tsx)
- [`../../../templates/automation-profile-template.md`](../../../templates/automation-profile-template.md)

## Next Use

Use these profiles to shape the first Codex-side hourly project review
automation instead of embedding suggestion generation directly in the reviewer.
