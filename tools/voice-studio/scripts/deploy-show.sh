#!/usr/bin/env bash
# Copy voice-studio show output into assets/vault for Listen
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SLUG="${1:-maxxer-promo-pack}"
SRC="$ROOT/out/shows/$SLUG"
DST="$ROOT/../../assets/vault/content/broadcast/$SLUG"

if [[ ! -d "$SRC" ]]; then
  echo "Missing $SRC — run generate first:"
  echo "  cd tools/voice-studio && source .venv/bin/activate"
  echo "  python generate.py --script scripts/$SLUG.json"
  exit 1
fi

mkdir -p "$DST"
cp -v "$SRC"/*.wav "$DST/"
echo "✓ Vault updated: assets/vault/content/broadcast/$SLUG/"
