#!/usr/bin/env bash
# Finish MAXXER promo pack — one track at a time (survives long MPS runs)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
source .venv/bin/activate

for i in 1 2 3; do
  python <<PY
import json
from pathlib import Path
from generate import load_voices, load_model, synth, OUT, slug

doc = json.loads(Path("scripts/maxxer-promo-pack.json").read_text())
_, by_id = load_voices()
show = slug(doc["slug"])
model = load_model("mps")
i = $i
row = doc["lines"][i]
voice = by_id[row["voice"]]
out = OUT / "shows" / show / f"{i:02d}_{voice['id']}.wav"
if out.is_file():
    print(f"skip {out.name}")
else:
    print(f"generating {out.name} …", flush=True)
    synth(model, row["text"], voice, out)
    print(f"done {out.name}", flush=True)
PY
done

bash scripts/deploy-show.sh maxxer-promo-pack
echo "Next: git add assets/vault/content/broadcast/maxxer-promo-pack/*.wav && git commit && git push"
