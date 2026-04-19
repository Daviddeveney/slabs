# Work Brief: Slabs Foundation

## Summary

Design and publish the first version of Slabs, a ways-of-working framework for structuring Codex sessions and agent collaboration through briefs, macro slabs, micro slabs, tracking hubs, memory files, and proactive suggested work.

## Why This Work Matters

Complex work across many Codex sessions becomes brittle when context is scattered, tasks are too large, and progress only lives inside chat transcripts. Slabs is intended to create a more reliable operating model that is easy to clone, easy to understand, and easy to evolve.

## Desired Outcomes

- Establish the first public definition of the Slabs framework.
- Publish a reusable repo that other users can clone.
- Create the first templates for briefs, slabs, tracking, and memory.
- Define a canonical local project workspace structure that users can grow over time.
- Define a workspace-wide global context layer for references shared across several projects.
- Define how proactive micro slab suggestions should fit into the system.
- Create a foundation that can later grow into tooling and skills.

## Non-Goals

- Building a production web application right now
- Finalizing the perfect schema on day one
- Replacing human judgment with fully autonomous execution

## Constraints

- The system should be Markdown-native first.
- The repo should be useful immediately, even before custom tooling exists.
- The model should favor low context-switching overhead.

## Stakeholders

- Slabs users starting and managing Codex initiatives
- Future Codex agents picking work back up from durable context
- Repo maintainers shaping default workflows, templates, and skills

## Macro Slabs

- [`M01 Shape The Model`](macro-slabs/M01-shape-the-model.md)
- [`M02 Bootstrap The Repo`](macro-slabs/M02-bootstrap-the-repo.md)
- [`M03 Design Tracking And Memory`](macro-slabs/M03-design-tracking-and-memory.md)
- [`M04 Design The Proactive Suggestion Loop`](macro-slabs/M04-design-proactive-suggestion-loop.md)
- [`M05 Prototype Tooling And Plugins`](macro-slabs/M05-prototype-tooling-and-plugins.md)
- [`M06 Build Local Review Surface`](macro-slabs/M06-build-local-review-surface.md)

## Deliverables

- public GitHub repo
- concept documentation
- operating model documentation
- canonical local workspace guide and scaffold
- workspace-wide global context guide and shared repo registry example
- local review app for macro and micro slab visibility
- repo-local Codex plugin prototypes
- reusable templates
- bootstrap project artifacts

## Artifacts

- repository root
- public repo: `https://github.com/Daviddeveney/slabs`
- Google Doc work brief: `https://docs.google.com/document/d/1Jmm234DOw6UIK66g-nb-5iEwCpOeLCC6R1_2kz2L5_Q/edit?usp=drivesdk`
- repo-local plugin marketplace: `.agents/plugins/marketplace.json`
- Claude Code controller plugin: `plugins/claude-code-controller/`
- local projects workspace guide: `projects/README.md`
- global context guide: `global-context/README.md`
- shared GitHub repo registry example: `global-context/shared-github-repositories.md`
- project scaffold script: `scripts/scaffold_project.sh`
- local review app: `apps/slabs-reviewer/`
- [`tracking-hub.md`](tracking-hub.md)
- [`memory/2026-04-19-bootstrap.md`](memory/2026-04-19-bootstrap.md)

## Open Questions

- Should Slabs stay purely Markdown-native, or eventually add a formal metadata layer?
- How opinionated should the repo become about naming, IDs, and folder structure?
- What is the right balance between proactive suggestion and autonomous execution?
- Which work types should get specialized workflow packs first?
- What is the right boundary between top-level Slabs skills and repo-local plugins?
- Which parts of the local project directory should remain mandatory versus optional?
- Which global-context note types should become first-class examples after shared repos?
- Which other project surfaces should join the local review app after macro and micro slab editing?

## Decisions

- Start docs-first.
- Use the repo itself as the first live example of the framework.
- Keep automations suggestion-oriented rather than auto-executing by default.

## Linked Tracking Hub

- [`tracking-hub.md`](tracking-hub.md)

## Memory Files

- [`memory/2026-04-19-bootstrap.md`](memory/2026-04-19-bootstrap.md)
- [`memory/2026-04-19-google-doc-work-brief-skill.md`](memory/2026-04-19-google-doc-work-brief-skill.md)
- [`memory/2026-04-19-claude-code-controller-plugin.md`](memory/2026-04-19-claude-code-controller-plugin.md)
- [`memory/2026-04-19-local-project-structure.md`](memory/2026-04-19-local-project-structure.md)
- [`memory/2026-04-19-local-review-app.md`](memory/2026-04-19-local-review-app.md)
- [`memory/2026-04-19-review-app-editor-flow.md`](memory/2026-04-19-review-app-editor-flow.md)
- [`memory/2026-04-19-global-context-layer.md`](memory/2026-04-19-global-context-layer.md)
- [`memory/2026-04-19-review-app-creation-surfaces.md`](memory/2026-04-19-review-app-creation-surfaces.md)
- [`memory/2026-04-19-review-surface-entry-points.md`](memory/2026-04-19-review-surface-entry-points.md)

## Change Log

- 2026-04-19: Created the initial foundation brief and linked the first bootstrap artifacts.
- 2026-04-19: Added the first bundled Codex skill for starting work briefs in Google Docs through the Google Drive plugin.
- 2026-04-19: Created the first live Google Doc work brief for Slabs Foundation using the `google-doc-work-brief` skill.
- 2026-04-19: Added the first repo-local Codex plugin prototype for controlling Claude Code on the local machine.
- 2026-04-19: Added a canonical local multi-project workspace structure plus a scaffold script for new project folders.
- 2026-04-19: Added the first local web review surface for macro and micro slabs.
- 2026-04-19: Simplified the local review app and added dedicated macro editing with linked micro slab write-back.
- 2026-04-19: Added a workspace-wide global context layer, surfaced it on the homepage, and tightened the macro editor plus writable status model in the review app.
- 2026-04-19: Added direct creation surfaces for macro slabs and shared-context notes, removed manual slug entry from project creation, and stripped extra helper copy from the review UI.
- 2026-04-19: Added local brief fallbacks on sparse project and macro pages, moved macro editing into the macro hero actions, clarified macro creation labeling, and expanded the shared repo registry with active workspace repos.
