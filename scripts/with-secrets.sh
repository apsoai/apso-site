#!/usr/bin/env bash
# Usage: scripts/with-secrets.sh <command...>
# Resolves deploy/secrets.env once and runs the command with those values in its environment.
# Same pattern as agent-runtime/scripts/with-secrets.sh.
#
# Auth: a read-only 1Password service account for the apso-site vault, if its token is in the macOS
# Keychain (service "apso-site-op-sa"), so nothing prompts. Otherwise the 1Password app (one Touch ID).
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
if [ -z "${OP_SERVICE_ACCOUNT_TOKEN:-}" ]; then
  OP_SERVICE_ACCOUNT_TOKEN=$(security find-generic-password -a "$USER" -s apso-site-op-sa -w 2>/dev/null || true)
fi
if [ -n "$OP_SERVICE_ACCOUNT_TOKEN" ]; then
  export OP_SERVICE_ACCOUNT_TOKEN
  exec op run --env-file "$ROOT/deploy/secrets.env" -- "$@"
fi
unset OP_SERVICE_ACCOUNT_TOKEN
exec op run --account "${OP_ACCOUNT:-mavric.1password.com}" --env-file "$ROOT/deploy/secrets.env" -- "$@"
