# Slabs

Slabs is a ways-of-working framework for running meaningful work with Codex through a small set of reusable planning and execution objects.

The core idea is simple:

1. Start with a work brief.
2. Break the work into macro slabs.
3. Execute through micro slabs.
4. Roll progress into a tracking hub.
5. Preserve durable context in Markdown memory files.
6. Use Codex automations to suggest the next best micro slabs outside active work hours.

## Why Slabs Exists

Codex work improves when context is structured, execution units are small, and handoffs are explicit. Slabs is designed to:

- reduce context switching across sessions
- make agent collaboration clearer
- create durable project memory outside transient chat threads
- make progress legible at both strategic and tactical levels
- support proactive work suggestion without losing human control

## Core Concepts

- Work Brief: the canonical hub for an initiative. It captures what the work is, why it matters, what success looks like, and links to the major work buckets, deliverables, and artifacts.
- Macro Slab: a major outcome bucket that moves the brief forward. Macro slabs organize the work at a strategic level.
- Micro Slab: a single execution unit that a person and Codex can complete together with limited context overhead.
- Tracking Hub: the rollup surface for status, decisions, artifacts, and cross-slab momentum.
- Memory: durable Markdown context snapshots that agents can reuse without reconstructing project history.
- Proactive Suggestions: automation-driven candidate micro slabs generated during off-hours for a user to review and accept.

## Design Principles

- Markdown first
- Human review stays in control
- Small tasks beat giant sessions
- Durable context beats hidden context
- One canonical hub per initiative
- Strategy and execution should stay linked

## Repo Layout

```text
.
├── AGENTS.md
├── docs/
├── projects/
│   └── slabs-foundation/
├── templates/
└── LICENSE
```

- `docs/` explains the Slabs model.
- `templates/` contains reusable starter documents.
- `projects/slabs-foundation/` is the first live project inside the framework: building Slabs itself.

## How To Use Slabs

1. Copy the templates into a new project folder.
2. Write the work brief first.
3. Define 3-7 macro slabs that describe the major outcome areas.
4. Break each macro slab into small micro slabs that can be executed with minimal context switching.
5. Track progress in the tracking hub as work moves.
6. Save compact memory snapshots so future agents can restart quickly.
7. Let automations propose candidate micro slabs, but keep acceptance human-driven.

## Current Starting Point

The repo currently includes:

- a first-pass concept model
- an operating model for how slabs relate to Codex sessions
- reusable templates
- a bootstrap project brief for building Slabs itself

## Next Likely Evolutions

- richer status schemas and conventions
- automation prompts and heartbeat routines
- agent-friendly metadata schemas
- CLI or lightweight tooling for generating slabs
- examples for different work types such as product, ops, writing, and research

## Start Here

- [`docs/concepts.md`](docs/concepts.md)
- [`docs/operating-model.md`](docs/operating-model.md)
- [`projects/slabs-foundation/work-brief.md`](projects/slabs-foundation/work-brief.md)
- [`projects/slabs-foundation/tracking-hub.md`](projects/slabs-foundation/tracking-hub.md)

