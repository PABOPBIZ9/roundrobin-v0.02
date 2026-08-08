#!/usr/bin/env bash
# Install Python 3.11 venv + Chatterbox TTS for PuckGold Voice Studio
set -euo pipefail
cd "$(dirname "$0")"

export PATH="$HOME/.local/bin:$PATH"

if ! command -v uv >/dev/null 2>&1; then
  echo "Installing uv…"
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
fi

echo "Creating .venv with Python 3.11…"
uv python install 3.11
uv venv --python 3.11 .venv
# shellcheck disable=SC1091
source .venv/bin/activate

echo "Installing chatterbox-tts (+ torch) — this can take several minutes…"
uv pip install --upgrade pip wheel
uv pip install chatterbox-tts torchaudio

mkdir -p refs/booth refs/players out/shows out/samples
touch refs/booth/.gitkeep refs/players/.gitkeep

echo ""
echo "✓ Voice studio ready"
echo "  source tools/voice-studio/.venv/bin/activate"
echo "  python tools/voice-studio/generate.py --list"
echo "  python tools/voice-studio/generate.py --script tools/voice-studio/scripts/booth-sample-pack.json --dry-run"
