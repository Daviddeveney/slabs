#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  claude_code_control.sh version
  claude_code_control.sh help
  claude_code_control.sh ask --prompt "..." [--cwd PATH] [--model NAME] [--effort LEVEL] [--add-dir PATH ...] [-- EXTRA_CLAUDE_ARGS...]
  claude_code_control.sh continue --prompt "..." [--cwd PATH] [--model NAME] [--effort LEVEL] [--add-dir PATH ...] [-- EXTRA_CLAUDE_ARGS...]
  claude_code_control.sh resume --session SESSION_ID --prompt "..." [--cwd PATH] [--model NAME] [--effort LEVEL] [--add-dir PATH ...] [-- EXTRA_CLAUDE_ARGS...]

Modes:
  version   Print the local Claude Code version.
  help      Print the Claude Code CLI help text.
  ask       Run a one-shot non-interactive Claude Code prompt.
  continue  Continue the latest Claude Code session in the target workspace with a non-interactive prompt.
  resume    Resume a specific Claude Code session ID with a non-interactive prompt.
EOF
}

CLAUDE_BIN="${CLAUDE_BIN:-$(command -v claude || true)}"
if [[ -z "${CLAUDE_BIN}" ]]; then
  echo "claude executable not found on PATH" >&2
  exit 127
fi

MODE="${1:-}"
if [[ -z "${MODE}" ]]; then
  usage >&2
  exit 2
fi
shift || true

CWD=""
PROMPT=""
SESSION_ID=""
MODEL=""
EFFORT=""
declare -a ADD_DIRS=()
declare -a EXTRA_ARGS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cwd)
      CWD="${2:-}"
      shift 2
      ;;
    --prompt)
      PROMPT="${2:-}"
      shift 2
      ;;
    --session)
      SESSION_ID="${2:-}"
      shift 2
      ;;
    --model)
      MODEL="${2:-}"
      shift 2
      ;;
    --effort)
      EFFORT="${2:-}"
      shift 2
      ;;
    --add-dir)
      ADD_DIRS+=("${2:-}")
      shift 2
      ;;
    --)
      shift
      EXTRA_ARGS+=("$@")
      break
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ -n "${CWD}" ]]; then
  cd "${CWD}"
fi

build_common_args() {
  declare -n out_ref=$1
  out_ref=()
  if [[ -n "${MODEL}" ]]; then
    out_ref+=(--model "${MODEL}")
  fi
  if [[ -n "${EFFORT}" ]]; then
    out_ref+=(--effort "${EFFORT}")
  fi
  for dir in "${ADD_DIRS[@]}"; do
    out_ref+=(--add-dir "${dir}")
  done
  if [[ ${#EXTRA_ARGS[@]} -gt 0 ]]; then
    out_ref+=("${EXTRA_ARGS[@]}")
  fi
}

case "${MODE}" in
  version)
    exec "${CLAUDE_BIN}" --version
    ;;
  help)
    exec "${CLAUDE_BIN}" --help
    ;;
  ask)
    if [[ -z "${PROMPT}" ]]; then
      echo "--prompt is required for ask mode" >&2
      exit 2
    fi
    declare -a COMMON_ARGS
    build_common_args COMMON_ARGS
    exec "${CLAUDE_BIN}" -p "${COMMON_ARGS[@]}" "${PROMPT}"
    ;;
  continue)
    if [[ -z "${PROMPT}" ]]; then
      echo "--prompt is required for continue mode" >&2
      exit 2
    fi
    declare -a COMMON_ARGS
    build_common_args COMMON_ARGS
    exec "${CLAUDE_BIN}" -c -p "${COMMON_ARGS[@]}" "${PROMPT}"
    ;;
  resume)
    if [[ -z "${SESSION_ID}" ]]; then
      echo "--session is required for resume mode" >&2
      exit 2
    fi
    if [[ -z "${PROMPT}" ]]; then
      echo "--prompt is required for resume mode" >&2
      exit 2
    fi
    declare -a COMMON_ARGS
    build_common_args COMMON_ARGS
    exec "${CLAUDE_BIN}" -r "${SESSION_ID}" -p "${COMMON_ARGS[@]}" "${PROMPT}"
    ;;
  *)
    echo "Unknown mode: ${MODE}" >&2
    usage >&2
    exit 2
    ;;
esac
