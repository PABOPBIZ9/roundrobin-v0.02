#!/usr/bin/env bash
# Regenerate assets/js/stadium-videos.json from team 03-Stadiums vault
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
python3 <<'PY'
import json
from pathlib import Path
root = Path("assets/teams")
out = {}
for team_dir in sorted(root.iterdir()):
    if not team_dir.is_dir():
        continue
    slug = team_dir.name
    st = team_dir / "03-Stadiums"
    if not st.is_dir():
        continue
    entry = {"stadiums": {}, "gallery": []}
    for sid in ("stadium-01", "stadium-02", "stadium-03"):
        film = st / sid / "film.mp4"
        if film.is_file():
            entry["stadiums"][sid] = str(film).replace("\\", "/")
    gal = st / "gallery"
    if gal.is_dir():
        entry["gallery"] = sorted(str(p).replace("\\", "/") for p in gal.glob("*.mp4"))
    if entry["stadiums"] or entry["gallery"]:
        out[slug] = entry
Path("assets/js/stadium-videos.json").write_text(json.dumps(out, indent=2) + "\n")
print(f"✓ {len(out)} teams · {sum(len(v['gallery']) for v in out.values())} gallery clips")
PY
