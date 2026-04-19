# Memory: Review Surface Entry Points

## Date

2026-04-19

## Summary

Tightened the reviewer app by keeping brief entry points available on sparse
project and macro pages, moving macro editing into the hero action row, and
expanding the shared GitHub repo registry with the main active workspace repos.

This note was partially superseded later on 2026-04-19 when the reviewer moved
away from local `work-brief.md` fallbacks and adopted a Google-Doc-link brief
model instead.

## What Changed

- Project and macro pages kept a brief entry point visible while the hero
  actions and repo registry were being tightened.
- The project-level macro creation action now reads more clearly as `Macro
  slab`.
- The shared GitHub repo registry now includes RoundReserve, ParagonStrideWeb,
  DavidDeveney.com, and PAR GOLF GAME.

## Decisions

- Brief access should stay visible even before a project has a richer external
  document attached.
- Macro editing is a primary action and should live with the rest of the macro
  hero controls instead of behind a second shell.
- Shared repo context should reflect the real active workspace rather than only
  the Slabs repo itself.

## Artifacts

- [`../../../apps/slabs-reviewer/components/project-review-shell.tsx`](../../../apps/slabs-reviewer/components/project-review-shell.tsx)
- [`../../../apps/slabs-reviewer/components/project-macro-panel.tsx`](../../../apps/slabs-reviewer/components/project-macro-panel.tsx)
- [`../../../apps/slabs-reviewer/components/macro-detail-editor.tsx`](../../../apps/slabs-reviewer/components/macro-detail-editor.tsx)
- [`../../../global-context/shared-github-repositories.md`](../../../global-context/shared-github-repositories.md)

## Open Questions

- Should project pages eventually surface additional quick links for
  `tracking-hub.md` or recent memory alongside the brief action?
- Should shared global context grow a second example note type beyond repo
  registries next?

## Next Use

- Test the updated sparse-project brief flow on newly scaffolded projects.
- Decide whether shared repo entries should eventually link directly into local
  workspace folders as well as remote origins.
