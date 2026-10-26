#!/usr/bin/env bash
# Usage: scripts/with-secrets.sh scripts/sync-amplify-env.sh <branch> [--dry-run]
# Copies every key named in deploy/secrets.env from this process's environment into the Amplify
# branch, merged with the variables already there. `aws amplify update-branch` replaces the whole set,
# so this always reads the current set first and stops if that read fails. Prints key names, never values.
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
BRANCH="${1:?branch name required, for example main}"
DRY_RUN="${2:-}"
APP_ID="${AMPLIFY_APP_ID:?set AMPLIFY_APP_ID to the apso-site Amplify app id}"
REGION="${AWS_REGION:-us-east-1}"
export AWS_PROFILE="${AWS_PROFILE:-apso-live}"

CURRENT=$(aws amplify get-branch --app-id "$APP_ID" --branch-name "$BRANCH" --region "$REGION" \
  --query 'branch.environmentVariables' --output json) || { echo "Could not read current variables; nothing changed." >&2; exit 1; }
[ "$CURRENT" = "null" ] && CURRENT="{}"

MERGED="$CURRENT"
while IFS= read -r line; do
  [[ "$line" =~ ^([A-Z_][A-Z0-9_]*)= ]] || continue
  KEY="${BASH_REMATCH[1]}"
  VALUE="${!KEY:-}"
  if [ -z "$VALUE" ] || [[ "$VALUE" == op://* ]]; then
    echo "$KEY is not resolved; run this through scripts/with-secrets.sh. Nothing changed." >&2; exit 1
  fi
  MERGED=$(jq --arg k "$KEY" --arg v "$VALUE" '. + {($k): $v}' <<<"$MERGED")
  echo "  set $KEY"
done < "$ROOT/deploy/secrets.env"

echo "Keys before: $(jq length <<<"$CURRENT"), after: $(jq length <<<"$MERGED")"
if [ "$DRY_RUN" = "--dry-run" ]; then echo "Dry run; nothing changed."; exit 0; fi
aws amplify update-branch --app-id "$APP_ID" --branch-name "$BRANCH" --region "$REGION" \
  --environment-variables "$MERGED" --output text --query 'branch.branchName' >/dev/null
echo "Updated $BRANCH. Redeploy the branch for the build to pick up the values."
