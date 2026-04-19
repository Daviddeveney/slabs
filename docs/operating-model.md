# Slabs Operating Model

## Purpose

This document turns the Slabs concepts into a practical way of working with Codex.

## Recommended Object Roles

- Work brief: strategy hub
- Macro slab: outcome bucket
- Micro slab: execution unit
- Tracking hub: progress rollup
- Memory file: durable context snapshot
- Proactive suggestion: proposed next unit of work

## Session Loop

1. Start from the work brief and tracking hub.
2. Pick or create a micro slab.
3. Execute the work in a Codex session.
4. Update the micro slab state and artifacts.
5. Roll the outcome into the tracking hub.
6. Save a concise memory note if the session created durable context.
7. Refresh candidate next micro slabs.

## Recommended Granularity

### Work Brief

- One per initiative.
- Should stay useful for the full life of the initiative.
- Changes slowly.

### Macro Slabs

- Usually 3-7 per initiative.
- Each should represent a material outcome area.
- Should survive multiple sessions.

### Micro Slabs

- Prefer a single primary objective.
- Prefer one dominant tool surface or workflow.
- Should minimize restart friction.
- Often fit within roughly 15-90 minutes of focused work.
- May produce code, writing, research, decisions, or operational changes.

## Good Micro Slab Checklist

A strong micro slab usually has:

- a clear goal
- a parent macro slab
- enough context to begin without opening ten other docs
- explicit done criteria
- a place to store outputs and notes

## Tracking Rules

Update the tracking hub when:

- a micro slab starts
- a micro slab finishes
- a blocker appears
- a meaningful artifact is produced
- a decision changes the future shape of the work

## Memory Rules

Write memory when the session creates context that future agents should not need to rediscover.

Good memory items include:

- decisions
- definitions
- resolved unknowns
- artifact locations
- next likely actions

Avoid using memory files as noisy logs of every keystroke.

## Proactive Suggestion Rules

Off-hours automations should:

- read the current brief, tracking hub, and recent memory
- identify the most valuable small next actions
- produce candidate micro slabs, not forced actions
- avoid suggesting work that is blocked or already complete
- favor tasks that unlock other tasks

## Human Control

The user remains the decider.

Automations can suggest.
Agents can draft.
Tracking can summarize.
But acceptance and prioritization stay with the human operator unless explicitly delegated.

## Expected Evolution

Slabs should begin as a Markdown-native system and may later gain:

- metadata conventions
- generated indexes
- automation prompt packs
- task generators
- dashboards
- skill bundles for different work types

