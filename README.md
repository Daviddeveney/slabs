# Slabs

Slabs is a ways-of-working project for designing a more efficient way to work with Codex sessions and agents.

The project starts from a simple belief: Codex work gets dramatically better when the work is structured clearly, broken into the right-sized units, and supported by durable context that survives across sessions.

Slabs is intended to become a framework that people can clone, adapt, and grow over time. It begins as a Markdown-native operating model and can later evolve into richer tooling, skills, automations, and other supporting systems.

## Why Slabs Exists

The goal of Slabs is to make it easier to:

- structure work before execution starts
- keep strategic intent and execution tightly linked
- reduce context switching across Codex sessions
- make it easier for a person to collaborate with Codex and other agents
- preserve progress and context outside transient chat history
- create a repeatable way to pick up the next best work without reloading the entire project into memory
- support proactive work suggestion during off-hours while keeping the human in control

## What Slabs Is Trying To Achieve

Slabs is trying to create a practical system for:

1. defining work clearly at the start
2. organizing large efforts into meaningful outcome buckets
3. breaking those outcomes into small, focused execution units
4. tracking progress across many sessions and tools
5. storing durable memory for future agents to reuse
6. generating suggested next tasks proactively when the user is offline

At a high level, the flow looks like this:

1. Start with a work brief.
2. Break the work into macro slabs.
3. Execute through micro slabs.
4. Roll progress into a tracking hub.
5. Save durable context in Markdown memory files.
6. Use Codex automations and proactive workflows to suggest the next micro slabs.

## Core Concepts

### Work Brief

The work brief is the starting hub for a body of work.

It should capture:

- the type of work being done
- what is being done
- why it is being done
- how it is expected to be achieved at the highest level

The brief is not just a kickoff artifact. It should grow over time with context, deliverables, decisions, and linked artifacts as the work is conducted.

### Macro Work Slabs

Macro work slabs are the highest-level buckets of work required to complete the work defined in the brief.

They are meant to:

- organize the initiative into meaningful outcome areas
- represent the major categories of work at a strategic level
- create a bridge between the brief and execution
- hold one or many micro slabs

Macro slabs are not individual tasks. They are the larger containers that define the main bodies of work.

### Micro Slabs

Micro slabs are the individual units of work the user completes directly with Codex.

They should be:

- small enough to execute in a focused Codex session
- narrow enough that the user can work across multiple sessions without heavy context switching
- concrete enough to produce a clear output, decision, or artifact
- linked to a parent macro slab

Different micro slabs may use different tools and workflows depending on the nature of the task. The important thing is that each micro slab is a manageable, self-contained piece of progress.

### Work Tracking

As work is carried out against the brief, progress needs to be captured across different tools and working surfaces.

The tracking layer should:

- pull together progress from the work being conducted
- summarize the current state of the initiative
- store important updates, decisions, and artifact links
- reflect movement at both macro and micro slab levels
- create a reliable place to understand where the work stands right now

### Memory Files

Slabs uses Markdown memory files to preserve context for future sessions and future agents.

These memory files should capture durable information such as:

- what changed
- what was decided
- which artifacts matter
- what future agents should know
- what the most likely next actions are

The purpose of memory is to reduce rework and re-explanation across sessions.

### Proactive Suggested Micro Slabs

One of the key ideas in Slabs is to use Codex automations and proactive tools during off-work hours to generate suggested micro slabs.

The intended workflow is:

1. Codex reviews the current brief, tracking, and memory context.
2. Codex proposes a set of suggested micro slabs.
3. The user begins the day by reviewing those suggestions.
4. The user decides which suggested micro slab, if any, to pick up in a new Codex session.

This is meant to create momentum without removing human judgment.

## Design Principles

- Markdown first
- Human review stays in control
- Small tasks beat giant sessions
- Durable context beats hidden context
- One canonical hub per initiative
- Strategy and execution should stay linked
- The system should work across multiple Codex sessions and agents
- The framework should be useful before custom tooling exists
- The repo should be something users can clone and extend over time

## Working Assumptions

Slabs currently assumes:

- the best starting point is a docs-first system rather than a full application
- durable Markdown artifacts are more useful than relying on chat history alone
- proactive suggestions should recommend work, not silently execute it
- the model will need refinement through actual use

This repo is intentionally a first foundation, not the final shape.

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

## What This Repo Should Become

This repository is meant to be a framework people can pull by cloning the repo and then adapt to their own work.

Over time, Slabs should grow in sophistication through:

- better conventions and schemas
- stronger tracking patterns
- automation prompt packs
- proactive suggestion workflows
- reusable skills
- lightweight tooling
- examples for different types of work

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

- richer status schemas and naming conventions
- more opinionated macro and micro slab patterns
- automation prompts and heartbeat routines
- agent-friendly metadata schemas
- CLI or lightweight tooling for generating slabs
- examples for different work types such as product, ops, writing, and research
- better patterns for pulling tracking context from multiple tools and surfaces

## Start Here

- [`docs/concepts.md`](docs/concepts.md)
- [`docs/operating-model.md`](docs/operating-model.md)
- [`projects/slabs-foundation/work-brief.md`](projects/slabs-foundation/work-brief.md)
- [`projects/slabs-foundation/tracking-hub.md`](projects/slabs-foundation/tracking-hub.md)
