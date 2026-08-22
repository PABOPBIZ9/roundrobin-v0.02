#!/usr/bin/env python3
"""
PuckGold Voice Studio — Chatterbox TTS generator
================================================
Generate booth / podcast / player lines from scripts/*.json

Usage:
  # Activate venv first (see README)
  python generate.py --list
  python generate.py --script scripts/booth-sample-pack.json
  python generate.py --script scripts/pregame-miracle.json
  python generate.py --script scripts/postgame-cup.json
  python generate.py --voice kai-sandoval --text "We never stopped believing."
  python generate.py --samples          # every voice's sample_line
  python generate.py --players          # all player sample lines
  python generate.py --booth            # all booth sample lines

Device: auto-picks mps (Apple Silicon) → cuda → cpu
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
VOICES_PATH = ROOT / "voices.json"
OUT = ROOT / "out"


def load_voices():
    data = json.loads(VOICES_PATH.read_text())
    by_id = {}
    for kind in ("booth", "players", "mascots", "celebrity"):
        for v in data.get(kind, []):
            # players/booth/mascots/celebrity folders under out/
            folder = {"booth": "booth", "players": "player", "mascots": "mascot", "celebrity": "celebrity"}[kind]
            by_id[v["id"]] = {**v, "kind": folder}
    return data, by_id


def pick_device(forced: str | None):
    if forced:
        return forced
    try:
        import torch

        if torch.backends.mps.is_available():
            return "mps"
        if torch.cuda.is_available():
            return "cuda"
    except Exception:
        pass
    return "cpu"


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:80]


def load_model(device: str):
    print(f"[voice-studio] loading Chatterbox on {device} … (first run downloads weights)")
    # Some resemble-perth wheels ship PerthImplicitWatermarker as None — fall back.
    import perth

    if getattr(perth, "PerthImplicitWatermarker", None) is None:
        perth.PerthImplicitWatermarker = perth.DummyWatermarker
        print("[voice-studio] using DummyWatermarker (PerthImplicitWatermarker unavailable)")

    from chatterbox.tts import ChatterboxTTS

    return ChatterboxTTS.from_pretrained(device=device)


def apply_voice_shape(wav, sr: int, voice: dict):
    """Differentiate default Chatterbox output via pitch / speed when no clone ref."""
    import torch
    import torchaudio.functional as F

    # Ensure [channels, samples]
    if wav.dim() == 1:
        wav = wav.unsqueeze(0)

    steps = float(voice.get("pitch_semitones", 0) or 0)
    if steps:
        wav = F.pitch_shift(wav, sr, n_steps=steps)

    speed = float(voice.get("speed", 1.0) or 1.0)
    if abs(speed - 1.0) > 0.01:
        # tempo via resample trick (keeps duration change = rate change)
        new_sr = max(8000, int(sr / speed))
        wav = F.resample(wav, sr, new_sr)
        wav = F.resample(wav, new_sr, sr)

    # Soft peak normalize — keeps mascot / PA punch without clipping
    peak = wav.abs().max()
    if float(peak) > 0:
        wav = wav / peak * 0.95
    return wav


def synth(model, text: str, voice: dict, out_path: Path):
    import torchaudio as ta

    ref = ROOT / voice.get("ref", "")
    kwargs = {"exaggeration": float(voice.get("exaggeration", 0.5))}
    # cfg_weight supported on some builds
    if "cfg_weight" in voice:
        kwargs["cfg_weight"] = float(voice["cfg_weight"])

    out_path.parent.mkdir(parents=True, exist_ok=True)
    shape_note = []
    if voice.get("pitch_semitones"):
        shape_note.append(f"pitch{voice['pitch_semitones']:+g}")
    if voice.get("speed") and float(voice.get("speed", 1)) != 1.0:
        shape_note.append(f"speed×{voice['speed']}")
    shape_s = f" [{', '.join(shape_note)}]" if shape_note else ""

    if ref.is_file():
        print(f"  → clone {voice['id']}  ref={ref.name}{shape_s}")
        wav = model.generate(text, audio_prompt_path=str(ref), **kwargs)
    else:
        print(f"  → shaped default ({voice['id']}){shape_s} — drop {voice.get('ref')} for clone")
        try:
            wav = model.generate(text, **kwargs)
        except TypeError:
            wav = model.generate(text)

    wav = apply_voice_shape(wav, model.sr, voice)
    ta.save(str(out_path), wav, model.sr)
    print(f"  ✓ {out_path.relative_to(ROOT)}")
    return out_path


def resolve_lines(script_path: Path, by_id: dict):
    doc = json.loads(script_path.read_text())
    lines = []
    for i, row in enumerate(doc["lines"]):
        vid = row["voice"]
        if vid not in by_id:
            raise SystemExit(f"Unknown voice id in script: {vid}")
        lines.append((i, by_id[vid], row["text"], doc))
    return lines


def main():
    ap = argparse.ArgumentParser(description="PuckGold Chatterbox voice studio")
    ap.add_argument("--list", action="store_true", help="List booth + player voices")
    ap.add_argument("--script", type=Path, action="append", help="JSON script under scripts/ (repeatable)")
    ap.add_argument("--voice", help="Single voice id")
    ap.add_argument("--text", help="Text for --voice")
    ap.add_argument("--samples", action="store_true", help="Generate every sample_line")
    ap.add_argument("--players", action="store_true", help="All player samples")
    ap.add_argument("--booth", action="store_true", help="All booth samples")
    ap.add_argument("--mascots", action="store_true", help="All mascot sample lines")
    ap.add_argument("--celebrity", action="store_true", help="All celebrity sample lines")
    ap.add_argument("--device", choices=["mps", "cuda", "cpu"], default=None)
    ap.add_argument("--dry-run", action="store_true", help="Print plan only")
    ap.add_argument("--skip-existing", action="store_true", help="Skip WAVs that already exist")
    args = ap.parse_args()

    data, by_id = load_voices()

    if args.list:
        print("\nBOOTH")
        for v in data["booth"]:
            ref_ok = "✓" if (ROOT / v.get("ref", "")).is_file() else "·"
            g = v.get("gender", "?")[0]
            print(f"  [{ref_ok}] {v['id']:22} ({g}) {v['name']} — {v['role']}")
        print("\nPLAYERS")
        for v in data["players"]:
            ref_ok = "✓" if (ROOT / v.get("ref", "")).is_file() else "·"
            print(f"  [{ref_ok}] {v['id']:22} {v['name']:18} ({v['team']})")
        if data.get("mascots"):
            print("\nMASCOTS")
            for v in data["mascots"]:
                ref_ok = "✓" if (ROOT / v.get("ref", "")).is_file() else "·"
                print(f"  [{ref_ok}] {v['id']:22} {v['name']} — {v.get('role', '')}")
        if data.get("celebrity"):
            print("\nCELEBRITY")
            for v in data["celebrity"]:
                ref_ok = "✓" if (ROOT / v.get("ref", "")).is_file() else "·"
                g = v.get("gender", "?")[0]
                print(f"  [{ref_ok}] {v['id']:22} ({g}) {v['name']} — {v['role']}")
        print("\n✓ = reference WAV present for cloning")
        return

    jobs = []  # (voice, text, out_path)

    if args.script:
        for script_path in args.script:
            for i, voice, text, doc in resolve_lines(script_path, by_id):
                show = slug(doc.get("slug") or doc.get("show") or script_path.stem)
                out = OUT / "shows" / show / f"{i:02d}_{voice['id']}.wav"
                jobs.append((voice, text, out))

    if args.voice:
        if args.voice not in by_id:
            raise SystemExit(f"Unknown voice: {args.voice}")
        text = args.text or by_id[args.voice].get("sample_line") or "PuckGold."
        voice = by_id[args.voice]
        kind = voice["kind"]
        out = OUT / kind / f"{voice['id']}" / f"{slug(text)[:40] or 'line'}.wav"
        jobs.append((voice, text, out))

    if args.samples or args.players or args.booth or args.mascots or args.celebrity:
        pool = []
        if args.samples or args.booth:
            pool += data.get("booth", [])
        if args.samples or args.players:
            pool += data.get("players", [])
        if args.samples or args.mascots:
            pool += data.get("mascots", [])
        if args.samples or args.celebrity:
            pool += data.get("celebrity", [])
        for v in pool:
            voice = by_id[v["id"]]
            text = v.get("sample_line") or f"Hi, I'm {v['name']}."
            kind = voice["kind"]
            out = OUT / "samples" / kind / f"{v['id']}.wav"
            jobs.append((voice, text, out))

    if not jobs:
        ap.print_help()
        print("\nTip: python generate.py --script scripts/pregame-miracle.json")
        return

    print(f"[voice-studio] {len(jobs)} line(s) queued")
    if args.dry_run:
        for voice, text, out in jobs:
            print(f"  {voice['id']:22} → {out.relative_to(ROOT)}\n    \"{text[:90]}…\"" if len(text) > 90 else f"  {voice['id']:22} → {out.relative_to(ROOT)}\n    \"{text}\"")
        return

    device = pick_device(args.device)
    model = load_model(device)
    for voice, text, out in jobs:
        if args.skip_existing and out.is_file():
            print(f"  · skip {out.relative_to(ROOT)}")
            continue
        synth(model, text, voice, out)
    print(f"\nDone. WAVs in {OUT}/")
    print("Copy show folders into assets/vault/content/podcasts/{slug}/ when happy.")


if __name__ == "__main__":
    main()
