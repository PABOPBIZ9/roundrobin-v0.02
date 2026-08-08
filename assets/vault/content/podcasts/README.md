# Podcast drops

Generate episodes with Chatterbox:

```bash
cd tools/voice-studio
source .venv/bin/activate
python generate.py --script scripts/pregame-miracle.json
python generate.py --script scripts/postgame-cup.json
```

Copy `tools/voice-studio/out/shows/{slug}/*.wav` into the matching show folder here, e.g.:

- `backstory/`
- `great-one-on-one/`
- `unscripted-gold/`
- `fantasy-on-ice/`
- `at-the-rink/`

See `tools/voice-studio/README.md` for the full voice roster + install.