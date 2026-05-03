#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  validate_project_setups.sh [project-slug-or-path] [--strict] [--projects-dir PATH]

Examples:
  ./scripts/validate_project_setups.sh
  ./scripts/validate_project_setups.sh roundreserve
  ./scripts/validate_project_setups.sh --strict

Checks Slabs project folders for the standard setup:
  - README.md
  - automation-profile.md
  - tracking-hub.md
  - macro-slabs/
  - micro-slabs/
  - memory/
  - context/
  - suggestions/

Warnings call out suggestion-readiness gaps such as missing brief-link.txt or
empty automation-profile sections. Use --strict to fail on warnings too.
EOF
}

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECTS_DIR="${REPO_ROOT}/projects"
TARGET=""
STRICT=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --projects-dir)
      PROJECTS_DIR="${2:-}"
      shift 2
      ;;
    --strict)
      STRICT=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      if [[ -z "${TARGET}" ]]; then
        TARGET="$1"
        shift
      else
        echo "Unknown argument: $1" >&2
        usage >&2
        exit 2
      fi
      ;;
  esac
done

if [[ ! -d "${PROJECTS_DIR}" ]]; then
  echo "Projects directory does not exist: ${PROJECTS_DIR}" >&2
  exit 1
fi

ERRORS=0
WARNINGS=0
CHECKED=0

report_error() {
  echo "  ERROR: $1"
  ERRORS=$((ERRORS + 1))
}

report_warning() {
  echo "  WARN: $1"
  WARNINGS=$((WARNINGS + 1))
}

section_has_content() {
  local file="$1"
  local section="$2"

  awk -v section="${section}" '
    $0 == "## " section { in_section = 1; next }
    in_section && /^## / { exit }
    in_section && $0 !~ /^[[:space:]]*$/ { found = 1 }
    END { exit found ? 0 : 1 }
  ' "${file}"
}

validate_project() {
  local project_dir="$1"
  local slug
  slug="$(basename "${project_dir}")"
  CHECKED=$((CHECKED + 1))

  echo "Project: ${slug}"

  for file in README.md automation-profile.md tracking-hub.md; do
    if [[ ! -f "${project_dir}/${file}" ]]; then
      report_error "missing ${file}"
    fi
  done

  for dir in macro-slabs micro-slabs memory context suggestions; do
    if [[ ! -d "${project_dir}/${dir}" ]]; then
      report_error "missing ${dir}/"
    fi
  done

  if [[ -f "${project_dir}/work-brief.md" ]]; then
    report_warning "root work-brief.md is legacy; prefer brief-link.txt for the live brief and move preserved Markdown briefs into context/"
  fi

  if [[ ! -f "${project_dir}/brief-link.txt" ]]; then
    report_warning "missing optional brief-link.txt; active automation reviews work best with a live brief link"
  elif [[ ! -s "${project_dir}/brief-link.txt" ]]; then
    report_warning "brief-link.txt exists but is empty"
  fi

  if [[ -f "${project_dir}/automation-profile.md" ]]; then
    for section in Purpose "Primary Repositories" "Codex Skills"; do
      if ! section_has_content "${project_dir}/automation-profile.md" "${section}"; then
        report_warning "automation-profile.md has an empty ${section} section"
      fi
    done
  fi

  if [[ -d "${project_dir}/context" && ! -f "${project_dir}/context/project-context.md" ]]; then
    report_warning "context/project-context.md is missing; add a durable project overview when the initiative becomes active"
  fi
}

PROJECT_DIRS=()

if [[ -n "${TARGET}" ]]; then
  if [[ -d "${TARGET}" ]]; then
    PROJECT_DIRS+=("$(cd "${TARGET}" && pwd)")
  elif [[ -d "${PROJECTS_DIR}/${TARGET}" ]]; then
    PROJECT_DIRS+=("${PROJECTS_DIR}/${TARGET}")
  else
    echo "Project not found: ${TARGET}" >&2
    exit 1
  fi
else
  while IFS= read -r project_dir; do
    PROJECT_DIRS+=("${project_dir}")
  done < <(find "${PROJECTS_DIR}" -mindepth 1 -maxdepth 1 -type d ! -name '.*' | sort)
fi

for project_dir in "${PROJECT_DIRS[@]}"; do
  validate_project "${project_dir}"
done

echo
echo "Checked ${CHECKED} project(s): ${ERRORS} error(s), ${WARNINGS} warning(s)."

if [[ "${ERRORS}" -gt 0 || ( "${STRICT}" -eq 1 && "${WARNINGS}" -gt 0 ) ]]; then
  exit 1
fi
