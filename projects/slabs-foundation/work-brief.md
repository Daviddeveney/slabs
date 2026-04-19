# Work Brief: Slabs Foundation

## Summary

Design and publish the first version of Slabs, a ways-of-working framework for structuring Codex sessions and agent collaboration through briefs, macro slabs, micro slabs, tracking hubs, memory files, and proactive suggested work.

## Why This Work Matters

Complex work across many Codex sessions becomes brittle when context is scattered, tasks are too large, and progress only lives inside chat transcripts. Slabs is intended to create a more reliable operating model that is easy to clone, easy to understand, and easy to evolve.

## Desired Outcomes

- Establish the first public definition of the Slabs framework.
- Publish a reusable repo that other users can clone.
- Create the first templates for briefs, slabs, tracking, and memory.
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

## Macro Slabs

- [`M01 Shape The Model`](macro-slabs/M01-shape-the-model.md)
- [`M02 Bootstrap The Repo`](macro-slabs/M02-bootstrap-the-repo.md)
- [`M03 Design Tracking And Memory`](macro-slabs/M03-design-tracking-and-memory.md)
- [`M04 Design The Proactive Suggestion Loop`](macro-slabs/M04-design-proactive-suggestion-loop.md)

## Deliverables

- public GitHub repo
- concept documentation
- operating model documentation
- reusable templates
- bootstrap project artifacts

## Artifacts

- repository root
- [`tracking-hub.md`](tracking-hub.md)
- [`memory/2026-04-19-bootstrap.md`](memory/2026-04-19-bootstrap.md)

## Open Questions

- Should Slabs stay purely Markdown-native, or eventually add a formal metadata layer?
- How opinionated should the repo become about naming, IDs, and folder structure?
- What is the right balance between proactive suggestion and autonomous execution?
- Which work types should get specialized workflow packs first?

## Decisions

- Start docs-first.
- Use the repo itself as the first live example of the framework.
- Keep automations suggestion-oriented rather than auto-executing by default.

## Linked Tracking Hub

- [`tracking-hub.md`](tracking-hub.md)

## Memory Files

- [`memory/2026-04-19-bootstrap.md`](memory/2026-04-19-bootstrap.md)

