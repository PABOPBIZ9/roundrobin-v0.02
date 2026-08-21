#!/usr/bin/env python3
"""Extract a Chatterbox-ready reference WAV from MP4/video (5–15s trim optional)."""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def extract_ffmpeg(src: Path, dst: Path, start: float, duration: float) -> bool:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        return False
    cmd = [
        ffmpeg,
        "-y",
        "-ss",
        str(start),
        "-t",
        str(duration),
        "-i",
        str(src),
        "-ac",
        "1",
        "-ar",
        "24000",
        str(dst),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return dst.is_file()


def extract_afconvert(src: Path, dst: Path) -> bool:
    af = shutil.which("afconvert")
    if not af:
        return False
    tmp = dst.with_suffix(".raw.wav")
    subprocess.run([af, "-f", "WAVE", "-d", "LEI16@24000", str(src), str(tmp)], check=True)
    if not tmp.is_file():
        return False
    # Trim with ffmpeg if available; else use full clip
    if extract_ffmpeg(tmp, dst, 0, 15):
        tmp.unlink(missing_ok=True)
        return True
    tmp.replace(dst)
    return dst.is_file()


def main():
    ap = argparse.ArgumentParser(description="Extract voice clone ref WAV")
    ap.add_argument("input", type=Path, help="MP4 / video / audio source")
    ap.add_argument(
        "-o",
        "--output",
        type=Path,
        default=ROOT / "refs/celebrity/maxxer.wav",
        help="Output WAV path",
    )
    ap.add_argument("--start", type=float, default=0, help="Start seconds")
    ap.add_argument("--duration", type=float, default=12, help="Clip length seconds")
    args = ap.parse_args()

    if not args.input.is_file():
        raise SystemExit(f"Missing input: {args.input}")

    args.output.parent.mkdir(parents=True, exist_ok=True)

    if extract_ffmpeg(args.input, args.output, args.start, args.duration):
        print(f"✓ ffmpeg → {args.output} ({args.duration}s @ 24kHz mono)")
        return

    if extract_afconvert(args.input, args.output):
        print(f"✓ afconvert → {args.output} (install ffmpeg for precise trim)")
        return

    raise SystemExit(
        "Need ffmpeg or macOS afconvert. Install: brew install ffmpeg\n"
        "Then: python scripts/extract_ref.py 'Celebrity Maxxer.mp4'"
    )


if __name__ == "__main__":
    main()
