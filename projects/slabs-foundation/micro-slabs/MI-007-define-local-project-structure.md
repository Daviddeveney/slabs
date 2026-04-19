# Micro Slab: MI-007 Define Local Project Structure

## Status

`Done`

## Parent Macro Slab

- [`../macro-slabs/M01-shape-the-model.md`](../macro-slabs/M01-shape-the-model.md)

## Type

Framework Design

## Tool Surface

Markdown, Shell Script

## Goal

Define and scaffold the canonical local directory structure that each Slabs user will use to store projects, briefs, slabs, tracking, memory, and supporting context.

## Working Context

Slabs is meant to live locally for each user, so the filesystem layout needs to be a first-class part of the framework rather than something users infer from the example project.

## Done Criteria

- the canonical project directory layout is documented
- `projects/` is positioned as the local workspace root
- a scaffold script exists for creating new project folders
- the framework distinguishes session memory from longer-lived context notes

## Artifacts

- [`../../../projects/README.md`](../../../projects/README.md)
- [`../../../scripts/scaffold_project.sh`](../../../scripts/scaffold_project.sh)
- [`../../../templates/context-note-template.md`](../../../templates/context-note-template.md)
- [`../../../README.md`](../../../README.md)

## Notes

The goal is not to freeze every subfolder forever, but to give users one clean default that can grow naturally over time.

## Memory Delta

- Slabs now has an explicit local multi-project workspace structure.
- Session memory and broader project context are now separated into different directories.
