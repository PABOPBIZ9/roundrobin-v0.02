# PuckGold Voice Studio (Chatterbox TTS)

Local announcers, pre/post-game podcast shows, and **per-player voices** for the Founding Four.

Engine: [Resemble AI Chatterbox](https://github.com/resemble-ai/chatterbox) (MIT, voice clone from ~5s WAV).

---

## What to do (simple path)

### 1. One-time install (already started on this Mac)

```bash
cd tools/voice-studio
./setup.sh          # uv + Python 3.11 + chatterbox-tts
source .venv/bin/activate
```

First generate downloads model weights from Hugging Face (~1–2 GB).

### 2. Drop reference voices (optional but huge quality jump)

Chatterbox **clones** from a short clean WAV:

| Folder | Who |
|--------|-----|
| `refs/booth/*.wav` | Jack Jet, Color, Chippy, PA, desk hosts |
| `refs/players/{player-id}.wav` | Every roster player |

**Tips for refs:** 5–15 seconds, one speaker, no music, quiet room, WAV/MP3.  
Name files exactly like `voices.json` → `ref` paths.

Without a ref, generation still works with the **default** Chatterbox voice + per-voice `exaggeration` (good for prototyping).

### 3. Generate shows

```bash
source .venv/bin/activate
python generate.py --list
python generate.py --script scripts/booth-sample-pack.json
python generate.py --script scripts/pregame-miracle.json
python generate.py --script scripts/postgame-cup.json
```

WAVs land in `out/shows/...`

### 4. Generate player / booth samples

```bash
python generate.py --booth      # announcer sample pack
python generate.py --players    # all 36 Founding Four player lines
python generate.py --voice kai-sandoval --text "We never stopped believing."
```

### 5. Drop onto the site

| Output | Drop here |
|--------|-----------|
| Podcast episodes | `assets/vault/content/podcasts/{slug}/` |
| Booth calls | `assets/teams/{team}/09-Audio/goal-call/` etc. |
| Player interview bites | `assets/teams/{team}/09-Audio/player-bites/{id}.wav` |
| PA / walkout | team `09-Audio/walkout-intro/` · `win-outro/` |

Then wire files on `podcasts.html` / team pages (or keep as vault drops for now).

---

## Voice roster (already in `voices.json`)

**Booth (8)**  
Jack “The Jet” Morrison · Veteran Color · Coach Chippy · Arena PA · **Lexi Gold** (♀) · **Riley Vance** · **Nova Reyes** (♀ sideline) · **Mira Chen** (♀ studio)

**Mascot**  
**Pucky** — high-pitch friendly + mischievous Chucky wink (`pitch_semitones: +8`)

**Players (36)** — 9 per Founding Four club (from `teams-data.js`)

Without clone refs, `generate.py` shapes default Chatterbox via `pitch_semitones` + `speed` so roles stay distinct.

**Shows scripted**
- `voice-roster-showcase.json` → male/female booth + captains + Pucky (Listen hero)
- `pregame-miracle.json` → Backstory pre-game (Cup lore + Expansion tease)
- `postgame-cup.json` → Gold on 1 with Kai / Cross / Combs / Doyle
- `booth-sample-pack.json` → Miracle Game call pack from the Championship Book

---

## Recommended workflow for Expansion Weekend

1. Generate **booth-sample-pack** → use in hype / recaps  
2. Generate **pregame-miracle** + **postgame-cup** → podcast drops  
3. Record or source 6 booth refs + captains first (Kai, Cross, Doyle, Combs)  
4. Batch `--players` overnight on MPS  
5. Add Expansion invite-team voices later the same way  

---

## Alternatives (if Chatterbox is heavy)

| Tool | When |
|------|------|
| **ElevenLabs** | Fastest polish; paid; use Championship Book prompts as-is |
| **Mac `say`** | Instant scratch tracks: `say -v Daniel "…"` |
| **Chatterbox-TTS-Server** | OpenAI-compatible local API UI |

Chatterbox is the free local “clone everyone” path — perfect for 36 players + booth.

---

## Device notes (this machine)

- Apple **M4 Pro** → use `mps` (auto-selected)  
- If MPS errors: `python generate.py --device cpu --script …` (slower)  
- System Python 3.9 is too old — always use `.venv` from `setup.sh`
