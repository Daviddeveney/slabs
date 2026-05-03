#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  setup_par_symphony_test.sh ISSUE_KEY [--force]

Example:
  ./scripts/setup_par_symphony_test.sh DAV-65

Creates an isolated PAR workspace for a Symphony-style smoke test. The live
PAR working copy is only read for local AGENTS.md and WORKFLOW.md overlays.

Environment overrides:
  PAR_REPO_URL                 Git URL to clone
  PAR_LOCAL_REPO               Local PAR repo path used for instruction overlays
  SYMPHONY_PAR_WORKSPACE_ROOT  Workspace root
EOF
}

ISSUE_KEY=""
FORCE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force)
      FORCE=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      if [[ -z "${ISSUE_KEY}" ]]; then
        ISSUE_KEY="$1"
        shift
      else
        echo "Unknown argument: $1" >&2
        usage >&2
        exit 2
      fi
      ;;
  esac
done

if [[ -z "${ISSUE_KEY}" ]]; then
  usage >&2
  exit 2
fi

if [[ ! "${ISSUE_KEY}" =~ ^[A-Za-z]+-[0-9]+$ ]]; then
  echo "Issue key must look like DAV-65: ${ISSUE_KEY}" >&2
  exit 2
fi

PAR_REPO_URL="${PAR_REPO_URL:-https://github.com/Daviddeveney/par-dice-golf.git}"
PAR_LOCAL_REPO="${PAR_LOCAL_REPO:-${HOME}/Documents/PAR GOLF GAME}"
WORKSPACE_ROOT="${SYMPHONY_PAR_WORKSPACE_ROOT:-${HOME}/.symphony/workspaces/par}"
WORKSPACE_DIR="${WORKSPACE_ROOT}/${ISSUE_KEY}"
BRANCH_NAME="$(printf '%s' "${ISSUE_KEY}" | tr '[:upper:]' '[:lower:]')-symphony-test"

mkdir -p "${WORKSPACE_ROOT}"

if [[ -d "${WORKSPACE_DIR}/.git" ]]; then
  if [[ "${FORCE}" -ne 1 ]]; then
    echo "Workspace already exists: ${WORKSPACE_DIR}"
    echo "Re-run with --force to reuse it after confirming its state."
    exit 1
  fi

  if [[ -n "$(git -C "${WORKSPACE_DIR}" status --short)" ]]; then
    echo "Workspace has local changes; refusing to reuse it automatically:" >&2
    git -C "${WORKSPACE_DIR}" status --short >&2
    exit 1
  fi
else
  git clone --depth 1 "${PAR_REPO_URL}" "${WORKSPACE_DIR}"
fi

git -C "${WORKSPACE_DIR}" switch -C "${BRANCH_NAME}"

for overlay in AGENTS.md WORKFLOW.md PRODUCT_STATE.md RULES.md; do
  if [[ -f "${PAR_LOCAL_REPO}/${overlay}" ]]; then
    cp "${PAR_LOCAL_REPO}/${overlay}" "${WORKSPACE_DIR}/${overlay}"
  fi
done

if [[ -d "${PAR_LOCAL_REPO}/remotion" && ! -d "${WORKSPACE_DIR}/remotion" ]]; then
  mkdir -p "${WORKSPACE_DIR}/remotion"
fi

mkdir -p "${WORKSPACE_DIR}/.symphony"

cat > "${WORKSPACE_DIR}/.symphony/TEST_PROMPT.md" <<EOF
You are running the PAR Symphony smoke test for ${ISSUE_KEY}.

Linear issue:
https://linear.app/daviddeveney/issue/${ISSUE_KEY}

Work only in this isolated workspace:
${WORKSPACE_DIR}

Goal:
Make or propose one trivial docs-only change that proves Codex can read the
PAR repo instructions from an isolated workspace. Do not touch the live PAR
working copy.

Required reading:
- AGENTS.md
- WORKFLOW.md

Verification:
- Run git status --short inside this workspace.
- Confirm the path is under ~/.symphony/workspaces/par/.

Safety:
- Do not publish, deploy, create charges, send outreach, change payment config,
  or use browser automation.
EOF

cat <<EOF
Symphony-style PAR test workspace is ready.

Issue: ${ISSUE_KEY}
Workspace: ${WORKSPACE_DIR}
Branch: ${BRANCH_NAME}
Prompt: ${WORKSPACE_DIR}/.symphony/TEST_PROMPT.md

Run the smoke test with:
  cd "${WORKSPACE_DIR}"
  codex exec --sandbox workspace-write "\$(cat .symphony/TEST_PROMPT.md)"
EOF
