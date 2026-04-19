#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scaffold_project.sh <project-slug> [project-title] [--projects-dir PATH]

Examples:
  ./scripts/scaffold_project.sh client-portal "Client Portal"
  ./scripts/scaffold_project.sh research-spike --projects-dir /tmp/slabs-projects

Creates a canonical Slabs project folder containing:
  - automation-profile.md
  - tracking-hub.md
  - macro-slabs/
  - micro-slabs/
  - memory/
  - context/
  - suggestions/

Workspace-wide references that several projects share belong in:
  - global-context/
EOF
}

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECTS_DIR="${REPO_ROOT}/projects"

if [[ $# -lt 1 ]]; then
  usage >&2
  exit 2
fi

PROJECT_SLUG="$1"
shift

PROJECT_TITLE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --projects-dir)
      PROJECTS_DIR="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      if [[ -z "${PROJECT_TITLE}" ]]; then
        PROJECT_TITLE="$1"
        shift
      else
        echo "Unknown argument: $1" >&2
        usage >&2
        exit 2
      fi
      ;;
  esac
done

if [[ ! "${PROJECT_SLUG}" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "Project slug must be lower-case kebab-case, for example: client-portal" >&2
  exit 2
fi

if [[ -z "${PROJECT_TITLE}" ]]; then
  PROJECT_TITLE="${PROJECT_SLUG//-/ }"
fi

PROJECT_DIR="${PROJECTS_DIR}/${PROJECT_SLUG}"

if [[ -e "${PROJECT_DIR}" ]]; then
  echo "Project directory already exists: ${PROJECT_DIR}" >&2
  exit 1
fi

mkdir -p \
  "${PROJECT_DIR}/macro-slabs" \
  "${PROJECT_DIR}/micro-slabs" \
  "${PROJECT_DIR}/memory" \
  "${PROJECT_DIR}/context" \
  "${PROJECT_DIR}/suggestions"

escape_for_sed() {
  printf '%s' "$1" | sed -e 's/[\/&]/\\&/g'
}

TITLE_ESCAPED="$(escape_for_sed "${PROJECT_TITLE}")"

sed "s/<Title>/${TITLE_ESCAPED}/g" \
  "${REPO_ROOT}/templates/tracking-hub-template.md" \
  > "${PROJECT_DIR}/tracking-hub.md"

sed "s/<Title>/${TITLE_ESCAPED}/g" \
  "${REPO_ROOT}/templates/context-note-template.md" \
  > "${PROJECT_DIR}/context/project-context.md"

sed "s/<Title>/${TITLE_ESCAPED}/g" \
  "${REPO_ROOT}/templates/automation-profile-template.md" \
  > "${PROJECT_DIR}/automation-profile.md"

cat > "${PROJECT_DIR}/README.md" <<EOF
# ${PROJECT_TITLE}

Add the live Google Doc brief URL in \`brief-link.txt\` once the brief exists.

- \`brief-link.txt\` (optional): Google Doc URL for the live brief
- \`automation-profile.md\`: project-level context rules for Codex automations
- \`tracking-hub.md\`: project rollup
- \`macro-slabs/\`: outcome buckets
- \`micro-slabs/\`: execution units
- \`memory/\`: dated durable memory snapshots
- \`context/\`: longer-lived supporting context notes
- \`suggestions/\`: proactive suggested micro slabs
- \`global-context/\` at the workspace root: shared references used by multiple projects
EOF

echo "Created Slabs project scaffold at ${PROJECT_DIR}"

if [[ "${PROJECTS_DIR}" == "${REPO_ROOT}/projects" ]]; then
  echo "Note: new folders under ${PROJECTS_DIR} are local-only by default and ignored by git unless you update projects/.gitignore."
fi
