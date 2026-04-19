# Tracking Hub: Slabs Foundation

## Current Status

The initial Slabs repo foundation is established. Core concepts, templates, bootstrap artifacts, the first bundled workflow skill, the first live Google Doc work brief, the first repo-local plugin prototype, the canonical local project workspace structure, the workspace-wide global context layer, and a local review-and-edit app are now in place. The reviewer is staying focused on project review and editing while proactive suggestion work shifts back into normal Codex context. Project-level automation profiles are now managed directly from the reviewer so future hourly automations can discover the right repos, tools, and context boundaries per project, a dedicated Codex skill now helps users correct the primary repo list that those automations depend on, and the live hourly automation now creates batches of real `MI-...` slabs instead of suggestion-only notes while the reviewer gives users a fast ignore flow for any micro slab they do not want to keep.

## Macro Slab Rollup

| Macro Slab | Status | Notes |
| --- | --- | --- |
| [M01](macro-slabs/M01-shape-the-model.md) | Done | Core model documented, the first canonical work-brief skill is bundled, the local workspace structure is defined, and shared global context is now separated from project-only context. |
| [M02](macro-slabs/M02-bootstrap-the-repo.md) | Done | Local scaffold created, public repo published, and initial branch pushed. |
| [M03](macro-slabs/M03-design-tracking-and-memory.md) | Done | Tracking and memory model seeded through templates and example docs. |
| [M04](macro-slabs/M04-design-proactive-suggestion-loop.md) | Ready | Initial direction is captured; automation design is next. |
| [M05](macro-slabs/M05-prototype-tooling-and-plugins.md) | Done | First repo-local plugin prototype created for local Claude Code control. |
| [M06](macro-slabs/M06-build-local-review-surface.md) | Done | Local review app now supports clickable breadcrumb navigation, table-style macro navigation, homepage project scaffolding, homepage global-context notes, project-level macro creation, global-context note creation from source preview, collapsed done-macro sections, same-window brief/source links, Google-Doc brief-link attachment on project and macro views, hero-level macro editing controls, collapsed-by-default macro editing, inline creation of linked micros, project-level automation profile management, and write-back editing for macro slabs and their linked micros. |

## Active Or Recent Micro Slabs

| Micro Slab | Status | Notes |
| --- | --- | --- |
| [MI-001](micro-slabs/MI-001-bootstrap-public-repo.md) | Done | Repo scaffold created, public GitHub repo published, and `main` pushed. |
| [MI-002](micro-slabs/MI-002-write-core-framework-docs.md) | Done | Core concept model and operating model documented. |
| [MI-003](micro-slabs/MI-003-design-tracking-and-memory-templates.md) | Done | Templates and the first memory conventions created. |
| [MI-005](micro-slabs/MI-005-create-google-doc-work-brief-skill.md) | Done | Added the first bundled skill for creating work briefs in Google Docs through Google Drive. |
| [MI-006](micro-slabs/MI-006-build-claude-code-controller-plugin.md) | Done | Added a repo-local plugin, skill, marketplace entry, and Claude CLI wrapper. |
| [MI-007](micro-slabs/MI-007-define-local-project-structure.md) | Done | Added the canonical local workspace layout plus a project scaffold script. |
| [MI-008](micro-slabs/MI-008-build-local-review-app.md) | Done | Added a local web app for reviewing macro slabs and their linked micro slabs. |
| [MI-009](micro-slabs/MI-009-add-review-app-macro-editor-flow.md) | Done | Simplified the UI, made the surface trail navigable, converted macro selection into a table-style list, added homepage project scaffolding, collapsed completed macros behind an expandable section, and enabled local creation plus editing for collapsed linked micros. |
| [MI-010](micro-slabs/MI-010-define-global-context-layer.md) | Done | Added a workspace-wide global-context layer, surfaced it on the homepage, removed `Superseded` from writable statuses, and collapsed macro editing behind an explicit edit action. |
| [MI-011](micro-slabs/MI-011-add-review-app-creation-surfaces.md) | Done | Removed extra instructional UI copy, simplified project creation, added direct macro creation on project pages, and added shared-context note creation from source preview. |
| [MI-012](micro-slabs/MI-012-tighten-review-surface-entry-points.md) | Done | Moved macro editing controls into the macro hero, renamed the project macro creation action, and expanded the shared repo registry with active workspace repos. |
| [MI-013](micro-slabs/MI-013-shift-project-briefs-to-google-doc-links.md) | Done | Replaced repo-managed project brief previews with Google-Doc brief-link attachment, blocked local work-brief previews in the reviewer, and stopped scaffolding new `work-brief.md` files. |
| [MI-014](micro-slabs/MI-014-add-codex-suggested-micro-flow.md) | Superseded | The in-app Codex suggestion trigger was prototyped and verified, then removed so suggestion work can stay in normal Codex context instead of the reviewer UI. |
| [MI-015](micro-slabs/MI-015-add-project-automation-profiles-to-reviewer.md) | Done | Added project-level automation profile viewing and editing in the reviewer, switched automation selectors to fixed MCP-server / Codex-skill / plugin lists based on the local Codex app, simplified the profile to essential fields only, seeded new project scaffolds with `automation-profile.md`, and created the first profiles for Slabs Foundation and RoundReserve. |
| [MI-016](micro-slabs/MI-016-add-primary-repository-finder-skill.md) | Done | Added a reusable Codex skill and helper script for finding the right local repo roots for a project and tightening the `Primary Repositories` list in `automation-profile.md`. |
| [MI-017](micro-slabs/MI-017-create-real-codex-suggested-micro-slabs.md) | Done | Shifted the hourly automation to create real `MI-...` slabs, added a durable origin marker, and surfaced a clear `Codex suggested` label in the reviewer. |
| [MI-018](micro-slabs/MI-018-add-ignore-flow-for-codex-suggested-micros.md) | Done | Added a quick ignore action for all micro slabs, hid ignored slabs from reviewer counts and macro lists, and expanded the hourly automation to target five real micro slabs per project on each run. |
| [MI-019](micro-slabs/MI-019-capture-hourly-project-suggestions-as-a-repo-prompt-pack.md) | Ready | Codex suggested capturing the live hourly project-suggestions automation as a repo-owned prompt pack. |
| [MI-020](micro-slabs/MI-020-add-automation-memory-template-and-run-summary-rules.md) | Ready | Codex suggested defining a reusable automation-memory template and run-summary convention. |
| [MI-021](micro-slabs/MI-021-define-suggestion-conversion-and-supersession-rules.md) | Ready | Codex suggested codifying how `SG-...` ideas promote into real `MI-...` slabs and how the old suggestion stays visible. |
| [MI-022](micro-slabs/MI-022-tighten-the-project-context-bundle-checklist.md) | Ready | Codex suggested tightening the minimum project-context checklist and the `primary-repository-finder` fallback rule for hourly reviews. |
| [MI-023](micro-slabs/MI-023-add-a-quality-rubric-for-codex-suggested-micro-slabs.md) | Ready | Codex suggested a small quality rubric so future automation-created micro slabs stay bounded, distinct, and grounded. |
| [MI-004](micro-slabs/MI-004-outline-proactive-suggestion-loop.md) | Ready | Shape the automation-driven suggestion model. |

## Decisions

- The repo starts as a Markdown-first framework rather than an app.
- The first live example project is the Slabs repo building itself.

## Artifacts

- `README.md`
- `.agents/plugins/marketplace.json`
- `apps/slabs-reviewer/`
- `docs/`
- `global-context/`
- `plugins/`
- `projects/README.md`
- `projects/roundreserve/automation-profile.md`
- `scripts/scaffold_project.sh`
- `skills/`
- `skills/primary-repository-finder/`
- `templates/`
- `projects/slabs-foundation/`
- `projects/slabs-foundation/automation-profile.md`
- `https://docs.google.com/document/d/1Jmm234DOw6UIK66g-nb-5iEwCpOeLCC6R1_2kz2L5_Q/edit?usp=drivesdk`
- `https://github.com/Daviddeveney/slabs`

## Risks Or Blockers

- The naming and status model may still evolve as real usage accumulates.
- Automation behavior is only partially embodied in live Codex automations, and
  the repo-side contract still needs to be codified.
- The repo now has one default brief-creation workflow, but future work should make room for alternate tool surfaces without fragmenting the framework.
- Local plugins that execute machine-installed tools will need clear auth and permission conventions.
- The canonical project workspace is now defined, but naming conventions inside those folders still need tightening.
- The local review app now writes back to macro slabs and linked micro slabs, but broader project editing still needs clear guardrails.
- The new global-context layer is defined, but its initial taxonomy is still thin beyond shared GitHub repositories.
- Source preview can now create shared-context notes, but it is still a preview-first surface rather than a full editor.
- The shared repo registry now covers the main active repos, but broader global-context taxonomy still needs examples beyond repositories.
- Existing legacy `work-brief.md` files may still exist in older projects until they are fully cleaned up or archived.
- A live hourly Codex automation now exists for project suggestions, but the
  repo still lacks a durable prompt-pack artifact that captures its context
  contract and review rules.

## Suggested Next Micro Slabs

- Define a stricter slab status model and naming convention.
- Add a second example project for a different kind of work.
- Decide how to represent optional alternate work-brief surfaces alongside the Google Docs default.
- Decide when repo-local plugins should become generalized Slabs patterns.
- Decide which project subdirectories should stay mandatory versus optional.
- Decide whether tracking, memory, and context notes should join the same local editing surface.
- Decide which global-context note types should become first-class examples next.
- Decide whether project creation and macro creation should also pre-seed tracking-hub entries automatically.

## Session Log

- 2026-04-19: Seeded the public repo structure, captured the core concept model, created reusable templates plus a bootstrap example project, and published the repo at `https://github.com/Daviddeveney/slabs`.
- 2026-04-19: Added the first bundled Codex skill for starting work briefs in Google Docs through the Google Drive plugin.
- 2026-04-19: Tested the `google-doc-work-brief` skill by creating the first live Google Doc brief for Slabs Foundation.
- 2026-04-19: Added the first repo-local Codex plugin prototype for controlling the installed Claude Code CLI.
- 2026-04-19: Defined the canonical local project workspace layout and added a scaffold script for new project folders.
- 2026-04-19: Added the first local web review app for macro and micro slabs.
- 2026-04-19: Simplified the local review app, added dedicated macro routes, and enabled local write-back editing for macro slabs and linked micro slabs.
- 2026-04-19: Refined the macro editing flow with clearer surface hierarchy, clickable source links, bullet-style list rendering, and collapsed-by-default linked micro slabs.
- 2026-04-19: Tightened project scanning further by removing extra summary copy, converting macro selection into a table-style list, and making brief links open in the same browsing context.
- 2026-04-19: Turned the surface trail into breadcrumb navigation and added a first-pass linked micro creation flow directly inside macro pages.
- 2026-04-19: Added homepage project scaffolding and tucked completed macros into an expandable done section so active project work stays scan-first.
- 2026-04-19: Added a workspace-wide global-context layer, seeded it with a shared GitHub repository registry, removed `Superseded` from writable statuses, and collapsed macro editing behind an explicit edit action.
- 2026-04-19: Added direct creation surfaces for macro slabs and shared global-context notes, removed the manual project slug field, and stripped more instructional copy out of the review UI.
- 2026-04-19: Moved macro editing into the hero action row, renamed macro creation more explicitly, and expanded the shared repo registry with active workspace repos.
- 2026-04-19: Shifted project briefs to Google-Doc link attachment, blocked repo-managed work-brief previews in the reviewer, and stopped scaffolding new `work-brief.md` files.
- 2026-04-19: Added project-level automation profile management to the reviewer, switched automation selectors to fixed MCP-server / Codex-skill / plugin lists from the local Codex setup, simplified the profile to essential fields only, seeded new project scaffolds with `automation-profile.md`, and created the first profiles for Slabs Foundation and RoundReserve.
- 2026-04-19: Added a reusable `primary-repository-finder` skill plus a repo-root discovery helper script, then used it to tighten RoundReserve's automation profile to the actual LovableRoundReserve and Slabs repo roots.
- 2026-04-19: Updated the hourly automation to create real `MI-...` slabs,
  added a durable micro-slab origin marker plus a visible `Codex suggested`
  label in the reviewer, and converted RoundReserve's latest automation output
  into the first real Codex-created micro slab.
- 2026-04-19: Added a fast ignore flow for all micro slabs in the reviewer,
  hid ignored slabs from project rollups, and updated the hourly
  automation to target five real micro slabs per project on each run.
- 2026-04-19: Added a local Codex suggestion flow on macro pages so the
  reviewer can gather project and global context, persist a suggested micro
  slab, and render it back into the UI.
- 2026-04-19: Removed the reviewer-side Codex suggestion trigger so the app can
  stay focused on review and editing while suggestion work moves back into
  normal Codex context.
- 2026-04-19: Reviewed the live hourly project-suggestions automation and added
  `SG-001` to capture that automation as a repo-owned prompt pack plus review
  contract.
- 2026-04-19: Reviewed the live hourly project-suggestions automation again and
  added `MI-019` through `MI-023` as five real Codex-suggested micro slabs for
  the next repo-side automation-contract work.
