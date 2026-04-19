# Projects Workspace

The `projects/` directory is the canonical local workspace for Slabs.

Inside this repo, `projects/slabs-foundation/` is the tracked canonical example.
Any additional project folder created under `projects/` is local-only by
default and ignored by git so users can shape their own workspace without
accidentally publishing personal initiatives.

Each initiative should live in its own folder at:

```text
projects/<project-slug>/
```

A standard Slabs project folder looks like this:

```text
projects/<project-slug>/
├── README.md
├── brief-link.txt (optional)
├── automation-profile.md
├── tracking-hub.md
├── macro-slabs/
├── micro-slabs/
├── memory/
├── context/
└── suggestions/
```

Workspace-wide material that several projects share should live once in:

```text
global-context/
```

## What Goes Where

- `brief-link.txt`: optional plain-text pointer to the live Google Doc brief for the initiative.
- `automation-profile.md`: project-level instructions that tell Codex automations which repos, MCP servers, Codex skills, plugins, and notes should shape proactive review or suggestion work.
- `tracking-hub.md`: the current rollup of macro status, active micro slabs, artifacts, blockers, and next actions.
- `macro-slabs/`: one Markdown file per macro slab.
- `micro-slabs/`: one Markdown file per micro slab.
- `memory/`: dated durable session memory files.
- `context/`: longer-lived supporting context such as research notes, schemas, prompt packs, or external summaries.
- `suggestions/`: proactive suggested micro slabs created by automations or review workflows.
- `global-context/`: workspace-wide references shared by several projects, such as GitHub repo registries or common system notes.

## Scaffold A New Project

Run:

```bash
./scripts/scaffold_project.sh <project-slug> "Project Title"
```

Example:

```bash
./scripts/scaffold_project.sh client-portal "Client Portal"
```

This creates the canonical directory structure and seeds:

- `automation-profile.md`
- `tracking-hub.md`
- `README.md`
- `context/project-context.md`

The Google Doc brief stays outside the repo; add its URL later in
`brief-link.txt` when the live brief exists.

If you intentionally want to publish another project folder as part of the
framework, update `projects/.gitignore` first. The default behavior is to keep
new project folders local.
