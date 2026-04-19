---
name: primary-repository-finder
description: Find the most relevant local repositories for a Slabs project and update the `## Primary Repositories` section in `automation-profile.md`. Use when the user wants help discovering which repos on their machine matter for a project, refreshing stale repository paths, or reconciling a project's automation profile with its brief, macro slabs, tracking hub, or local implementation paths.
---

# Primary Repository Finder

Use this skill when a Slabs project needs a better `## Primary Repositories`
list in `automation-profile.md`.

## Grounding Order

- Read the target project's `automation-profile.md`, `README.md`, and
  `tracking-hub.md` first.
- Read the most relevant macro slab next, especially its `Dependencies` and
  `Artifacts`.
- Read `context/` or recent `memory/` notes only if the codebase ownership is
  still ambiguous.
- If `brief-link.txt` points to a Google Doc and the local Markdown does not
  make the primary codebases clear, use the
  [@google-drive](plugin://google-drive@openai-curated) plugin to inspect the
  brief before deciding.

## Workflow

1. Identify the project.
- Prefer the project slug if the user gave one.
- If the project is obvious from the current Slabs context, use that and state
  the assumption in the final response.

2. Harvest repo-root hints from the local project files.
- Run
  [scripts/find_primary_repositories.sh](./scripts/find_primary_repositories.sh)
  with the project slug or project folder path.
- This helper resolves git repo roots from absolute paths already mentioned in
  the project's Markdown and also includes the enclosing repo root for the
  project folder itself.

3. Validate the candidates.
- Prefer actual git repo roots such as
  `/Users/.../LovableRoundReserve`, not nested files or docs paths.
- Keep the list short, usually one to three repositories.
- Include the Slabs repo itself when the project folder, automation profile, or
  project-local context inside Slabs materially matters to future Codex work.
- Exclude repos that are only tangential, historical, or mentioned once without
  live relevance.

4. Widen the search only if needed.
- If the helper script returns too little, search common local roots such as
  `~/Documents`, `~/Code`, `~/Projects`, or `~/goals` for likely repo names
  derived from the project title, product name, or macro dependencies.
- Validate those broader candidates against the brief, macro slab, and live
  implementation file paths before adding them.

5. Update the project when requested.
- If the user asked to update the project, write the final repo roots into
  `## Primary Repositories` in `automation-profile.md`.
- If the user only asked for research, return the exact bullet list you would
  write and explain the reasoning without editing the file.

## Output Standard

- Return the final `Primary Repositories` list.
- Explain briefly why each repo belongs.
- Call out any plausible repo you intentionally left out.
- Mention any assumption you made while ranking candidates.

## Heuristics

- Strong signals:
  - absolute paths in `Dependencies` or `Artifacts`
  - repo names that match the project title or product name
  - implementation files or rollout docs already referenced by the project
- Weak signals:
  - generic folder names with no matching files
  - stale memory notes with no current code or artifact links
  - nested directories that are not repo roots

## Good Result

A strong result leaves `automation-profile.md` with a short, stable list of the
actual local repos Codex should open first when working on the project.
