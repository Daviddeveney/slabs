# Micro Slab: MI-005 Create Google Doc Work Brief Skill

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M01-shape-the-model.md`](../macro-slabs/M01-shape-the-model.md)

## Type

Skill Design

## Tool Surface

Markdown, Google Drive Plugin

## Goal

Create the first bundled Codex skill that starts a new Slabs work brief in Google Docs using the Google Drive plugin.

## Working Context

This is the first skill embodiment in the repo and establishes a default tool-specific workflow for project briefs without forcing all future briefs to use the same surface.

## Done Criteria

- a bundled skill exists in the repo
- the skill instructs Codex to use Google Drive for document creation
- the skill seeds the document from the Slabs work brief template
- the foundation docs reference the new skill

## Artifacts

- [`../../../skills/google-doc-work-brief/SKILL.md`](../../../skills/google-doc-work-brief/SKILL.md)
- [`../../../skills/google-doc-work-brief/agents/openai.yaml`](../../../skills/google-doc-work-brief/agents/openai.yaml)
- [`../../../README.md`](../../../README.md)

## Notes

This establishes a default starting path for work briefs, not an exclusive one.

## Memory Delta

- Slabs now has a first bundled skill for creating Google Doc work briefs.
- The preferred first-pass tool surface for this workflow is the Google Drive plugin.
