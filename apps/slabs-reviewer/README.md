# Slabs Reviewer

Local review surface for Slabs projects.

## What It Does

- Reads the local `projects/` workspace directly from disk
- Lists available projects
- Sorts macro slabs so active and ready work sits above done work
- Lets users click into a dedicated macro view with linked micro slabs
- Writes macro and linked micro slab edits back to the local Markdown files

## Run Locally

```bash
cd apps/slabs-reviewer
npm install
npm run dev
```

Open:

```text
http://localhost:3006
```

## Build For Verification

```bash
cd apps/slabs-reviewer
npm run build
```

## Notes

- Markdown remains the source of truth.
- The app is local-first and writes directly to the project files under `projects/`.
- In this repo, only `projects/slabs-foundation/` is version-controlled by
  default; additional local project folders are gitignored so personal
  workspace state does not get pushed accidentally.
