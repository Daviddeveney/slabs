#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
skill_dir="$(cd "$script_dir/.." && pwd)"
repo_root="$(cd "$skill_dir/../.." && pwd)"

usage() {
  echo "Usage: $(basename "$0") <project-slug-or-project-path>" >&2
}

if [[ $# -ne 1 ]]; then
  usage
  exit 1
fi

input="$1"

if [[ -d "$input" ]]; then
  project_dir="$(cd "$input" && pwd)"
elif [[ -d "$repo_root/projects/$input" ]]; then
  project_dir="$repo_root/projects/$input"
else
  echo "Could not find project directory for: $input" >&2
  exit 1
fi

resolve_repo_root() {
  local candidate="$1"
  local probe="$candidate"

  if [[ -f "$candidate" ]]; then
    probe="$(dirname "$candidate")"
  fi

  if [[ ! -e "$probe" ]]; then
    return 1
  fi

  git -C "$probe" rev-parse --show-toplevel 2>/dev/null
}

repo_roots_file="$(mktemp)"
trap 'rm -f "$repo_roots_file"' EXIT

record_repo_root() {
  local root="$1"

  if [[ -n "$root" && -d "$root" ]]; then
    printf '%s\n' "$root" >> "$repo_roots_file"
  fi
}

if enclosing_root="$(resolve_repo_root "$project_dir")"; then
  record_repo_root "$enclosing_root"
fi

while IFS= read -r path_hint; do
  [[ -n "$path_hint" ]] || continue

  cleaned_hint="$(printf '%s' "$path_hint" | sed 's/[`.,;:)]*$//')"
  if candidate_root="$(resolve_repo_root "$cleaned_hint")"; then
    record_repo_root "$candidate_root"
  fi
done < <(
  rg --no-filename -o '/Users/[^[:space:]`)]+' "$project_dir" -g '*.md' 2>/dev/null | sort -u
)

sort -u "$repo_roots_file"
